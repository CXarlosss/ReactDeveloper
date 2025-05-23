import server from './server.js';
import colors from 'colors';
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(colors.cyan.bold(`🚀 Server ready at http://localhost:${PORT}`))
});