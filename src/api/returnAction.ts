import express, { Request, Response, NextFunction } from 'express';

import { sql } from '../dbHandle';
import { cryptoHandle } from '../cryptoHandle';
import { jwtToken } from '../token';
import { jwtTokenType } from '../types'

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
        });
    }

    const { returnItemString } = Object.assign(req.body, req.query);

    if (!returnItemString || returnItemString === '[]') {
        return res.json({
            isError: true,
            message: '책을 선택하지 않으셨습니다.',
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
        let returnItem = JSON.parse(returnItemString);
        for (let i = 0; i < returnItem.length; ++i) {
            let { userID, bookID } = returnItem[i];
            if (!userID || !bookID) {
                return res.json({
                    isError: true,
                    message: '잘못된 인자 값을 넘겼습니다.'
                });
            }
            const query1 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookData WHERE bookID=?`, [bookID]);
            if (Array.isArray(query1) && query1.length === 0)
                return res.json({
                    isError: true,
                    message: '반납하려는 책의 아이디가 잘못되었습니다.',
                });

            const query2: any = await sql(`UPDATE ${process.env.MYSQL_DB}.bookHistory SET status=0 WHERE userID=? and bookID=?`, [cryptoHandle.AES_DEC(userID), bookID]);
            if (query2?.affectedRows != 0) {
                sql(`UPDATE ${process.env.MYSQL_DB}.bookData SET status=0 WHERE bookID=?`, [bookID]);
            } else {
                return res.json({
                    isError: true,
                    message: '선택한 책을 반납하지 못했습니다.'
                });
            }
        }
        return res.json({
            isError: false,
            message: '선택한 책을 반납했습니다.'
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: '잘못된 인자 값을 넘겼습니다.'
        })
    }
});

export = router;
