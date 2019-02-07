import React, { Component } from 'react';
import { withRouter, Switch, Route } from "react-router-dom";
import Biography from './Components/Biography';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Home from './Components/Home';

class App extends Component {
  state={
    articles_list:[]
  }
  renderArticlePage = ({ match }) => {
    const id = match.params.id;
    // find the article:
    // eslint-disable-next-line eqeqeq
    const article = this.state.articles_list.find(article => article.id == id);
    // we use double equality because our ids are numbers, and the id provided by the router is a string
    if (!article) {
      return <div>{id} not found</div>;
    }
    return (
      <p>www</p>
    );
  };
  componentDidMount(){
    const getList = async()=>{
        const response = await fetch(`//localhost:8080/articles/list?order=date`)
        const data = await response.json()
        if(data){
          const articles_list = data.result
          this.setState({articles_list})
        }  
    }
    getList();
  }

  
  renderHomePage = () =>{
    return <Home list={this.state.articles_list}/>
  }
  renderWork = () =>{
    return <Work  list={this.state.articles_list}/>
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
        <Route path="/article/:id" render={this.renderArticlePage} />
        <Route render={()=><div>not found!</div>}/>
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
