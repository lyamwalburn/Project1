import { useEffect } from "react";
import { useState } from "react";
import UserTable from "../User/UserTable";
import { ROUTES, URLPATHS, USER_TYPE } from "../utils";


const Sellers = () => {

    const [sellers,setSellers] = useState([])

    useEffect(()=>{
        fetchSellers()
        console.log(sellers)
    },[])

    const fetchSellers = ()=>{
        const token = sessionStorage.getItem("jwt")
        try{
        fetch(URLPATHS.SELLERS, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`}
          })
        .then(res=>res.json().then(setSellers))
        } catch (error){
            //handle errors
        }
    }

    const deleteSeller = (id)=>{
        const token = sessionStorage.getItem("jwt")
        try{
        fetch(`${URLPATHS.SELLERS}/${id}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`}
          })
        .then(fetchSellers)
        } catch (error){
            //handle errors
        }
    }

    return ( 
        <>
        <UserTable users={sellers} removeUser={deleteSeller} 
            propertiesLink={`${ROUTES.PROPERTIES}/`} editLink={`${ROUTES.SELLERS}/`} type={USER_TYPE.SELLER}/>
        </>
    );
}
 
export default Sellers;