import React, { Component } from 'react';
import { withRouter, Switch, Route } from "react-router-dom";
import Biography from './Components/Biography';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Home from './Components/Home';

class App extends Component {

  
  renderHomePage = () =>{
    return <Home />
  }
  renderWork = () =>{
    return <Work />
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
