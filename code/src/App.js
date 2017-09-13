import React, { Component } from 'react';
import './App.css';
import {
  Col,
  Row,
  Container
} from 'reactstrap'
import Core from './Components/Core'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Core/>
        </Container>
      </div>
    )
  }
}

export default App
