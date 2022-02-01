import express, { Request, Response, NextFunction } from 'express';
import info from './info';
import login from './login';
import register from './register';
import search from './search';
import history from './history';
import loanAction from './loanAction';
import returnAction from './returnAction';
import pwReset from './pwReset';
import withDraw from './withDraw';
import addBook from './addBook';
import deleteBook from './deleteBook';
import meal from './meal';
import timetable from './timetable';
import { jwtToken } from '../token';
import * as dotenv from 'dotenv';
import { jwtTokenType } from '../types';

dotenv.config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use('/api/info', info);
router.use('/api/login', login);
router.use('/api/register', register);
router.use('/api/search', search);
router.use('/api/history', history);
router.use('/api/loanAction', loanAction);
router.use('/api/returnAction', returnAction);
router.use('/api/pwReset', pwReset);
router.use('/api/withDraw', withDraw);
router.use('/api/addBook', addBook);
router.use('/api/deleteBook', deleteBook);
router.use('/api/meal', meal);
router.use('/api/timetable', timetable);

router.post('/api/token', async (req: Request, res: Response, next: NextFunction) => {
    const { token }: { token: string } = Object.assign(req.body, req.query);
    const result: { isError: boolean, returnValue: jwtTokenType } = await jwtToken.verifyToken(token);
    return res.json(result);
});

export = router;