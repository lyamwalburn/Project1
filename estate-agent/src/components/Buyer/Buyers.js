import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTable from "../User/UserTable";
import { ROUTES, URLPATHS, USER_TYPE } from "../utils";


const Buyers = () => {
    
    const [buyers,setBuyers] = useState([])
    const [bookings,setBookings] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        fetchBuyers()
        fetchBookings()
    },[])

    const fetchBuyers = ()=>{
        console.log('fetching buyers')
        const token = sessionStorage.getItem("jwt")
       
        fetch(URLPATHS.BUYERS, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.json().then(setBuyers)
            }
        })
        .catch(catchError)     
    }

    const catchError = (res)=>{
        if(res.status == 401){
            navigate('/signin')
        }
    }

    const fetchBookings = ()=>{
        const token = sessionStorage.getItem("jwt")
        fetch(URLPATHS.BOOKING, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.json().then(setBookings)
            }
        })
        .catch(catchError)  
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
        //await removeBookings(id) TODO - this might break somthing uncomment if bookings dont delete on buyer delete
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.BUYERS}/${id}`, {
            mode: 'cors',
            method: 'Delete',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.then(fetchBuyers)
            }
        })
        .catch(catchError) 
    }

    return ( 
        <>
        <UserTable users={buyers} removeUser={deleteBuyer}
         propertiesLink='/properties/buyer/' editLink={`${ROUTES.BUYERS}/`} type={USER_TYPE.BUYER}/>
         </>
    );
}
 
export default Buyers;