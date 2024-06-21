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
  // const [news, setNews] = useState([
  //   {
  //     source: { id: "wired", name: "Wired" },
  //     author: "Justin Pot",
  //     title: "How to Spot a Business Email Compromise Scam",
  //     description:
  //       "In this common email scam, a criminal pretending to be your boss or coworker emails you asking for a favor involving money. Here's what do to when a bad actor lands in your inbox.",
  //     url: "https://www.wired.com/story/how-to-spot-business-email-compromise-scam/",
  //     urlToImage:
  //       "https://media.wired.com/photos/666cbb59eb9db3a3e95c6533/191:100/w_1280,c_limit/How-to-Spot-a-Business-Email-Compromise-Scam-Security-GettyImages-1287456786.jpg",
  //     publishedAt: "2024-06-16T12:00:00Z",
  //     content:
  //       "So this is the first step: take control of your emotions. Yes, it can be difficult if you work in a demanding field. But it's your best first defense, and your employer will thank you for it (or, at … [+3030 chars]",
  //   },
  //   {
  //     source: { id: null, name: "Yahoo Entertainment" },
  //     author: "Will Shanklin",
  //     title:
  //       "Jabra says it’s exiting the consumer headphones business a day after launching new earbuds",
  //     description:
  //       "Jabra is exiting the consumer earbuds business. The move is shocking as it comes only a day after the company unveiled new models of its Elite earbuds. Peter Karlstromer, CEO of parent company GN, said the decision is “part of our commitment to focus on attra…",
  //     url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_8c635f21-51ed-4bf8-840c-90584797f491",
  //     urlToImage: null,
  //     publishedAt: "2024-06-12T16:45:18Z",
  //     content:
  //       "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]",
  //   },
  //   {
  //     source: { id: "wired", name: "Wired" },
  //     author: "Louise Matsakis",
  //     title: "Most US TikTok Creators Don’t Think a Ban Will Happen",
  //     description:
  //       "The Chinese-owned app is in serious trouble in Washington, but a survey of US creators suggests TikTok’s influencer economy is carrying on with business as usual.",
  //     url: "https://www.wired.com/story/most-us-tiktok-creators-dont-think-a-ban-will-happen/",
  //     urlToImage:
  //       "https://media.wired.com/photos/664e62bf9beaedbe2925ba6a/191:100/w_1280,c_limit/tiktok-survey-02.jpg",
  //     publishedAt: "2024-05-23T19:22:11Z",
  //     content:
  //       "A majority of US TikTok creators dont believe the platform will be banned within a year, and most havent seen brands they work for shift their marketing budgets away from the app, according to a new … [+5165 chars]",
  //   },
  //   {
  //     source: { id: "wired", name: "Wired" },
  //     author: "Kate O'Flaherty",
  //     title: "AI Is Your Coworker Now. Can You Trust It?",
  //     description:
  //       "Generative AI tools such as OpenAI’s ChatGPT and Microsoft’s Copilot are becoming part of everyday business life. But they come with privacy and security considerations you should know about.",
  //     url: "https://www.wired.com/story/ai-workplace-privacy-security/",
  //     urlToImage:
  //       "https://media.wired.com/photos/665e41499c3c01816e236561/191:100/w_1280,c_limit/Microsoft-Copilot-AI-in-the-Workplace-2WD47TD.jpg",
  //     publishedAt: "2024-06-04T11:00:00Z",
  //     content:
  //       "Yet it doesnt seem very long before this technology could be used for monitoring employees, says Elcock.\r\n" +
  //       "Self-Censorship\r\n" +
  //       "Generative AI does pose several potential risks, but there are steps busines… [+3192 chars]",
  //   },
  //   {
  //     source: { id: null, name: "BBC News" },
  //     author: null,
  //     title: "More than 100 business chiefs sign letter backing Labour",
  //     description:
  //       "More than 120 bosses endorse Labour's economic plans ahead of the election saying it is “time for a change”.",
  //     url: "https://www.bbc.com/news/articles/ckvv8qwl4y4o",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/fbe7/live/1f6e7490-1c3d-11ef-ac61-e7bb0ab72f9c.jpg",
  //     publishedAt: "2024-05-27T20:22:22Z",
  //     content:
  //       "Dozens of business leaders have signed a letter endorsing the Labour Partys economic plans ahead of the 4 July general election saying it is time for a change.\r\n" +
  //       "In a letter published in Tuesday's Tim… [+2138 chars]",
  //   },
  //   {
  //     source: { id: null, name: "BBC News" },
  //     author: null,
  //     title: "Sarwar's family business will have to pay living wage",
  //     description:
  //       "The Scottish Labour leader says he has no direct involvement in the family firm but conceded not all staff receive the real living wage.",
  //     url: "https://www.bbc.com/news/articles/cyxx8d0l948o",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/branded_news/d5a7/live/b3d50a90-1b4d-11ef-b3fe-eb0d90d1bd39.jpg",
  //     publishedAt: "2024-05-26T11:35:00Z",
  //     content:
  //       "Anas Sarwar conceded not all staff at the firm received the national living wage\r\n" +
  //       'Anas Sarwar has insisted Labour plans for all workers to be paid a "genuine living wage" will apply to all businesses… [+3023 chars]',
  //   },
  //   {
  //     source: { id: null, name: "Gizmodo.com" },
  //     author: "Maxwell Zeff",
  //     title: "May 'AI' Take Your Order? McDonald's Says Not Yet",
  //     description:
  //       "McDonald’s is ending a two-year-old partnership with IBM to test AI’s ability to replace drive-thru workers at more than 100 restaurants, according to Restaurant Business. The world’s largest fast-food company is reportedly pulling the technology later in Jul…",
  //     url: "https://gizmodo.com/may-ai-take-your-order-mcdonalds-says-not-yet-1851543870",
  //     urlToImage:
  //       "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/40466232768b857ec59ed71407c40ee5.jpg",
  //     publishedAt: "2024-06-17T14:35:00Z",
  //     content:
  //       "McDonalds is ending a two-year-old partnership with IBM to test AIs ability to replace drive-thru workers at more than 100 restaurants, according to Restaurant Business. The worlds largest fast-food … [+2219 chars]",
  //   },
  //   {
  //     source: { id: null, name: "Gizmodo.com" },
  //     author: "Gordon Jackson and James Whitbrook",
  //     title: "The Next Godzilla/Kong Movie Has Found a Surprising New Director",
  //     description:
  //       "House of the Dragon’s Matt Smith and Rings of Power’s Morfydd Clark get into some creepy tree business for Starve Acre. Doctor Who shows off some feathery new aliens from its latest episode. Plus, when to expect the return of Daryl and Carol in their Walking …",
  //     url: "https://gizmodo.com/godzilla-kong-3-sequel-new-director-grant-sputore-1851525407",
  //     urlToImage:
  //       "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/12961177edabc8c789ff51c0bdff6461.png",
  //     publishedAt: "2024-06-07T13:00:00Z",
  //     content:
  //       "House of the Dragons Matt Smith and Rings of Powers Morfydd Clark get into some creepy tree business for Starve Acre. Doctor Who shows off some feathery new aliens from its latest episode. Plus, when… [+1593 chars]",
  //   },
  //   {
  //     source: { id: "business-insider", name: "Business Insider" },
  //     author: "Lara O'Reilly,Lauren Johnson,Michael Kaminer",
  //     title: "Business Insider's most innovative CMOs of 2024",
  //     description: `Business Insider's annual list of the "Most Innovative CMOs" spotlights marketers who are rising to challenges while also using new technology, such as generative AI.`,
  //     url: "https://www.businessinsider.com/most-innovative-chief-marketing-officers-2024-6",
  //     urlToImage:
  //       "https://i.insider.com/66704e33ed9a404d829e47cf?width=1200&format=jpeg",
  //     publishedAt: "2024-06-18T09:00:01Z",
  //     content:
  //       "From left: Mayur Gupta, Kim Chappell, Kory Marchisotto, Asad Ayaz and Jonnie CahillBI\r\n" +
  //       "<ul>\n" +
  //       "<li>\n" +
  //       "CMOs are under increased pressure to grow their brands while reaching new audiences.\r\n" +
  //       "\n" +
  //       "</li>\n" +
  //       "<li>They'… [+52267 chars]",
  //   },
  //   {
  //     source: { id: null, name: "Harvard Business Review" },
  //     author: "Jerome Barthelemy",
  //     title: "All Business Strategies Fall into 4 Categories",
  //     description:
  //       "The problem with strategy frameworks is that although they can help you determine whether an opportunity is attractive or whether a given strategy is likely to work, they generally don’t help you in the task of identifying the opportunity or crafting the stra…",
  //     url: "https://hbr.org/2024/05/all-business-strategies-fall-into-4-categories",
  //     urlToImage:
  //       "https://hbr.org/resources/images/article_assets/2024/05/May24_23_Pierre-Buttin.jpg",
  //     publishedAt: "2024-05-23T13:00:00Z",
  //     content:
  //       "The problem with strategy frameworks is that although they can help you determine whether an opportunity is attractive or whether a given strategy is likely to work, they generally don’t help you in … [+580 chars]",
  //   },
  // ]);

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