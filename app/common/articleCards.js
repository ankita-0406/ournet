import React from "react";
import "../../style/component/articleCard.css"
import moment from "moment";
import { Link } from 'react-router-dom';

const ArticleCard = (props) => {
    return (
        <div className="first">
            {props.articles.map((article) => (
                <div className="articleCombine" key={article.id}>
                    <Link to={`/article/${article.slug}`}>
                        <div className="card">
                            <div className="imgWrapperCentre">
                                <img src={article.image ? article.image : '../../img/design.png'} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body second">
                                <h5 className="card-title">{article.title}</h5> <p className="card-p"></p>
                                <p className="articleIntro">{article.introduction}</p>
                                
                                <p className="card-text"> {article.author && article.author.firstName} {article.author && article.author.lastName}</p>
                                <p className="card-date">{moment(article.date).format("MMM D, YYYY")}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
            }
        </div>
    )
}
export default ArticleCard;