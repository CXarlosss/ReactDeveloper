// Middleware de autenticación para proteger rutas
// ✅ Verifica que el usuario envía un token válido en la cabecera `Authorization`
// ✅ Decodifica el token y recupera el usuario desde la base de datos
// ✅ Si todo está bien, agrega el usuario a `req.user` y llama a `next()`
// ❌ Si hay errores (token ausente o inválido), responde con código 401 o 500
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    
    // Si no se envió el token, se rechaza la solicitud
    if (!bearer) {
        const error = new Error('No Autorizado')
        return res.status(401).json({ error: error.message })
    }

    // Extrae el token desde el header: 'Bearer token123...'
    const [, token] = bearer.split(' ')
    
    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Comprueba que el token contiene un `id` válido
        if (typeof decoded === 'object' && decoded.id) {
            // Busca al usuario en la base de datos y solo devuelve algunos campos
            const user = await User.findById(decoded.id).select('_id name email')

            if (user) {
                // Guarda el usuario en la request para usarlo en otros middlewares/controladores
                req.user = user
                next() // Continúa con la ejecución
            } else {
                // Si el usuario no se encuentra, responde con error
                res.status(500).json({ error: 'Token No Válido' })
            }
        }
    } catch (error) {
        // Captura errores de validación del token (expirado, modificado, inválido, etc.)
        res.status(500).json({ error: 'Token No Válido' })
    }
}

