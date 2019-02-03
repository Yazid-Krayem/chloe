import React, { Component } from 'react';


class Article extends Component {
    state={
        editMode:false
    }
    toggleEditMode = () =>{
        const editMode = !this.state.editMode
        this.setState({editMode})
    }
    renderEditMode (){
        const {id,title,text,date,link,updateArticle,deleteArticle} =this.props
        return <div>Edit mode</div>
    }
    renderViewMode (){
        const {id,title,deleteArticle}=this.props
        return(
            <div>
                {id} {title}
                <button onClick={this.toggleEditMode} className="success">Edit</button>
                <button onClick={() => deleteArticle(id)} className="warning">
          x
        </button>

                </div>
        )
    }
    renderEditMode(){
     const {title,text,link,date}=this.props
     return(
        <form
        className="third"
        onSubmit={this.onSubmit}
        onReset={this.toggleEditMode}
      >
      <input 
      type='text'
      placeholder='title'
      name='article_title_input'
      defaultValue={title}
      />
      <textarea
      placeholder='text'
      name='article_text_input'
      defaultValue={text}
      >
      </textarea>
      <input 
      type='text'
      placeholder='date'
      name='article_date_input'
      defaultValue={date}
      />
      <input 
      type='text'
      placeholder='link'
      name='article_link_input'
      defaultValue={link}
      />
       <div>
          <input type="submit" value="ok" />
          <input type="reset" value="cancel" className="button" />
        </div>

    </form>
     )   
    }
    onSubmit = evt => {
        // stop the page from refreshing
        evt.preventDefault();
        // target the form
        const form = evt.target;
        // extract the two inputs from the form
        const article_title_input = form.article_title_input;
        const article_text_input = form.article_text_input;
        const article_date_input = form.article_date_input;
        const article_link_input= form.article_link_input
        // extract the values
        const title = article_title_input.value;
        const text = article_text_input.value;
        const date = article_date_input.value;
        const link = article_link_input.value;
        // get the id and the update function from the props
        const { id, updateArticle } = this.props;
        // run the update contact function
        updateArticle(id, { title, text,date,link });
        // toggle back view mode
        this.toggleEditMode();
      };
    
  render() {

    const {editMode}=this.state
    if(editMode){
        return this.renderEditMode()
    }else{
        return this.renderViewMode()
    }
}

}

export default Article;
