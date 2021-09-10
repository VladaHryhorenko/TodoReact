import React, { useState, useEffect, useRef} from 'react';
import '../styles/Footer.css';

export default function Footer( {todos, cleanCompleated, sortByCategory, sort} ) {

    const useFocus = () => {
        const htmlElRef = useRef(null);
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
        return [ htmlElRef,  setFocus ];
    }

    const focusClass = 'sort__button_focus';

    const [leftEl, setLeftEl] = useState(0);
    const [inputRef, setInputFocus] = useFocus();
    
    useEffect(()=>{
            setLeftEl(todos.reduce((acc, todo) => {
                if(todo.completed === false) {
                    acc++;
                }
                return acc;
            }, 0))
           
            
    }, [todos]);

    useEffect(()=> {
        console.log(sort);
        console.log(inputRef);
        
        setInputFocus();
    }, [sort])

    function handleSort(event) {
        if(event.target.innerHTML === "Completed") {
            sortByCategory("completed");              
        }
        else if(event.target.innerHTML === "Active") {
            sortByCategory("active");
        }
        else if(event.target.innerHTML === "All") {
            sortByCategory("all");
        }
    }

    function handleBlur() {
        setInputFocus();
    }

    return (
        <footer className="footer">
            <div className="left-block">
                <p className="left-item" children={`${leftEl} items left`}></p>
            </div>
            {todos.some(todo => todo!==undefined)
             && 
            <div className="sort">
                <button className= {`sort__button sort__all ${sort === "all" ? focusClass :''}`} ref={ sort === "all" ? inputRef :  null } onClick={handleSort}>All</button>
                <button className= {`sort__button sort__active ${sort === "active" ? focusClass :''}`} ref={ sort === "active" ? inputRef : null } onClick={handleSort}>Active</button>
                <button className= {`sort__button sort__completed ${sort === "completed" ? focusClass :''}`} ref={ sort === "completed" ? inputRef : null } onClick={handleSort}>Completed</button>
            </div>}
            {todos.some(todo => todo.completed === true)
             && 
             <button 
                className="clear-completed" 
                onClick={()=>cleanCompleated()}>
                    Clear compleated
            </button>}
        </footer>
    )
}
