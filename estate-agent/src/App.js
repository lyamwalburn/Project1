import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Sellers from './components/Seller/Sellers';
import UpsertSeller from './components/Seller/UpsertSeller';
import Properties from './components/Property/Properties';
import Buyers from './components/Buyer/Buyers';
import UpsertBuyer from './components/Buyer/UpsertBuyer'
import UpsertProperty from './components/Property/UpsertProperty';
import ManageProperty from './components/Property/ManageProperty';
import PropertySearch from './components/Property/PropertySearch';
import NavBar from './components/General/NavBar';
import NotFound from './components/General/NotFound';
import Footer from './components/General/Footer';
import QuickLinks from './components/General/QuickLinks';
function App() {

  return (
    <div className="App bg-white">
      
      <BrowserRouter>
        <NavBar/>
          <header>
              <h1>Estate Agency</h1>
          </header>
          <QuickLinks/>
        <Routes>
          <Route path='/' element={<PropertySearch/>}></Route>
          <Route path='/sellers' element={<Sellers/>}></Route>
          <Route path='/sellers/:sellerId' element={<UpsertSeller />}></Route>
          <Route path='/properties' element={<Properties />}></Route>
          <Route path='/properties/upsert/:propertyId' element={<UpsertProperty />}></Route>
          <Route path='/properties/manage/:propertyId' element={<ManageProperty />}></Route>
          <Route path='/properties/:sellerId' element={<Properties />}></Route>
          <Route path='/properties/buyer/:buyerId' element={<Properties />}></Route>
          <Route path='/buyers' element={<Buyers />}></Route>
          <Route path='/buyers/:buyerId' element={<UpsertBuyer />}></Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
