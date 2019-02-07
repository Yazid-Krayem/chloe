import React from 'react'

export default class GetArticles extends React.Component {
  state = {
    editMode: false
  };
  toggleEditMode = () => {
    const editMode = !this.state.editMode;
    this.setState({ editMode });
  };
  renderViewMode() {
    const {  title, link,img_path,text,date } = this.props;
    return (
      <div>
        <div>
           <h1 style={{textAlign:"center"}}>{title}</h1>
           <h2>{date}</h2>
           <div>{img_path}</div>  
           <article>{text} </article> 
           <p>{link}</p>  
        </div>
       

       <a href="/">back</a>
      </div>
    );
  }


  render() {
    const { editMode } = this.state;
    if (editMode) {
      return this.renderEditMode();
    } else {
      return this.renderViewMode();
    }
  }
}
