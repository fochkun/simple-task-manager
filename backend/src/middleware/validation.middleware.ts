// src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateDto = <T extends object>(dtoClass: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const message = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat()
        .join(', ');
      return res.status(400).json({ message });
    }

    req.body = dto; // заменяем req.body на валидированный объект
    next();
  };
};
