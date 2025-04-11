// @ts-nocheck
// src/hooks/useForm.js
import { useState } from "react";

export const useForm = (initialValues = {}, validateFn = () => ({})) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors(validateFn({ ...formValues, [name]: value }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  };

  return { formValues, handleChange, resetForm, errors };
};
