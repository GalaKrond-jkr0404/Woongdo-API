import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import LRUCache from 'lru-cache';
import * as dotenv from 'dotenv';

import { mealDataType } from '../types/';
dotenv.config();

const options = {
    max: 3,
    maxAge: 1000 * 60 * 60,
};

const cache = new LRUCache<string, mealDataType[]>(options);

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { YMD } = Object.assign(req.body, req.query);

    if (!YMD) {
        return res.json({
            isError: true,
            message: '필수 옵션이 비어있습니다.'
        });
    }

    if (cache.has(YMD)) {
        const loadData = cache.get(YMD);
        return res.json({
            isError: false,
            message: '데이터를 로드하는데 성공했습니다.',
            mealData: loadData
        });
    }
    const getAPIurl = (_date: string) => (
        'https://open.neis.go.kr/hub/mealServiceDietInfo?' +
        'Type=json&' +
        `KEY=${process.env.neisToken}&` +
        'ATPT_OFCDC_SC_CODE=B10&' +
        'SD_SCHUL_CODE=7010137&' +
        `MLSV_YMD=${_date.split('-').join('')}`
    );

    try {
        const fetchMealData = await axios.get(getAPIurl(YMD));

        let arr: mealDataType[] = [];

        for (let i = 0; i < fetchMealData.data['mealServiceDietInfo'][0]['head'][0]['list_total_count']; ++i) {
            let returnArray: string[] = [];
            const mealTitle = fetchMealData.data['mealServiceDietInfo'][1]['row'][i]['MMEAL_SC_NM'] as string;
            const mealMenu = fetchMealData.data['mealServiceDietInfo'][1]['row'][i]['DDISH_NM'] as string;

            mealMenu.split(/<br\/>/g).forEach((element) => {
                returnArray.push(element.replace(/\([^)]+\)/g, ''));
            });

            arr.push({
                title: mealTitle,
                menu: returnArray,
            });
        }
        cache.set(YMD, arr);
        return res.json({
            isError: false,
            message: '데이터를 로드하는데 성공했습니다.',
            mealData: arr
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: 'Request를 보냈지만, 원하는 정보를 수신하지 못했습니다.',
        });
    }
});

export = router;
