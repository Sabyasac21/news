import React, { useEffect, useState } from "react";
import "./Home.css";
import FilterSections from "../FilterSections/FilterSections";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

// pub_4697733ab14ad2eb8112d4c513b841aed555b
// pub_46979f9018583c44b9a3d7368b78a6cbb3b1a
// pub_469902c83babb4d28ed4ee7cbc9d203974296

import {
  setArticleTitle,
  setCategory,
  setPage,
  setShowBackdrop,
} from "../../Redux/categorySlice";
import { Link } from "react-router-dom";

const Home = () => {
  const [news, setNews] = useState([]);
  const page = useSelector((state) => state.category.page);
  const [pageUrl, setNextPageUrl] = useState("");
  const category = useSelector((state) => state.category.category);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const apiKey = "pub_469902c83babb4d28ed4ee7cbc9d203974296";

  const openBackdrop = useSelector((state) => state.category.showBackDrop);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };
  const handleBackdropClose = () => {
    dispatch(setShowBackdrop(false));
  };
  const handleMobileCategory = (e) => {
    dispatch(setCategory(e.target.textContent));
    dispatch(setPage(1));
  };
  
  const handleArticleClick = (title) => {
    dispatch(setArticleTitle(title))
    window.scrollTo(0, 0)
  };

  useEffect(() => {
    setIsLoading(true);
    const pageParam = pageUrl ? `&page=${pageUrl}` : "";
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=${category}&${pageParam}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.results);

        // to amtch the article clicked and render on the detailed page
        localStorage.removeItem('articles')
        localStorage.setItem('articles', JSON.stringify(data.results))

        setNextPageUrl(data.nextPage);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, page]);

  return (
    <>
      <div className="filter-category">
        <div className="main-filter">
          <FilterSections />
        </div>
      </div>

      <div className="news-container">
        <div className="all-news">
          <div className="title_br">
          <h1>{category}</h1>
          <hr/>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            news.map((n, i) => {
              return (
                <>
                  {n.image_url && (
                    <Link
                    to='/detailedArticle'
                      className="news-card"
                      style={{textDecoration:'none', color:'inherit'}}
                      key={i}
                      onClick={() => handleArticleClick(n.title)}
                    >
                      <div className="title">{n.title}</div>
                      <div className="image-news">
                        {n.image_url && <img src={n.image_url} alt="/" />}
                      </div>
                      <div className="news-description">
                        {n.description
                          ? n.description.slice(0, 200)
                          : "(CNN) — TikTok ramped up its attacks on the Biden administration Thursday over a law that could ban the popular app from the United States, arguing in a court filing that US TikTok users could be forc"}
                      </div>
                      <hr />
                    </Link>
                  )}
                </>
              );
            })
          )}
          <div className="pagination">

            <div className="next-page" onClick={handleNextPage}>
              Next
            </div>
          </div>
        </div>
      </div>
      <div className="sticky-backdrop">

        {openBackdrop && (
          <div className="backdrop" onClick={handleBackdropClose}>
            <div className="filter-wrapper" onClick={handleMobileCategory}>
              <ul className="filter-list">
                <h1>Filter By</h1>
                <li className="filter">Technology</li>
                <li className="filter">Education</li>
                <li className="filter">Entertainment</li>
                <li className="filter">Tourism</li>
                <li className="filter">Science </li>
                <li className="filter">Sports</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
