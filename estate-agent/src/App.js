import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sellers from './components/Sellers';
import NewSeller from './components/NewSeller';
import Properties from './components/Properties';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Estate Agency</h1>
        <p>this should be a header or a nav</p>
      </header>
      

      <BrowserRouter>
      <Routes>
        <Route path='/'></Route>
        <Route path='/sellers' element={<Sellers/>}></Route>
        <Route path='/sellers/:sellerId' element={<NewSeller />}></Route>
        <Route path='/properties' element={<Properties />}></Route>
        <Route path='/properties/:sellerId' element={<Properties />}></Route>
      </Routes>
      </BrowserRouter>

      <footer>
        <p>footer goes here</p>
      </footer>
    </div>
  );
}

export default App;
