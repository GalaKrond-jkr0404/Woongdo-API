import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import moment from 'moment-timezone';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

moment.tz.setDefault('Asia/Seoul');
const getWeekDateString = (): Array<string> => {
    let arr: Array<string> = [];

    for (let i = 0; i < 5; ++i) {
        arr.push(moment().startOf('isoWeek').add(i, 'days').format('YYYY-MM-DD'));
    }

    return arr;
}
const getEncodeDayString = (date: string): number => {
    switch (date) {
        case '월요일': return 0;
        case '화요일': return 1;
        case '수요일': return 2;
        case '목요일': return 3;
        case '금요일': return 4;
        default: return 5;
    }
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {

    const { setGrade, setClass, setDate } = Object.assign(req.body, req.query);

    if (!setGrade || !setClass || !setDate) {
        return res.json({
            isError: true,
            message: '필수 옵션이 비어있습니다.'
        });
    }

    const getAPIurl = (_glade: string, _class: string, _date: string) => (
        'https://open.neis.go.kr/hub/hisTimetable?' +
        'Type=json&' +
        `KEY=${process.env.neisToken}&` +
        'ATPT_OFCDC_SC_CODE=B10&' +
        'SD_SCHUL_CODE=7011489&' +
        `GRADE=${_glade}&` +
        `CLASS_NM=${_class}&` +
        `AY=2022&` +
        `TI_FROM_YMD=${_date.split('-').join('')}&` +
        `TI_TO_YMD=${_date.split('-').join('')}`
    );

    try {
        const fetchTimeTable = await axios.get(getAPIurl(setGrade, setClass, getWeekDateString()[getEncodeDayString(setDate)]));

        let arr: string[] = [];

        for (let i = 0; i < fetchTimeTable.data['hisTimetable'][0]['head'][0]['list_total_count']; ++i)
            arr.push(fetchTimeTable.data['hisTimetable'][1]['row'][i]['ITRT_CNTNT']);

        return res.json({
            isError: false,
            message: '데이터를 로드하는데 성공했습니다.',
            grade: setGrade,
            class: setClass,
            timeTable: arr
        });

    } catch (err) {
        return res.json({
            isError: true,
            message: 'Request를 보냈지만, 원하는 정보를 수신하지 못했습니다.',
        });
    }
});

export = router;