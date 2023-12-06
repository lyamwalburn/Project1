import { useEffect } from "react";
import { useState } from "react";
import UserTable from "../User/UserTable";
import { ROUTES, URLPATHS } from "../utils";


const Sellers = () => {

    const [sellers,setSellers] = useState([])

    useEffect(()=>{
        fetchSellers()
    },[])

    const fetchSellers = ()=>{
        fetch(URLPATHS.SELLERS).then(res=>res.json().then(setSellers))
    }

    const deleteSeller = (id)=>{
        fetch(`${URLPATHS.SELLERS}/${id}`,{
            method:"delete"
        }).then(fetchSellers)
    }

    return ( 
        <>
        <UserTable users={sellers} removeUser={deleteSeller} 
            propertiesLink={`${ROUTES.PROPERTIES}/`} editLink={`${ROUTES.SELLERS}/`} type='seller'/>
        </>
    );
}
 
export default Sellers;