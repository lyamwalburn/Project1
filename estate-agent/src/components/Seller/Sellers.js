import { useEffect } from "react";
import { useState } from "react";
import UserTable from "../User/UserTable";
import { ROUTES, URLPATHS, USER_TYPE } from "../utils";
import { redirect, useNavigate } from "react-router-dom";


const Sellers = () => {

    const [sellers,setSellers] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        fetchSellers()
        console.log(sellers)
    },[])

    const fetchSellers = ()=>{
        const token = sessionStorage.getItem("jwt")
        fetch(URLPATHS.SELLERS, {
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
                res.json().then(setSellers)
            }
        })
        .catch(catchError)
       
    }

    const catchError = (res)=>{
        if(res.status == 401){
            navigate('/signin')
        }
    }

    const deleteSeller = (id)=>{
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.SELLERS}/${id}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
               // res.then(fetchSellers)
               navigate('/sellers')
            }
        })
        .catch(catchError)
    }

    return ( 
        <>
        <UserTable users={sellers} removeUser={deleteSeller} 
            propertiesLink={`${ROUTES.PROPERTIES}/`} editLink={`${ROUTES.SELLERS}/`} type={USER_TYPE.SELLER}/>
        </>
    );
}
 
export default Sellers;