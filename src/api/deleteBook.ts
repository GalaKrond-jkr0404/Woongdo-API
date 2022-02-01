import express, { Request, Response, NextFunction } from 'express';

import { jwtTokenType } from '../types/';
import { jwtToken } from '../token';
import { sql } from '../dbHandle';

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

    const { bID }: { bID: string } = Object.assign(req.body, req.query);

    if (!bID) {
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
        const query1 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookData WHERE bookID=?`, [bID]);
        if (Array.isArray(query1) && query1.length === 0)
            return res.json({
                isError: true,
                message: '삭제하려는 책의 아이디가 잘못되었습니다.',
            });
        const query2: any = await sql(`DELETE FROM ${process.env.MYSQL_DB}.bookData WHERE bookID=?`, [bID]);
        if (query2?.affectedRows == 0) {
            return res.json({
                isError: true,
                message: '선택한 책을 삭제하지 못했습니다.'
            });
        }
        return res.json({
            isError: false,
            message: '선택한 책을 삭제했습니다.'
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        })
    }
});

export = router;