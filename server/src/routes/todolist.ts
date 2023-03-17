import { Express, Router, Request, Response } from "express";
import { promises as fs } from "fs";
import type { Todo } from "../types";
import * as todoCrud from "../todoCrud";

export const todolist = Router();

const exampleToDo: Todo = {
    id: 1,
    title: "Um título da Faina",
    description: "Uma descrição da faina",
    deadline: new Date(),
    createdAt: new Date(),
    category: "Uma categoria da faina"
};

//listar
todolist.get('/', async (req, res) => {
    const todolist = await todoCrud.getTodos();
    res.status(200).json(todolist);
});

//criar
todolist.post('/', async(req, res) => {
    const resultCreate = await todoCrud.createTodo(req.body)
    res.status(201).json(resultCreate);
});

//atualizar parcialmente
todolist.patch('/:id', async (req, res) => {
    const {success, todo} = await todoCrud.updateTodo(
        Number(req.params.id),
        req.body
    );

    res.status(200).json({
        success,
        data: todo,
    });
});

//listar pelo id
todolist.get('/:id', async (req, res) => {
    const todo = await todoCrud.getTodo(Number(req.params.id));
    res.status(200).json(todo);
});

//alterar pelo id
todolist.put('/:id', (req, res) => {
    res.status(200).json({
        data: {
            id: Number(req.params.id),
            ...exampleToDo,
        },
        success: true
    });
});

//deletar pelo id
todolist.delete('/:id', async (req, res) => {
    const resultDelete = await todoCrud.deleteTodo(Number(req.params.id));
    res.status(200).json(resultDelete);
})