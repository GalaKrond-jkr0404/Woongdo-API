import express, { Request, Response, NextFunction } from 'express';

import { jwtTokenType } from '../types/';
import { jwtToken } from '../token';
import { sql } from '../dbHandle';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken: string | null = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
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
        const query1 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.user`, []);
        const query2 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookData`, []);
        const query3 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookHistory`, []);
        return res.json({
            isError: false,
            message: '데이터를 로드하는데 성공했습니다.',
            cnt: [
                Array.isArray(query1) && query1.length,
                Array.isArray(query2) && query2.length,
                Array.isArray(query3) && query3.length
            ],
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        })
    }
});

export = router;