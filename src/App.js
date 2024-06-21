import "./App.css";
import DetailedArticle from "./components/DetailedArticle/DetailedArticle";
import Home from "./components/Home/Home";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailedArticle" element={<DetailedArticle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
