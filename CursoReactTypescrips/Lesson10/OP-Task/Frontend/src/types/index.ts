import { z } from 'zod'

/** -----------------------
 * 🔐 AUTH & USERS
 * -----------------------
 * Esquema base de autenticación.
 * Contiene los campos comunes en formularios de login, registro, etc.
 */
const authSchema = z.object({
    name: z.string(), // nombre del usuario
    email: z.string().email(), // email válido
    current_password: z.string(), // contraseña actual (para cambios)
    password: z.string(), // nueva contraseña
    password_confirmation: z.string(), // confirmación de la nueva contraseña
    token: z.string() // token (para confirmación de cuenta o recuperación)
})

// Inferencia del tipo completo desde el esquema
type Auth = z.infer<typeof authSchema>

// Formularios específicos (reutilizando partes de `Auth`)
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>
/** -----------------------
 * 👤 USER
 * -----------------------
 * Basado en `authSchema`, pero extendido con _id.
 * Representa un usuario completo.
 */
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>

// Formulario para actualizar perfil (solo nombre y email)
export type UserProfileForm = Pick<User, 'name' | 'email'>
/** -----------------------
 * 📝 NOTES
 * -----------------------
 * Representan anotaciones en una tarea.
 * Incluye quién la escribió (`createdBy`) y a qué tarea pertenece.
 */
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(), // contenido de la nota
    createdBy: userSchema, // usuario que la creó
    task: z.string(), // ID de la tarea relacionada
    createdAt: z.string() // fecha de creación
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>
/** -----------------------
 * ✅ TASKS
 * -----------------------
 * Enum con los posibles estados de una tarea
 */
export const taskStatusSchema = z.enum([
    "pending",
    "onHold",
    "inProgress",
    "underReview",
    "completed"
])

export type TaskStatus = z.infer<typeof taskStatusSchema>

// Esquema completo de tarea (versión detallada con todo)
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema
  })),
  notes: z.array(noteSchema.extend({
    createdBy: userSchema
  })),
  createdAt: z.string(),
  updatedAt: z.string(),

  // 👇 NUEVAS propiedades
  dueDate: z.string().optional(),
  priority: z.enum(['alta', 'media', 'baja']).optional(),
  assignedTo: userSchema.optional()
})

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
  dueDate: true,
  priority: true,
  assignedTo: true
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = z.infer<typeof taskProjectSchema>
/** -----------------------
 * 📁 PROJECTS
 * -----------------------
 * Proyecto completo con tareas y miembros del equipo.
 */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })), // ID del manager
    tasks: z.array(taskProjectSchema), // lista de tareas básicas
    team: z.array(z.string(userSchema.pick({ _id: true }))) // array de IDs de usuarios
})

// Versión simplificada para el dashboard
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

// Versión usada para editar un proyecto
export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>
/** -----------------------
 * 👥 TEAM
 * -----------------------
 * Representación de un miembro del equipo.
 */
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})

export const teamMembersSchema = z.array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>
