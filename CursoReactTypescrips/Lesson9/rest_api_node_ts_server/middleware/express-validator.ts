// middlewares/productValidation.ts
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import colors from 'colors';

export const validateCreateProduct = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto'),
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('availability')
    .notEmpty().withMessage('La disponibilidad es obligatoria')
    .isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => err.msg);
      console.log(colors.red('Errores de validación en middleware:'), formattedErrors);
      return res.status(400).json({ errors: formattedErrors });
    }
    next(); // Si no hay errores, pasa al siguiente middleware o al controlador
  }
];

export const validateUpdateProduct = [
  param('id').isUUID().withMessage('ID de producto inválido'), // si usas UUIDs
  body('name')
    .optional() // Permite que el campo no esté presente
    .isString().withMessage('El nombre debe ser una cadena de texto'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('availability')
    .optional()
    .isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => err.msg);
      console.log(colors.red('Errores de validación en middleware (actualización):'), formattedErrors);
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  }
];