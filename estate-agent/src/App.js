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
import SignIn from './components/General/SignIn';
import { useState } from 'react';
function App() {

  return (
    <div className="App bg-dark">
      <div className='bg-light pb-0 mb-0'>
      <BrowserRouter>
        <NavBar/>
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
          <Route path='/properties/withdrawn' element={<Properties withdrawn={true}/>}></Route>
          <Route path='/buyers' element={<Buyers />}></Route>
          <Route path='/buyers/:buyerId' element={<UpsertBuyer />}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
      </div>
      <Footer />
      
    </div>
  );
}

export default App;
