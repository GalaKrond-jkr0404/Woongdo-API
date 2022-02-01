import express, { Request, Response, NextFunction } from 'express';

import { sql } from '../dbHandle';
import { cryptoHandle } from '../cryptoHandle';
import { jwtToken } from '../token';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { userID, userPW }: { userID: string, userPW: string } = Object.assign(req.body, req.query);

    try {
        const rows: any = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.user WHERE userID = ?`, [cryptoHandle.AES_DEC(userID)]);
        if (Array.isArray(rows) && rows.length === 0) {
            return res.json({
                isError: true,
                message: '로그인에 실패했습니다.'
            })
        }
        if (cryptoHandle.SHA256(cryptoHandle.AES_DEC(userPW)) != rows[0]?.userPW) {
            return res.json({
                isError: true,
                message: '로그인에 실패했습니다.'
            });
        }
        const token: string = await jwtToken.generateToken(rows[0].userType, userID, cryptoHandle.AES_ENC(rows[0].userName));
        return res.json({
            isError: false,
            message: '로그인에 성공했습니다.',
            token,
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        });
    }
});

export = router;
