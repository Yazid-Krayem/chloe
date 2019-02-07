import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Work extends Component {
 
test = () =>{
 console.log(this.props.list)

}
  render() {
    return (
      
        <div>
            <Header />
        <p>Work </p>
        <ul>
        {this.props.list.map(x=><li>{x.title} -{x.date} --{x.id}</li>)}
        </ul>
        <button onClick={this.test}>z</button>
      <Footer />
      </div>

    );
  }
}

export default Work;
