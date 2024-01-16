import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "../User/UserTable";
import { ROUTES, URLPATHS, USER_TYPE } from "../utils";


const Buyers = () => {

    const [buyers,setBuyers] = useState([])
    const [bookings,setBookings] = useState([])

    useEffect(()=>{
        fetchBuyers()
        fetchBookings()
    },[])

    const fetchBuyers = ()=>{
        fetch(URLPATHS.BUYERS, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json'}
          })
        .then(res=>res.json().then(setBuyers))
    }

    const fetchBookings = ()=>{
        fetch(URLPATHS.BOOKING, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json'}
          })
        .then(res=>res.json().then(setBookings))
    }

    const removeBookings = async (id)=>{
        let toCancel = bookings.filter(p=> p.buyerId == id)
        toCancel.forEach(booking =>{

            fetch(`${URLPATHS.BOOKING}/${booking.id}`, {
                mode: 'cors',
                method: 'Delete',
                headers: {'Content-Type':'application/json'}
              })
            .then()
        })
    }

    const deleteBuyer = async (id)=>{

        //check for any bookings this buyer has and delete them
        await removeBookings(id)

        fetch(`${URL}/${id}`, {
            mode: 'cors',
            method: 'Delete',
            headers: {'Content-Type':'application/json'}
          })
        .then(fetchBuyers)
    }

    return ( 
        <>
        <UserTable users={buyers} removeUser={deleteBuyer}
         propertiesLink='/properties/buyer/' editLink={`${ROUTES.BUYERS}/`} type={USER_TYPE.BUYER}/>
         </>
    );
}
 
export default Buyers;