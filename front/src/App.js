import React, { Component } from 'react';
import { withRouter, Switch, Route } from "react-router-dom";
import Biography from './Components/Biography';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Home from './Components/Home';
import GetArticles from './Components/GetArticles';

class App extends Component {
  state={
    articles_list:[]
  }
  getContact = async id => {
    // check if we already have the article
    const previous_article = this.state.articles_list.find(
      article => article.id === id
    );
    if (previous_article) {
      return; // do nothing, no need to reload a article we already have
    }
    try {
      const response = await fetch(`http://localhost:8080/articles/get/${id}`);
      const answer = await response.json();
      if (answer.success) {
        // add the user to the current list of articles
        const article = answer.result;
        const articles_list = [...this.state.articles_list, article];
        this.setState({ articles_list });
      } else {
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };

  renderGetArticle = ({ match }) => {
    const id = match.params.id;
    // find the contact:
    // eslint-disable-next-line eqeqeq
    const article = this.state.articles_list.find(article => article.id == id);
    // we use double equality because our ids are numbers, and the id provided by the router is a string
    if (!article) {
      return <div>{id} not found</div>;
    }
    return (
      <GetArticles
        id={article.id}
        title={article.title}
        text={article.text}
        date={article.date}
        img_path={article.img_path}
        link={article.link}
        updateContact={this.updateContact}
        deleteContact={this.deleteContact}
      />
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
    return <Home list={this.state.articles_list}
    renderGetArticle={this.renderGetArticle}/>
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
        <Route path="/article/:id" render={this.renderGetArticle} />
        <Route render={()=><div>not found!</div>}/>
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
