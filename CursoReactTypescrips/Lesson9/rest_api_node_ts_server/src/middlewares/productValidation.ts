// src/middlewares/productValidation.ts
import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import colors from 'colors';

// ... (tus validaciones existentes: validateCreateProduct, validateUpdateProduct) ...

// **AÑADE ESTO (O VERIFICA QUE ESTÉ BIEN DEFINIDO Y EXPORTADO)**
export const validatePartialUpdateProduct = [
param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  body('name')
    .optional()
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
      console.log(colors.red('Errores de validación en middleware (actualización parcial):'), formattedErrors);
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  }
];

// **AÑADE ESTO (O VERIFICA QUE ESTÉ BIEN DEFINIDO Y EXPORTADO)**
export const validateProductId = [
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => err.msg);
      console.log(colors.red('Errores de validación de ID:'), formattedErrors);
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  }
];

export const validateUpdateProduct = [
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  body('name').isString().withMessage('El nombre debe ser una cadena de texto'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('availability').isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => err.msg);
      console.log(colors.red('Errores de validación en middleware (actualización total):'), formattedErrors);
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  }
];

export const validateCreateProduct = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser un string'),
  body('price')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('availability')
    .notEmpty()
    .withMessage('La disponibilidad es obligatoria')
    .isBoolean()
    .withMessage('La disponibilidad debe ser un booleano'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => err.msg);
      console.log(colors.red('Errores de validación (createProduct):'), formattedErrors);
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  },
];
