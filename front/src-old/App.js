import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, withRouter, Switch, Link } from "react-router-dom";
import './App.css'
// import Home from './Component/Home';
import Article from './Component/Article';
import { pause } from './Component/Utils/Utils';
import ArticleList from './Component/articles/ArticlesList'

class App extends Component {
  state = {
    article_list: [],
    error_message: '',
    title: '',
    text: '',
    img_path: '',
    date: '',
    link: '',
    isLoading: false
  };

  /////
  // Read article
  getArticle = async id => {
    const previous_article =
        this.state.article_list.find(article => article.id === id);
    if (previous_article) {
      return;
    }
    try {
      const respone = await fetch(`http://localhost:8080/articles/get/${id}`);
      const data = respone.json();
      if (data.success) {
        const article = data.result;
        const article_list = [...this.state.article_list, article];
        this.setState({article_list});
        toast(`articles loaded`)
      } else {
        this.setState({error_message: data.message});
      }
    } catch (err) {
      this.setState({error_message: err.message});
      toast.error(err.message)
    }
  };
  /////
  // delete article

  deleteArticle = async id => {
    try {
      const respone = await fetch(`//localhost:8080/articles/delete/${id}`);
      const data = await respone.json();
      if (data.success) {
        const article_list =
            this.state.article_list.filter(article => article.id !== id);
        this.setState({article_list});
        toast(`article deleted`)
      } else {
        this.setState({error_message: data.message});
        toast.error(data.message)
      }
    } catch (err) {
      this.setState({error_message: err.message});
      toast.error(err.message)
    }
  };
  //////
  // update article

  updateArticle = async (id, props) => {
    try {
      if (!props || !(props.title || props.text || props.date || props.link || props.img_path)) {
        throw new Error(
          `edit something`
        );
      }
      let url="";
      const{title,text,date,link,img_path}= props;
      if(title && text)
      {
        url=
          `http://localhost:8080/articles/update/${id}?title=${title}&text=${text}`;
    
      }
      if(title && date){
        url =
        `http://localhost:8080/articles/update/${id}?title=${title}&date=${date}`;
      }
      if(title && link){
        url =
        `http://localhost:8080/articles/update/${id}?title=${title}&link=${link}`;
      }
      if(title && img_path){
        url =
        `http://localhost:8080/articles/update/${id}?title=${title}&img_path=${img_path}`;
      }
      if(text && date){
        url =
        `http://localhost:8080/articles/update/${id}?text=${text}&date=${date}`;
      }
      if(text && link){
        url =
        `http://localhost:8080/articles/update/${id}?text=${text}&link=${link}`;
      }
      if(text && img_path){
        url =
        `http://localhost:8080/articles/update/${id}?text=${text}&img_path=${img_path}`;
      }
      if(link && date){
        url =
        `http://localhost:8080/articles/update/${id}?link=${link}&date=${date}`;
      }
      if(img_path && date){
        url =
        `http://localhost:8080/articles/update/${id}?img_path=${img_path}&date=${date}`;
      }
      if(link && img_path){
        url =
        `http://localhost:8080/articles/update/${id}?img_path=${img_path}&link=${link}`;
      }
      if(title)
      {
        url=
          `http://localhost:8080/articles/update/${id}?title=${title}`;
        
      }
      if(text)
      {
        url=
          `http://localhost:8080/articles/update/${id}?text=${text}`;
      }
      if(link)
      {
        url=
          `http://localhost:8080/articles/update/${id}?link=${link}`;
      }
      if(date)
      {
        url=
          `http://localhost:8080/articles/update/${id}?date=${date}`;       
      }
      if(img_path)
      {
        url=
          `http://localhost:8080/articles/update/${id}?img_path=${img_path}`; 
      }

      const response = await fetch(
        url
      );
      const answer = await response.json();
      if (answer.success) {
        // we update the user, to reproduce the database changes:
        const article_list = this.state.article_list.map(article => {
          if (article.id === id) {
            const new_article = {
              id: article.id,
              title: props.title || article.text || article.img_path || article.data || article.link,
              text: props.text || article.title || article.img_path || article.data || article.link,
              img_path: props.img_path || article.title || article.text || article.data || article.link,
              date: props.date || article.title || article.text || article.img_path || article.link,
              link: props.link || article.title || article.text || article.img_path || article.date
            };
            return new_article;
          }
          // otherwise, don't change the article at all
          else {
            return article;
          }
        });
        this.setState({ article_list });
      } else {
        this.setState({ error_message: answer.message });
        toast.error(answer.message)
      }
    } catch (err) {
      this.setState({ error_message: err.message });
      toast.error(err.message)

    }
  };

  ////////
  // create article
  createArticle = async props => {
    try {
      if (!props(!props.title && !props.text && !props.date)) {
        throw new Error(` you need text, date  and title to create an article`);
      }
      const {title, text, date ,link,img_path} = props;
      const response = await fetch(
        `//localhost:8080/articles/new/?title=${title}&text=${text}&img_path=${img_path}&date=${date}&link=${link}
      `);
      console.log(response)
      const answer = await response.json();
      if (answer.success) {
        // we reproduce the user that was created in the database, locally
        const id = answer.result;
        const article = { title, text,date, id };
        const article_list = [...this.state.article_list, article];
        this.setState({ article_list });
        toast(`article "${title}" added`);
      } else {
        this.setState({ error_message: answer.message });
        toast.error(answer.message)
      }
    } catch (err) {
      this.setState({ error_message: err.message });
      toast.error(err.message)
    }
  };

  ////
  // All articles
  getList = async order => {
    this.setState({isLoading:true})
    try {
      const respone =
          await fetch(`http://localhost:8080/articles/list?order=${order}`);
          await pause();    
      const data = await respone.json();
      if (data.success) {
        const article_list = data.result;
        this.setState({article_list,isLoading:false});
        toast("articles loaded")
      } else {
        this.setState({error_message: data.message,isLoading:false});
        toast.error(data.message)
      }
    } catch (err) {
      this.setState({error_message: err.message,isLoading:false});
      toast.error(err.message)
    }
  };

  async componentDidMount() {
    this.getList();
  }
  onSubmit = evt => {
    // stop the form from submitting:
    evt.preventDefault();

    const {title, link, text, img_path, date} = this.state;
    console.log(this.state)
    this.createArticle({title, link, text, img_path, date});

    this.setState({title: '', text: '', link: '', date: '', img_path: ''});
  };
  renderHomePage = () => {
    const { articles_list } = this.state;
    return( 
    
    <ArticleList 
      articles_list={articles_list} 
      />);
  }
  renderArticlePage = ({ match }) => {
    const id = match.params.id;
    // find the article:
    // eslint-disable-next-line eqeqeq
    const article = this.state.article_list.find(article => article.id == id);
    // we use double equality because our ids are numbers, and the id provided by the router is a string
    if (!article) {
      return <div>{id} not found</div>;
    }
    return (
      <Article
      key={article.id}
      id={article.id}
      title={article.title}
      text={article.text}
      date={article.date}
      link={article.link}
      img_path={article.img_path}
      updateArticle={this.updateArticle}
      deleteArticle={this.deleteArticle}
      />
    );
  };
  renderProfilePage = () => {
    return <div>profile page</div>;
  };
renderCreateForm = () =>{
  return(
    <form className="thrid" onSubmit={this.onSubmit}>
    <input
       type='text'
       onChange={evt => this.setState({title:evt.target.value})}
       placeholder='title'
       value={this.state.title}
       />
       <textarea
         onChange={evt=> this.setState({text:evt.target.value})}
         placeholder='text'
         value={this.state.text}
       ></textarea>
       <input
       type='text'
       onChange={evt => this.setState({date:evt.target.value})}
       placeholder='date'
       value={this.state.date}
       />
       <input
       type='link'
       onChange={evt => this.setState({link:evt.target.value})}
       placeholder='link'
       value={this.state.link}
       />
       <div>
         <input type="submit" value="ok" />
         <input type="reset" value="cancel" className="button" />
       </div>

    </form>
  )
}
renderContent() {
  if (this.state.isLoading) {
    return <p>loading...</p>;
  }
  return (
    <Switch>
      <Route path="/" exact render={this.renderHomePage} />
      <Route path="/articles/:id" render={this.renderContactPage} />
      <Route path="/profile" render={this.renderProfilePage} />
      <Route path="/create" render={this.renderCreateForm} />
      <Route render={() => <div>not found!</div>} />
    </Switch>
  );
}

  render() {
    return (
      <div className='App'>
      

      {/* <Home 
      article={this.state.article_list}
       /> */}
       <div>
          <Link to="/">Home</Link> |<Link to="/profile">profile</Link> |
          <Link to="/create">create</Link>
        </div>
        {this.renderContent()}
        <ToastContainer />

      </div>);
  }
  }

  export default withRouter(App);
