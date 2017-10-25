import React, { Component } from 'react';
import Supertable from './components/Supertable';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Supertable/>
          <br/>
          <Supertable colsNum={5} rowsNum={7} cellsSize={50} tableBorderSize={1} tableSpacing={2} />
      </div>
    );
  }
}

export default App;
