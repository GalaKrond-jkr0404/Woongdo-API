import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { sql } from '../dbHandle';
import { cryptoHandle } from '../cryptoHandle';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { userID, userPW, userName, userBirthday }:
        { userID: string, userPW: string, userName: string, userBirthday: string } = Object.assign(req.body, req.query);

    if (!userID || !userPW || !userName || !userBirthday)
        return res.json({
            isError: true,
            message: '필수 옵션이 비어있습니다.'
        });

    try {
        const response = await axios.post(process.env.authAPI, { userName: cryptoHandle.AES_ENC(userName), userBirthday: cryptoHandle.AES_ENC(userBirthday) });

        if (response.data.isError)
            return res.json({
                isError: true,
                message: '학생 인증에 실패했습니다.',
            });

        try {
            const query1 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.user WHERE userName=? and userBirthday=?`, [cryptoHandle.AES_DEC(userName), cryptoHandle.AES_DEC(userBirthday)]);
            if (Array.isArray(query1) && query1.length !== 0) {
                return res.json({
                    isError: true,
                    message: '이미 인증 받은 학생입니다.'
                })
            }
            const query2 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.user WHERE userName=?`, [cryptoHandle.AES_DEC(userID)]);
            if (Array.isArray(query2) && query2[0]?.userID === cryptoHandle.AES_DEC(userID)) {
                return res.json({
                    isError: true,
                    message: '이미 있는 아이디입니다.'
                })
            }
            sql(`INSERT INTO ${process.env.MYSQL_DB}.user VALUES('S', ?, ?, ?, ?)`, [cryptoHandle.AES_DEC(userName), cryptoHandle.AES_DEC(userID), cryptoHandle.SHA256(userPW), cryptoHandle.AES_DEC(userBirthday)]);
            return res.json({
                isError: false,
                message: '회원가입에 성공했습니다.'
            });
        } catch (err) {
            return res.json({
                isError: true,
                message: err
            });
        }
    } catch (err) {
        return res.json({
            isError: true,
            message: '요청을 보냈지만, 인증 서버가 응답하지 않습니다.',
        });
    }
});

export = router;