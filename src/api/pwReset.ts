import express, { Request, Response, NextFunction } from 'express';

import { sql } from '../dbHandle';
import { cryptoHandle } from '../cryptoHandle';
import { jwtToken } from '../token';
import { jwtTokenType } from '../types'

const router = express.Router();
router.use(express.json());

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.headers.authorization as string ?? null;
    const { old_userPW, new_userPW } = Object.assign(req.body, req.query);

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
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
        const query1: any = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.user WHERE userID=?`, [cryptoHandle.AES_DEC(returnValue.id)]);
        if (Array.isArray(query1) && query1.length === 0)
            return res.json({
                isError: true,
                message: '사용자가 존재하지 않습니다.',
            });
        if (cryptoHandle.SHA256(cryptoHandle.AES_DEC(old_userPW)) != query1[0].userPW)
            return res.json({
                isError: true,
                message: '현재 비밀번호가 옳지 않습니다.',
            });
        const query2: any = await sql(`UPDATE ${process.env.MYSQL_DB}.user SET userPW=? WHERE userID=?`, [cryptoHandle.SHA256(cryptoHandle.AES_DEC(new_userPW)), cryptoHandle.AES_DEC(returnValue.id)]);
        if (query2?.affectedRows == 0) {
            return res.json({
                isError: true,
                message: '비밀번호를 변경하지 못했습니다.'
            });
        }
        return res.json({
            isError: false,
            message: '비밀번호를 변경했습니다.',
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        });
    }
});

export = router;
