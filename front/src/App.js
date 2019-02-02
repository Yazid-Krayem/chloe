import React, { Component } from "react";

import "./App.css";
import Home from "./Component/Home";

class App extends Component {
  state = {
    article_list: [],
    error_message: "",
    title: "",
    text: "",
    img_path: "",
    date: "",
    link: ""
  };

  /////
  //Read article
  getArticle = async id => {
    const previous_article = this.state.article_list.find(
      article => article.id === id
    );
    if (previous_article) {
      return;
    }
    try {
      const respone = await fetch(`//localhost:8080/articles/get/${id}`);
      const data = respone.json();
      if (data.success) {
        const article = data.result;
        const article_list = [...this.state.article_list, article];
        this.setState({ article_list });
      } else {
        this.setState({ error_message: data.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };
  /////
  // delete article

  deleteArticle = async id => {
    try {
      const respone = await fetch(`//localhost:8080/article/delete/${id}`);
      const data = respone.json();
      if (data.success) {
        const article_list = this.state.article_list.filter(
          article => article.id !== id
        );
        this.setState({ article_list });
      } else {
        this.setState({ error_message: data.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };
  //////
  // update article

  updateArticle = async (id, props) => {
    try {
      if (
        !props ||
        (!props.title ||
          !props.text ||
          !props.img_path ||
          !props.link ||
          !props.date)
      ) {
        throw new Error(
          `you need a least title or text or image or date to update the article`
        );
      }
      const respone = await fetch(
        `//localhost:8080/articles/update/${id}? title=${props.title}&text=${
          props.text
        }&img_path=${props.img_path}&date=${props.date}&link=${props.link}`
      );
      const data = respone.json();
      if (data.success) {
        const article_list = this.state.article_list.map(article => {
          if (article.id === id) {
            const new_article = {
              id: article.id,
              title:
                props.title ||
                article.text ||
                article.img_path ||
                article.data ||
                article.link,
              text:
                props.text ||
                article.title ||
                article.img_path ||
                article.data ||
                article.link,
              img_path:
                props.img_path ||
                article.title ||
                article.text ||
                article.data ||
                article.link,
              date:
                props.date ||
                article.title ||
                article.text ||
                article.img_path ||
                article.link,
              link:
                props.link ||
                article.title ||
                article.text ||
                article.img_path ||
                article.date
            };
            return new_article;
          } else {
            return article;
          }
        });
        this.setState({ article_list });
      } else {
        this.setState({ error_message: data.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };
  ////////
  // create article
  createArticle = async props => {
    try {
      if (!props(!props.title && !props.text && !props.date)) {
        throw new Error(` you need text, date  and title to create an article`);
      }
      const { title, text, date, img_path, link } = props;
      const respone = await fetch(
        `//lcoalhost/articles/new/?title=${title}&text=${text}&date=${date}&img_path=${img_path}&link=${link}`
      );
      const data = await respone.json();
      if (data.success) {
        const id = data.result;
        const article = { title, text, date, id, img_path, link };
        const article_list = [...this.state.article_list, article];
        this.setState({ article_list });
      } else {
        this.setState({ error_message: date.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };
  ////
  // All articles
  getList = async order => {
    try {
      const respone = await fetch(
        `//localhost:8080/articles/list?order=${order}`
      );
      const data = await respone.json();
      if (data.success) {
        const article_list = data.result;
        this.setState({ article_list });
      } else {
        const error_message = data.message;
        this.setState({ error_message: data.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };

  async componentDidMount() {
    this.getList();
  }

  render() {
    const { article_list, error_message } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {error_message ? <p>ERROR!!!!</p> : false}
          <Home article={this.state.article_list} />
        </header>
      </div>
    );
  }
}

export default App;
