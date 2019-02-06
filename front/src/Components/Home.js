import React, { Component } from 'react';
import Header from './Header';
class Home extends Component {
 


  render() {
    const articles = this.props.list;

    return (
        <div>
<Header />
<p>Home</p>
  <ul>
  
   {articles.filter((i ,index) => (index < 3)).map((i,index)=> (<li>{i.date}</li>))
  }
        </ul>      
  </div>
    );
  }
}

export default Home;
