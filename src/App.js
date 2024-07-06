
import './App.css';
import React, { Component, } from 'react'
import NavBarT from './components/NavBarT';
import News from './components/News';

export default class App extends Component {
 
  render() {
    
    return (

      <div>
        <NavBarT></NavBarT>
        <News pageSize={18}></News>
      </div>

    )
  }
}

