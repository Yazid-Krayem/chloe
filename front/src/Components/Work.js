import React, { Component } from 'react';
import Header from './Header';

class Work extends Component {
  state={
    articles_list:[]
  }
  componentDidMount(){
    const getList = async()=>{
        const response = await fetch('//localhost:8080/articles/list')
        const data = await response.json()
        if(data){
          const articles_list = data.result
          this.setState({articles_list})
        }  
        // this.setState({articles_list:data})
    }
    getList();
  }

  render() {
    const articles = this.state.articles_list
    return (
      
        <div>
            <Header />
        <p>Work</p>
        {articles.map(x=><p>{x.title}</p>)}
      </div>
    );
  }
}

export default Work;
