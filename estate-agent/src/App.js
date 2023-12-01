import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Sellers from './components/Sellers';
import NewSeller from './components/NewSeller';
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import Buyers from './components/Buyers';
import NewBuyer from './components/NewBuyer'
import PropertyCard from './components/PropertyCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <header>
              <h1>Estate Agency</h1>
          </header>

        <PropertyCard />
        <Routes>
          <Route path='/'></Route>
          <Route path='/sellers' element={<Sellers/>}></Route>
          <Route path='/sellers/:sellerId' element={<NewSeller />}></Route>
          <Route path='/properties' element={<Properties />}></Route>
          <Route path='/properties/:sellerId' element={<Properties />}></Route>
          <Route path='/properties/buyer/:buyerId' element={<Properties />}></Route>
          <Route path='/buyers' element={<Buyers />}></Route>
          <Route path='/buyers/new' element={<NewBuyer />}></Route>
        </Routes>
        </BrowserRouter>

      <footer>
        <p>footer goes here</p>
      </footer>
    </div>
  );
}

export default App;
