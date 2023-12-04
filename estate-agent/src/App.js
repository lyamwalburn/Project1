import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Sellers from './components/Sellers';
import UpsertSeller from './components/UpsertSeller';
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import Buyers from './components/Buyers';
import UpsertBuyer from './components/UpsertBuyer'
import UpsertProperty from './components/UpsertProperty';
import QuickLinks from './components/QuickLinks';
import ManageProperty from './components/ManageProperty';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
          <header>
              <h1>Estate Agency</h1>
          </header>
        <Routes>
          <Route path='/' element={<QuickLinks/>}></Route>
          <Route path='/sellers' element={<Sellers/>}></Route>
          <Route path='/sellers/:sellerId' element={<UpsertSeller />}></Route>
          <Route path='/properties' element={<Properties />}></Route>
          <Route path='/properties/upsert/:propertyId' element={<UpsertProperty />}></Route>
          <Route path='/properties/manage/:propertyId' element={<ManageProperty />}></Route>
          <Route path='/properties/:sellerId' element={<Properties />}></Route>
          <Route path='/properties/buyer/:buyerId' element={<Properties />}></Route>
          <Route path='/buyers' element={<Buyers />}></Route>
          <Route path='/buyers/:buyerId' element={<UpsertBuyer />}></Route>
        </Routes>
        </BrowserRouter>

      <footer>
        <p>footer goes here</p>
      </footer>
    </div>
  );
}

export default App;
