// src/hooks/useForm.js
import { useState } from "react";

/**
 * Hook para formularios controlados
 * @param {object} initialValues
 * @param {function} validateFn
 */
export const useForm = (initialValues = {}, validateFn = () => ({})) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };

    setFormValues(updatedValues);

    // Validación automática
    const validationErrors = validateFn(updatedValues);
    setErrors(validationErrors);
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  };

  return {
    formValues,
    handleChange,
    resetForm,
    errors,
  };
};
