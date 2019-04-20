import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';

class Videos extends Component {
 
test = () =>{
 console.log(this.props.list)

}
  render() {
    return (
      
        <div>
            <Header />
        <p>Videos </p>
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

export default Videos;
