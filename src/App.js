
import './App.css';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';
import Nav from './components/Navbar/Nav';


function App() {
  return (
    <div className="App">
      <Nav/>
      <Home/>
      {/* <Loader/> */}
    </div>
  );
}

export default App;
