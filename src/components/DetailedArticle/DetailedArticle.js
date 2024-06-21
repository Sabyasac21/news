import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import text from '../../../src/lorem'
import './DetailedArticle.css'

const DetailedArticle = () => {
    const articleTitle = useSelector((state)=>state.category.articleTitle)
    const localStorageArticle = JSON.parse(localStorage.getItem('articles'));
    const requiredArticle = localStorageArticle.find(article => {
        return article.title===articleTitle
    });
    console.log(requiredArticle);
    // const reqArticle = article.find
  return (
    <div className="detailed-wrapper">
        <div className="content">
      <div className="title">
        <p>{requiredArticle.title}</p>
      </div>
      <div className="article-image">
        <img src={requiredArticle.image_url} />
      </div>
      <div className="article-description">
        <p>
            
          {text}
        </p>
      </div>
      </div>
      <Link to='/'><button className="article-btn">Back</button></Link>
    </div>
  );
};

export default DetailedArticle;
