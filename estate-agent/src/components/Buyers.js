import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";


const Buyers = () => {

    const [buyers,setBuyers] = useState([])
    const URL = 'http://localhost:8081/buyer'

    useEffect(()=>{
        fetchBuyers()
    },[])

    const fetchBuyers = ()=>{
        fetch(URL).then(res=>res.json().then(setBuyers))
    }

    const deleteBuyer = (id)=>{
        fetch(`${URL}/${id}`,{
            method:"delete"
        }).then(fetchBuyers)
    }

    return ( 
        <>
        <h2 className="mt-4">All Buyers</h2>
        <UserTable users={buyers} removeUser={deleteBuyer}
        createLink='/buyers/new'
         propertiesLink='/properties/buyer/' editLink='/buyers/'/>
         </>
    );
}
 
export default Buyers;