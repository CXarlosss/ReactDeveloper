import type { Request, Response } from 'express'
import Note, {INote} from '../models/Note'
import { Types } from 'mongoose'

type NoteParams = {
    noteId: Types.ObjectId
}

export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        const { content } = req.body

        const note = new Note()
        if (!req.user) {
  return res.status(401).json({ error: 'No autorizado' });
}

        note.content = content
        note.createdBy = req.user.id
        note.task = req.task.id

        req.task.notes.push(note.id)
        try {
            await Promise.allSettled([req.task.save(), note.save()])
            res.send('Nota Creada Correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getTaskNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({task: req.task.id})
            res.json(notes)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params as { noteId: string };

    const note = await Note.findById(noteId);

    if (!note) {
        const error = new Error('Nota no encontrada');
        return res.status(404).json({ error: error.message });
    }
if (!req.user) {
  return res.status(401).json({ error: 'No autorizado' });
}

    if (note.createdBy.toString() !== req.user.id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(401).json({ error: error.message });
    }

    req.task.notes = req.task.notes.filter(
        (n: { toString: () => string }) => n.toString() !== noteId.toString()
    );

    try {
        await Promise.allSettled([req.task.save(), note.deleteOne()]);
        res.send('Nota Eliminada');
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' });
    }
};

}