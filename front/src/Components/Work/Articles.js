import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';

class Articles extends Component {

  // componentWillReceiveProps(){
  //   this.props.workFiltering('article')
  // }
  render() {
    return (
      
        <div>
            <Header />
        <p>Articles </p>
        <div>
        {this.props.list.map(x=><div><h2 style={{textAlign:"center"}}>{x.title}</h2> <br />
        <h4 style={{textAlign:"center"}}>{x.date}</h4> <br /> 
        {x.img_path}<br /><article> {x.text}</article><br />{x.link}<hr /></div>)}
        </div>
<a href='/'>Home</a>
      <Footer />
      </div>

    );
  }
}

export default Articles;
