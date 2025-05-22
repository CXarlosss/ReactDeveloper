// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './router'; // Importamos el router que definimos

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;