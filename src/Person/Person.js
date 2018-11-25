import React from 'react';
import './Person.css';
import Radium, {StyleRoot} from 'radium';


const person = (props) => {
    const style = {
        '@media (min-width: 700px)': {
            width: '650px',
        }
    };

    return (
        <div className="Person" style={style}>
            <p>My name is {props.name}!</p>
            <div className="Handler">
                <input type="text" onChange={props.changed} value={props.name}/>
                <button onClick={props.click}>Switch to Nickname</button>
            </div>
        </div>
    );
};

export default Radium(person);