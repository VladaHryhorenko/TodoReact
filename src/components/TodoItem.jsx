import React, { useContext, useRef, useState } from 'react';
import '../styles/TodoItem.css';
import Context from '../context';



export default function TodoItem({ todo, onChange }) {
    const { removeTodo, editTitle } = useContext(Context);
    const [edit, setEdit] = useState(todo.title);
    const useFocus = () => {
        const htmlElRef = useRef(null);
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
        return [ htmlElRef,  setFocus ];
    }
    const [inputRef, setInputFocus] = useFocus();
    const classes = [];

    const viewRef = useRef();
    const editRef = useRef();

    if (todo.completed) {
        classes.push('done');
    }

    function handleBlur() {
        setEdit(inputRef.current.defaultValue);
        editTitle(todo.id, edit);
        viewRef.current.classList.add('active');
        editRef.current.classList.remove('active');
    }

    function editTodo() {
        if(viewRef.current.classList.contains('active')) {
            viewRef.current.classList.remove('active');
            editRef.current.classList.add('active');
        } else {
            viewRef.current.classList.add('active');
            editRef.current.classList.remove('active');
        }
        setInputFocus();
    }

    const handleEdit = (event) => {
        setEdit(event.target.value);
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        editTitle(todo.id, edit);
        viewRef.current.classList.add('active');
        editRef.current.classList.remove('active');
    }

    return (
        <li className="todo-item" onDoubleClick={editTodo}>
            <div className="view active" ref={viewRef}>
                <label htmlFor="todo" className={`todo-lable ${classes.join(' ')}`}>
                    <input type="checkbox" checked={todo.completed} className="todo" name="todo" onChange={() => onChange(todo.id)} />
                    {todo.title}
                </label>
                <button className='remove-button' onClick={()=>{removeTodo(todo.id)}}>&times;</button>
            </div>
            <div className="edit" ref={editRef}>
                <form className="edit__form" onSubmit={handleEditSubmit}>
                    <input className="edit__input" ref={inputRef} value={edit} onBlur={handleBlur} onChange={handleEdit}/>
                </form>
            </div>
        </li>
    )
}
