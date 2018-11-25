import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';
import Radium, {StyleRoot} from 'radium';

class App extends Component {
    state = {
        persons: [
            {id: '1234', name: 'Maxmillan', vip: true, hide: false},
            {id: '1235', name: 'Miniature', vip: true, hide: false},
            {id: '1236', name: 'Tintin', vip: true, hide: false},
            {id: '1237', name: 'Nano', vip: false, hide: false},
            {id: '1238', name: 'Piko', vip: false, hide: false},
            {id: '1239', name: 'Femto', vip: false, hide: false}
        ],
        label : 'Show All',
        header : null,
        showPersons : false
    };

    switchNameHandler = (name, index) => {
        const persons = this.state.persons.slice();
        persons[index].name = name.substr(0, 3);

        this.setState ({
            persons: persons
        });
    };

    changeHandler = (id, event) => {
        const persons = [...this.state.persons];

        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...persons[personIndex]
        };

        person.name = event.target.value;

        persons[personIndex] = person;

        this.setState ({
            persons: persons
        });
    };

    togglePersonHandler = () => {
        let buttonLabel = this.state.label;
        let persons = null;
        const header = buttonLabel.substr(5);

        if (buttonLabel === 'Show All') {
            persons = this.state.persons.map((person, index) => {
                person.hide = false;
                return person;
            });
            buttonLabel = 'Show VIPs';
        } else if (buttonLabel === 'Show VIPs') {
            persons = this.state.persons.map((person, index) => {
                person.hide = !person.vip;
                return person;
            });
            buttonLabel = 'Show Mango People';
        } else {
            persons = this.state.persons.map((person, index) => {
                person.hide = person.vip;
                return person;
            });
            buttonLabel = 'Show All';
        }

        this.setState({
            persons: persons,
            label: buttonLabel,
            header: header,
            showPersons: true
        });
    };

    render() {
        let persons = null;
        const style = {
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        if (this.state.showPersons) {
            persons = (
                <div>
                    <h3>{this.state.header}</h3>
                    {this.state.persons.map((person, index) => {
                        return !person.hide ?
                            (<Person name={person.name}
                                     key={person.id}
                                     changed={this.changeHandler.bind(this, person.id)}
                                     click={() => this.switchNameHandler(person.name, index)}/>)
                            : null;
                            //Alternative approaches of passing handler props
                        //click={() => this.switchNameHandler(person.name, index)}
                        //click={this.switchNameHandler.bind(null, person.name, index)} !!
                    })}
                </div>
            );

            style.backgroundColor = 'red';

            style[':hover'] = {
                backgroundColor: 'salmon',
                color: 'black'
            }
        }

        return (
            <StyleRoot>
              <div className="App">
                  <h1>List of Persons</h1>
                  <button style={style} onClick={this.togglePersonHandler}>{this.state.label}</button>
                  {persons}
              </div>
            </StyleRoot>
        );
    }
}

export default Radium(App);
