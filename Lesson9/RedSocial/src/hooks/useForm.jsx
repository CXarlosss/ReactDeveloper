// src/hooks/useForm.js
import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    handleChange,
    resetForm
  };
};
