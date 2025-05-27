import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskProject } from "@/types/index"
import { deleteTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { useDraggable } from '@dnd-kit/core'

// Type definition for component props
type TaskCardProps = {
    task: TaskProject  // The task data to display
    canEdit: boolean   // Flag to determine if edit/delete options should be shown
}

/**
 * TaskCard Component - Displays a single task card with options to view/edit/delete
 * @param {TaskCardProps} props - Component props containing task data and edit permission
 * @returns {JSX.Element} - A draggable task card with task details and action menu
 */
export default function TaskCard({ task, canEdit }: TaskCardProps) {
    // Draggable hook for drag-and-drop functionality
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id  // Unique identifier for the draggable element
    })

    // Navigation hook for routing
    const navigate = useNavigate()
    // Get project ID from URL params
    const params = useParams()
    const projectId = params.projectId!

    // Query client for cache management
    const queryClient = useQueryClient()
    // Mutation for deleting a task
    const { mutate } = useMutation({
        mutationFn: deleteTask,  // API function to call
        onError: (error) => {
            toast.error(error.message)  // Show error toast on failure
        },
        onSuccess: (data) => {
            toast.success(data)  // Show success toast on completion
            // Invalidate project query to refresh data
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        }
    })

    // Style object for the draggable element with transform animation
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        padding: "1.25rem",
        backgroundColor: '#FFF',
        width: '300px',
        display: 'flex',
        borderWidth: '1px',
        borderColor: 'rgb(203 213 225 / var(--tw-border-opacity))'
    } : undefined

    return (
        <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
            {/* Draggable task content area */}
            <div 
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                style={style}
                className="min-w-0 flex flex-col gap-y-4"
            >
                {/* Task name */}
                <p className="text-xl font-bold text-slate-600 text-left">
                    {task.name}
                </p>
                {/* Task description */}
                <p className="text-slate-500">{task.description}</p>
            </div>

            {/* Task action menu (ellipsis) */}
            <div className="flex shrink-0 gap-x-6">
                <Menu as="div" className="relative flex-none">
                    {/* Menu button */}
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    
                    {/* Menu dropdown transition */}
                    <Transition 
                        as={Fragment} 
                        enter="transition ease-out duration-100" 
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" 
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" 
                        leaveTo="transform opacity-0 scale-95"
                    >
                        {/* Menu items */}
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            {/* View task option */}
                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                                >
                                    Ver Tarea
                                </button>
                            </Menu.Item>

                            {/* Conditional edit/delete options (only shown if canEdit is true) */}
                            {canEdit && (
                                <>
                                    {/* Edit task option */}
                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                                        >
                                            Editar Tarea
                                        </button>
                                    </Menu.Item>

                                    {/* Delete task option */}
                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            onClick={() => mutate({ projectId, taskId: task._id })}
                                        >
                                            Eliminar Tarea
                                        </button>
                                    </Menu.Item>
                                </>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}