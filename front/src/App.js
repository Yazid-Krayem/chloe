import React, { Component } from 'react';
import { withRouter, Switch, Route, Link } from "react-router-dom";
import Biography from './Components/Biography';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Home from './Components/Home';

class App extends Component {

   mapping = () =>{
    const articles = this.state.articles_list
    console.log('s')
    return <div>{articles.map(x => <p>{x.id}</p>)}</div>
  }
  renderHomePage = () =>{
    return <Home />
  }
  renderWork = () =>{
    console.log(this.mapping)
    return <Work  mapping={this.mapping}/>
  }
  renderBiography = () =>{
    return <Biography />
  }
 
  renderContactMe = () =>{
    return <Contact />
  }
  render() {
    return (
      <div >
        <Switch>
        <Route path="/" exact render={this.renderHomePage} />
        <Route path="/work" render={this.renderWork} />
        <Route path="/biography" render={this.renderBiography} />
        <Route path="/contact" render= {this.renderContactMe} />
        <Route render={()=><div>not found!</div>}/>
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
