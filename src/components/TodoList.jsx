import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';


function TodoList({todos, onToggle, sort}) {
    const [arr, setArr] = useState([]);
    useEffect(() => {
        let newArr = todos;

        //switch
        if(sort === "completed") {
            setArr(newArr.filter(todo => todo.completed === true));
          }
          else if(sort === "active") {
            setArr(newArr.filter(todo => todo.completed === false));
          }
          else if(sort === "all") {
              setArr(todos);
          }
    }, [sort, todos]);
    return (
            <ul className='todo-list'>
                {
                    arr.map((todo) => {
                        return (<TodoItem todo={todo} key={todo.id} i={todo.id} onChange={onToggle}/>)
                    })
                }
            </ul>
    )
}

export default TodoList;