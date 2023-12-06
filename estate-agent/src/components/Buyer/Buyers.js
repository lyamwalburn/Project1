import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "../User/UserTable";
import { URLPATHS } from "../utils";


const Buyers = () => {

    const [buyers,setBuyers] = useState([])
    const [bookings,setBookings] = useState([])

    const URL = 'http://localhost:8081/buyer'

    useEffect(()=>{
        fetchBuyers()
        fetchBookings()
    },[])

    const fetchBuyers = ()=>{
        fetch(URL).then(res=>res.json().then(setBuyers))
    }

    const fetchBookings = ()=>{
        fetch(URLPATHS.BOOKING).then(res=>res.json().then(setBookings))
    }

    const removeBookings = async (id)=>{
        let toCancel = bookings.filter(p=> p.buyerId == id)
        toCancel.forEach(booking =>{
            fetch(`${URLPATHS.BOOKING}/${booking.id}`,{
                method:"delete"
            }).then()
        })
    }

    const deleteBuyer = async (id)=>{

        //check for any bookings this buyer has and delete them
        await removeBookings(id)

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