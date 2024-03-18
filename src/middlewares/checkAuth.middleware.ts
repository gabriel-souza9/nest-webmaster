import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    const { API_KEY } = process.env;
    const token = headers["x-access-token"];
    if(token != API_KEY){
        return res.status(401).json({ message: "not authorized"});
    }
    next();
  }
}