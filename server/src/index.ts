import express from 'express';
import cors from 'cors';
import { todolist } from './routes/todolist';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todolist", todolist);

const port = 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
    console.log('Deu muito bom');
});

// app.get('/', (req, res) => {
//     res.json({
//         nome: "Tiago",
//         sobrenome: "Siqueira",
//         último: "Marchione"
//     });
// });

// app.get('/alunos', (req, res) => {
//     res.json(['Tiago', 'Patrícia', 'Miguel']);
// });