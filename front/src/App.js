import React, { Component } from 'react';

import './App.css';
import Home from './Component/Home';

class App extends Component {
  state ={
    article_list : []
  }
  getList = async () =>{
    const respone =await fetch('//localhost:8080/articles/list')
    const data = await respone.json()
    if(data){
      const article_list = data.result
      this.setState({article_list})
    }
  }
 
   componentDidMount(){
    this.getList()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Home 
        article ={this.state.article_list}
        />

        </header>
      </div>
    );
  }
}

export default App;
