import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './api';

dotenv.config();

class App {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.setMiddleWare();
    this.getRouting();
  }

  private setMiddleWare() {
    this.application.use(cors());
    this.application.use(express.json());
  }

  private getRouting() {
    this.application.use('/', api);
  }
}

export default App;
