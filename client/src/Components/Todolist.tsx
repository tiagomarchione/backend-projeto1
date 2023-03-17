import { type } from "os";
import type { ToDo } from "../types";
import { getColorByValue } from "../Constants/categories";

export type TodoListProps = {
    todoList: ToDo[];
    getTodo: (id?: number) => Promise<void> | void;
};

export function TodoList({ todoList, getTodo }: TodoListProps) {
    return (
        <section className='flex flex-row w-3/5'>  
          <div className="flex flex-row p-6">
            <ul className="flex flex-wrap gap-6 justify-evenly">
              {todoList?.map(({ id, title, description, deadline, category }) => (
                <li
                  key={id} 
                  className="bg-slate-200 flex-wrap shadow-md rounded-xl p-3 w-5/12 cursor-pointer hover:bg-slate-300"
                  onClick={() => {
                    getTodo(id);
                  }}
                >
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{ title }</p>
                    <div className="flex justify-between p-2">
                      <p className="flex font-semibold self-end items-center gap-1"><span style={{backgroundColor: getColorByValue(category)}} className="flex border h-3 w-3 rounded-full"></span>{ category }</p>
                      <time dateTime={deadline} className="font-semibold self-end text-red-600">
                        Prazo: {new Date(deadline).toLocaleDateString()}
                        </time>
                    </div>
                  </div>
                  <p>{ description }</p>
                </li>))} 
            </ul>
          </div>
        </section>
    )
}