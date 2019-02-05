import React, { Component } from 'react';


class Home extends Component {
  render() {
    return (
      <div >
         {this.props.article.map((x)=>(
             <p>{x.id} {x.img_path} <br /> {x.title} <br /> {x.text} <br /> {x.link} <hr /></p>
         ))}
      </div>
    );
  }
}

export default Home;
