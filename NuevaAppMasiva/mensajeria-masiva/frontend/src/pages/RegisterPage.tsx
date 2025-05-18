import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e7e34;
  }
`;

const LinkToLogin = styled.p`
  margin-top: 15px;
  font-size: 0.9em;
`;

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos de registro al backend
    // y, en caso de éxito, redirigir al usuario a la página de inicio de sesión.
    console.log('Registrando usuario:', { username, email, password });
    // Simulación de registro exitoso
    navigate('/login');
  };

  return (
    <RegisterPageContainer>
      <h2>Registrarse</h2>
      <RegisterForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Registrarse</Button>
      </RegisterForm>
      <LinkToLogin>
        ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
      </LinkToLogin>
    </RegisterPageContainer>
  );
}

export default RegisterPage;