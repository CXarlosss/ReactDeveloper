// index.ts
import app from './app.js';
import  colors from "colors";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(colors.cyan.bold(`Servidor escuchando en http://localhost:${PORT}`));
});
