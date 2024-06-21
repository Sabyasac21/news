
import React, { useEffect, useState } from "react";
import "./Home.css";
import FilterSections from "../FilterSections/FilterSections";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";


// pub_4697733ab14ad2eb8112d4c513b841aed555b
// pub_46979f9018583c44b9a3d7368b78a6cbb3b1a

import {
  setCategory,
  setPage,
  setShowBackdrop,
} from "../../Redux/categorySlice";

const Home = () => {
  const [news, setNews] = useState([]);
  const page = useSelector((state) => state.category.page);
  const category = useSelector((state) => state.category.category);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const apiKey = "pub_46979f9018583c44b9a3d7368b78a6cbb3b1a";
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=${category}`;

  const openBackdrop = useSelector((state) => state.category.showBackDrop);
  let nextPage;

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
  const handlePrevPage = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleArticleClick = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(url, {
      method: "GET",
      headers: {
        // "Access-Control-Allow-Origin": "*"
      },

      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.results);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, page, url]);

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
                  {(n.image_url&&n.description) && (
                    <div
                      className="news-card"
                      key={i}
                      onClick={() => handleArticleClick(n.link)}
                    >
                      <div className="title">{n.title}</div>
                      <div className="image-news">
                        {n.image_url && <img src={n.image_url} alt="/" />}
                      </div>
                      <div className="news-description">{n.description.slice(0, 200)}</div>
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
        {openBackdrop && (
          <div className="backdrop" onClick={handleBackdropClose}>
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
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
