import React, { Component } from 'react';
import Header from './Header';
class Home extends Component {
  state={
    last3:[]
    
  }
  componentDidMount(){
    const getlast3 = async()=>{

         const response = await fetch('//localhost:8080/articles/last3')
         const data = await response.json()
           if(data){
           const last3 = data.result
           this.setState({last3})
           console.log(this.state.last3)
        } 
      } 
        // this.setState({articles_list:data})
    
    getlast3();
  }


  render() {
    const articles = this.state.last3;

    return (
        <div>
<Header />
<p>Home</p>
  <ul>
        {articles.reverse().map(x=><li>{x.title}- {x.id} - {x.date}</li>)}
        </ul>      
  </div>
    );
  }
}

export default Home;
