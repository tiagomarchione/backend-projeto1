import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { TodoList } from '../Components/Todolist';
import { TodoView } from '../Components/Todoview';
import type { ToDo } from '../types';
import { useAxios } from '../useAxios';

const texts = {
  deleteTodoSuccess: "Sua Faina foi deletada com sucesso!",
  deleteTodoFailure: "Ifelizemente não foi possível deletar sua Faina por conta de um erro!",
};

export function Fainas() {
    
    const [{ data: todoList }, getTodoList] = useAxios<ToDo[]>({
        url: '/todolist',
        method: 'get' 
    }, {
        manual: true,
    });

    useEffect(() => {
        getTodoList();
    }, []);
    
    const [{ data: currentToDo ={} as Partial<ToDo> }, getToDo] = useAxios<ToDo>(
        {
            method: 'get',
        },
        {
            manual: true,
        }
    );
    
    const [, deleteTodo] = useAxios(
        {
            method: 'delete'
        },
        {
            manual: true,
        }
    );
    
    const navigate = useNavigate();

    return (
        <>
            {TodoList && (
                <TodoList
                    todoList={todoList || []}
                   getTodo={(id) => {
                        getToDo({
                            url: `/todolist/${id}`,
                        })
                    }}
                 />                
            )}
            
            <TodoView 
                {...currentToDo}
                onDelete={ async () => {
                    await deleteTodo({
                        url: `/todolist/${currentToDo?.id}`,
                    });
                    getTodoList();
                    currentToDo.id = undefined;
                toast(texts.deleteTodoSuccess);
                }}
            />
        </> 
    ); 
}