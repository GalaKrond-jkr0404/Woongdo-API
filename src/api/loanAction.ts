import express, { Request, Response, NextFunction } from 'express';

import { sql } from '../dbHandle';
import { cryptoHandle } from '../cryptoHandle';
import { jwtToken } from '../token';
import { jwtTokenType } from '../types'

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken: string | null = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
        });
    }

    const { bookID }: { bookID: string } = Object.assign(req.body, req.query);

    if (!bookID) {
        return res.json({
            isError: true,
            message: '입력하지 않은 값들이 있습니다.',
        });
    }

    const { isError, returnValue }: { isError: boolean, returnValue: jwtTokenType } = await jwtToken.verifyToken(userToken);

    if (isError) {
        return res.json({
            isError: true,
            message: '데이터 접근 권한이 없습니다.',
        });
    }

    try {
        const query1: any = await sql(
            `SELECT count(case when status=1 then 1 end) as countOfLoanned FROM ${process.env.MYSQL_DB}.bookHistory WHERE userID=?`,
            [cryptoHandle.AES_DEC(returnValue.id)]
        );

        if (Array.isArray(query1) && query1.length === 0)
            return res.json({
                isError: true,
                message: '대출하신 자료가 없습니다.',
            });
        if ((query1[0]?.countOfLoanned) >= 3) {
            return res.json({
                isError: true,
                message: '최대 3번까지 빌릴 수 있습니다.',
            });
        }
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        });
    }

    try {
        const query2: any = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookData WHERE bookID LIKE '%${bookID}%'`, []);

        if (Array.isArray(query2) && query2.length === 0)
            return res.json({
                isError: true,
                message: '찾으시는 자료가 없습니다.'
            });

        if (query2[0]?.status !== 0)
            return res.json({
                isError: true,
                message: '대출 가능한 책이 아닙니다.',
            });

        let today: Date = new Date();
        let endLine: Date = new Date(new Date().setDate(today.getDate() + 14));
        let endYear: string = ('' + endLine.getFullYear()).slice(-4);
        let endMonth: string = ('0' + (endLine.getMonth() + 1)).slice(-2);
        let endDate: string = ('0' + endLine.getDate()).slice(-2);

        const query3: any = await sql(`INSERT INTO ${process.env.MYSQL_DB}.bookHistory VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [cryptoHandle.AES_DEC(returnValue.name),
            cryptoHandle.AES_DEC(returnValue.id),
            query2[0]?.title,
            query2[0]?.author,
            query2[0]?.company,
            query2[0]?.bookID,
            `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${today.getDate()}`,
            `${endYear}-${endMonth}-${endDate}`]);
        const query4: any = await sql(`UPDATE ${process.env.MYSQL_DB}.bookData SET status=1 WHERE bookID=?`, [bookID]);

        if (query3?.affectedRows == 0 || query4?.affectedRows == 0) {
            return res.json({
                isError: true,
                message: '선택한 책을 대출하지 못했습니다.'
            });
        }

        return res.json({
            isError: false,
            message: '책을 대출하는데 성공했습니다.'
        });

    } catch (err) {
        return res.json({
            isError: true,
            message: err
        });
    }
});

export = router;
