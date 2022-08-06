import express, { Request, Response, NextFunction } from 'express';

import { jwtTokenType } from '../types/';
import { jwtToken } from '../token';
import { sql } from '../dbHandle';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.put('/', async (req: Request, res: Response) => {
    const userToken: string | null = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
        });
    }

    const {calendarID}: {calendarID: string} = Object.assign(req.body, req.query);

    if (!calendarID) {
        return res.json({
            isError: true,
            message: '입력하지 않은 값들이 있습니다.',
        });
    }

    const { isError, returnValue }: { isError: boolean, returnValue: jwtTokenType } = await jwtToken.verifyToken(userToken);

    if (isError || returnValue.type !== "A") {
        return res.json({
            isError: true,
            message: '데이터 접근 권한이 없습니다.',
        });
    }

    try {
        await sql(`DELETE FROM ${process.env.MYSQL_DB}.calendar where title=? AND sData=? AND eData=? AND content=?`,
        [calendarID, returnValue.id]);
       
        return res.json({
            isError: false,
            message: "성공적으로 일정을 삭제했습니다"
        });
    } 
    catch (err) {
        return res.json({
            isError: true,
            message: err
        })
    }
});
