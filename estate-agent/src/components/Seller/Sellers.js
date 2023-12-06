import { useEffect } from "react";
import { useState } from "react";
import UserTable from "../User/UserTable";
import { useNavigate } from "react-router-dom";

const Sellers = () => {

    const [sellers,setSellers] = useState([])
    const URL = 'http://localhost:8081/seller'

    const navigate = useNavigate()

    useEffect(()=>{
        fetchSellers()
    },[])

    const fetchSellers = ()=>{
        fetch(URL).then(res=>res.json().then(setSellers))
    }

    const deleteSeller = (id)=>{
        fetch(`${URL}/${id}`,{
            method:"delete"
        }).then(fetchSellers)
    }

    return ( 
        <>
        <h2 className="mt-4">All Sellers</h2>
        <UserTable users={sellers} removeUser={deleteSeller} 
            propertiesLink='/properties/' editLink='/sellers/'
            createLink='/sellers/new'/>
        </>
    );
}
 
export default Sellers;