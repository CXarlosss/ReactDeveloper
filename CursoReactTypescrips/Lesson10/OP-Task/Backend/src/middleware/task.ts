// Importamos los tipos para tipar correctamente los middlewares
import type { Request, Response, NextFunction } from 'express'

// Importamos el modelo de tarea y su tipo
import Task, { ITask } from '../models/Task'

// Extendemos el tipo Request para que Express sepa que puede existir `req.task`
// Esto nos permite acceder a `req.task` con tipado y autocompletado en controladores
declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}
// Middleware que busca una tarea por ID
// ✔️ Si existe, la guarda en `req.task`
// ❌ Si no existe, devuelve 404
// ❗ Se usa en `router.param('taskId', taskExists)`

export async function taskExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { taskId } = req.params
        const task = await Task.findById(taskId)

        if (!task) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({ error: error.message })
        }

        req.task = task
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }
}
// Middleware que verifica que la tarea pertenece al proyecto que se está manipulando
// ✔️ Compara `req.task.project` con `req.project.id`
// ❌ Si no pertenecen, devuelve error
// ❗ Se usa justo después de `taskExists`, con `router.param('taskId', ...)`

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Acción no válida')
        return res.status(400).json({ error: error.message })
    }
    next()
}
// Middleware que comprueba si el usuario logueado es el creador (manager) del proyecto
// ✔️ Compara `req.user.id` con `req.project.manager`
// ❌ Si no coinciden, no se permite modificar/eliminar
// ❗ Se puede usar en PUT/DELETE de proyectos, tareas, etc.

export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
    if (req.user.id.toString() !== req.project.manager.toString()) {
        const error = new Error('Acción no válida')
        return res.status(400).json({ error: error.message })
    }
    next()
}
