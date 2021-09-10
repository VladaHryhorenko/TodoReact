import React, { useState } from 'react';
import '../styles/Header.css';
import Arrow from './down_arrow.svg';

export default function Header( {onCreate, completedAll, length}) {

    const [input, setInput] = useState('');
    
    function submitHandler(event) {
        event.preventDefault();
        onCreate(input);
        setInput('');
    }

    function onInputChange(event) {
        setInput(event.target.value);
    }

    return (
        <header className="header">
            {length !== 0 && <button className="header__button" onClick={()=>completedAll()}> <img src={Arrow} alt=''/> </button>}
            <form onSubmit={submitHandler}>
                <input type="text" className='header__input' placeholder={"What needs to be done?"} value={input} onChange={onInputChange} />
            </form>
        </header>
    )

    
}

