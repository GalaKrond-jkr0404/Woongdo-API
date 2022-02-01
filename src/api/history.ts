import express, { Request, Response, NextFunction } from 'express';

import { sql } from '../dbHandle';
import { cryptoHandle } from '../cryptoHandle';
import { jwtToken } from '../token';
import { jwtTokenType } from '../types'

const router = express.Router();
router.use(express.json());

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken: string | null = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
        });
    }

    const { isLoanned, userID }: { isLoanned: string, userID: string } = Object.assign(req.body, req.query);
    const { isError, returnValue }: { isError: boolean, returnValue: jwtTokenType } = await jwtToken.verifyToken(userToken);

    let option1: string = (returnValue.type === "A" ? (isLoanned === 'true' ? 'STATUS=1' : '') : '');
    let option2: string = (userID ? `userID='${cryptoHandle.AES_DEC(userID)}'` : '');

    if (isError) {
        return res.json({
            isError: true,
            message: '데이터 접근 권한이 없습니다.',
        });
    }

    try {
        const and: string = option1.length !== 0 && option2.length !== 0 ? 'and' : ''
        const rows = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookHistory WHERE ${option1} ${and} ${option2} ORDER BY STATUS DESC`, []);
        if (Array.isArray(rows) && rows.length === 0)
            return res.json({
                isError: true,
                message: '대출하신 자료가 없습니다.',
            });
        return res.json({
            isError: false,
            message: '데이터를 로드하는데 성공했습니다.',
            rows
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        });
    }
});

export = router;
