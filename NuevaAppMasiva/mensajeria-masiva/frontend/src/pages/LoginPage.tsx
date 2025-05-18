import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Nuestro hook de autenticación
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LoginForm = styled.form`
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkToRegister = styled.p`
  margin-top: 15px;
  font-size: 0.9em;
`;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos de inicio de sesión al backend
    // y recibir el token y la información del usuario.
    // Por ahora, vamos a simular un inicio de sesión exitoso.
    const fakeToken = 'fake_auth_token';
    const fakeUser = { userId: 'someId', username: username };
    login(fakeToken, { user: fakeUser, isAdmin: false }); // Simula el login
    // navigate('/'); // Ya se hace en el login
  };

  return (
    <LoginPageContainer>
      <h2>Iniciar Sesión</h2>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Iniciar Sesión</Button>
      </LoginForm>
      <LinkToRegister>
        ¿No tienes una cuenta? <a href="/register">Regístrate</a>
      </LinkToRegister>
    </LoginPageContainer>
  );
}

export default LoginPage;