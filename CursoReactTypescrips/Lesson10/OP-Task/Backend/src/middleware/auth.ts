import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Interfaz del payload del JWT
interface JwtPayload {
  id: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ error: 'No autorizado. Token no proporcionado.' });
  }

  const [, token] = bearer.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded?.id) {
      return res.status(401).json({ error: 'Token inválido o incompleto.' });
    }

    const user = await User.findById(decoded.id).select('_id name email');

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error verificando el token:', error);
    res.status(401).json({ error: 'Token no válido.' });
  }
};
