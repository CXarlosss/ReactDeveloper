import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
console.log("✅ ErrorMessage en TaskForm:", ErrorMessage);


// Type definition for component props
type TaskFormProps = {
    errors: FieldErrors<TaskFormData>  // Form validation errors from react-hook-form
    register: UseFormRegister<TaskFormData>  // Form registration function from react-hook-form
}

/**
 * TaskForm Component - A form for creating/editing tasks with validation
 * @param {TaskFormProps} props - Component props containing form errors and register function
 * @returns {JSX.Element} - A form with fields for task name and description
 */
export default function TaskForm({ errors, register }: TaskFormProps) {
    return (
        <>
            {/* Task Name Input Field */}
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >
                    Nombre de la tarea
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3 border-gray-300 border"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",  // Validation rule
                    })}
                />
                {/* Display error message if name validation fails */}
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            {/* Task Description Textarea Field */}
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >
                    Descripción de la tarea
                </label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3 border-gray-300 border"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"  // Validation rule
                    })}
                />
                {/* Display error message if description validation fails */}
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}