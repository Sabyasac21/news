import React, { useEffect, useState } from "react";
import "./Home.css";
import FilterSections from "../FilterSections/FilterSections";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPage, setShowBackdrop } from "../../Redux/categorySlice";

const Home = () => {
  const [news, setNews] = useState([]);
  const page = useSelector((state) => state.category.page);
  const category = useSelector((state) => state.category.category);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const apiKey = "bca8ff9cba22478ab3e3a87652dde644";
  const url = `https://newsapi.org/v2/everything?q=${category}&page=${page}&pageSize=10&apiKey=${apiKey}`;
  
  const openBackdrop = useSelector(state=>state.category.showBackDrop)
  

  function fetchNews() {
    setIsLoading(true);

    fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });
  }

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };
  const handleBackdropClose = ()=>{
    dispatch(setShowBackdrop(false))
  }
  const handleMobileCategory = (e) =>{
    dispatch(setCategory(e.target.textContent))
    dispatch(setPage(1))
  }
  const handlePrevPage = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleArticleClick = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchNews();
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
          <h1>{category}</h1>
          {isLoading ? (
            <Loader />
          ) : (
            news.map((n, i) => {
              return (
                <>
                  {n.urlToImage && (
                    <div
                      className="news-card"
                      key={i}
                      onClick={() => handleArticleClick(n.url)}
                    >
                      <div className="title">{n.title}</div>
                      <div className="image-news">
                        {n.urlToImage && <img src={n.urlToImage} alt="/" />}
                      </div>
                      <div className="news-description">{n.description}</div>
                      <hr />
                    </div>
                  )}
                </>
              );
            })
          )}
          <div className="pagination">
            <div className="prev-page" onClick={handlePrevPage}>
              Prev
            </div>

            <div className="page-num">{page}</div>

            <div className="next-page" onClick={handleNextPage}>
              Next
            </div>
          </div>
        </div>
      </div>
      <div className="sticky-backdrop">
      {openBackdrop && <div className="backdrop" onClick={handleBackdropClose}>
        <div className="filter-wrapper" onClick={handleMobileCategory}>
          <ul className="filter-list">
            <h1>Filter By:</h1>
            <li className="filter">Technology</li>
            <li className="filter">Science</li>
            <li className="filter">Business</li>
            <li className="filter">Market</li>
            <li className="filter">Breaking News</li>
            <li className="filter">Sports</li>
          </ul>
        </div>
      </div>}
      </div>
    </>
  );
};

export default Home;