import express, { Request, Response, NextFunction } from 'express';
import { sql } from '../dbHandle';
import { jwtToken } from '../token';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const userToken = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
        });
    }

    const { query, option } = Object.assign(req.body, req.query);

    if (!query || !option) {
        return res.json({
            isError: true,
            message: '입력하지 않은 값들이 있습니다.',
        });
    }

    const { isError }: { isError: boolean } = await jwtToken.verifyToken(userToken);

    if (isError) {
        return res.json({
            isError: true,
            message: '데이터 접근 권한이 없습니다.',
        });
    }

    try {
        const rows = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.bookData WHERE REPLACE(${option}, " ", "") LIKE REPLACE("%${query}%", " ", "") ORDER BY STATUS ASC`, []);
        if (Array.isArray(rows) && rows.length === 0)
            return res.json({
                isError: true,
                message: '찾으시는 자료가 없습니다.',
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
