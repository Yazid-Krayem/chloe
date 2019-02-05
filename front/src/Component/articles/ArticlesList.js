import React from "react";
import { Transition } from "react-spring"; // you can remove this from App.js
// import { Link } from "react-router-dom";

const ArticleList = ({ articles_list }) => (
  <Transition
    items={articles_list}
    key={article => article.id}
    from={{ transform: "translate3d(-100px,0,0)" }}
    enter={{ transform: "translate3d(0,0px,0)" }}
    leave={{ transform: "translate3d(-100px,0,0)" }}
  >
    { article => style => (
      <div style={style}>
        {/* <Link to={"/articles/"+article.id}>{article.title}</Link> */}
      </div>
    )}
  </Transition>
);

export default ArticleList
