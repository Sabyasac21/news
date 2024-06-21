const express = require("express");
const cors = require("cors");
const app = express()

const port = 3002




const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("863ff2729fdf4b37bc08dc0d6f94a342");
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them


app.use(cors())


  app.get('/news:category', (req, res)=>{
    try {
        const {category} = req.params
        newsapi.v2
        .everything({
          q: category,
          language: "en",
        })
        .then((response) => {
          res.send(response);
         
        }); 
    } catch (error) {
        console.log(error);
    }
  })



app.listen(port, ()=>{
    console.log('server Started');
})