// src/middleware/index.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import colors from 'colors'; // Para los logs de consola, si quieres usar colores

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); // Obtiene los resultados de la validación del request

    if (!errors.isEmpty()) {
        // Si hay errores de validación, enviamos una respuesta de error 400 (Bad Request)
        console.log(colors.red.bold('Errores de validación:'), errors.array()); // Puedes ver los errores en tu consola
        return res.status(400).json({ errors: errors.array() });
    }

    // Si no hay errores de validación, pasamos al siguiente middleware o al controlador de la ruta
    next();
};