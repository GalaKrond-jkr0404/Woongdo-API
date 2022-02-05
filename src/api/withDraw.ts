import express, { Request, Response, NextFunction } from 'express';
import { sql } from '../dbHandle';
import { jwtToken } from '../token';
import { jwtTokenType } from '../types'

const router = express.Router();
router.use(express.json());

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken: string | null = req.headers.authorization as string ?? null;

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
        const query1 = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.user WHERE userID=?`, [returnValue.id]);
        if (Array.isArray(query1) && query1.length === 0)
            return res.json({
                isError: true,
                message: '사용자가 존재하지 않습니다.',
            });
        const query2: any = await sql(`DELETE FROM ${process.env.MYSQL_DB}.user WHERE userID=?`, [returnValue.id]);
        if (query2?.affectedRows == 0) {
            return res.json({
                isError: true,
                message: '회원님을 탈퇴 처리하지 못했습니다.'
            });
        }
        return res.json({
            isError: false,
            message: '회원님을 탈퇴 처리했습니다.',
        });
    } catch (err) {
        return res.json({
            isError: true,
            message: err
        });
    }
});

export = router;
