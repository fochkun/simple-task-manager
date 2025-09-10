// src/middleware/param-validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateParams = <T extends Record<string, any>>(dtoClass: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.params);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const message = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat()
        .join(', ');
      return res.status(400).json({ message });
    }

    // Расширяем req.params валидированными данными
    Object.assign(req.params, dto);
    next();
  };
};
