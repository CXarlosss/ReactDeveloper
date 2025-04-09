export const validateEmail = (email) => {
    const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return regex.test(email);
  };
  