import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";

const Properties = () => {

    const [properties,setProperties] = useState([])
    const URL = 'http://localhost:8081/property'

    const {sellerId,buyerId} = useParams()

    useEffect(()=>{
        fetchProperties()
        console.log(`seller id = ${sellerId}`)
        console.log(`buyer id = ${buyerId}`)
    },[])

    const fetchProperties = ()=>{
        fetch(URL).then(res=>res.json().then(setProperties))
    }

    const deleteProperty = (id)=>{
        fetch(`${URL}/${id}`,{
            method:"delete"
        }).then(fetchProperties)
    }

    return ( 
        <>
        <h2 className="mt-4">All Properties</h2>
            <div className="container mt-4">
                <div className="grid">
                <Link to='/properties/upsert/new'><button className="btn btn-primary ms-3">Create Property</button></Link>
                    <div className="row d-flex justify-content-center text-center">
                        {sellerId != null ? properties.filter(p=> p.sellerId == sellerId).map(property=>(
                            <PropertyCard property={property}/>
                        )) :
                        buyerId != null ? properties.filter(p=>p.buyerId == buyerId).map(property=>(
                            <PropertyCard property={property}/>
                        )):
                        properties.map(property=>(
                            <PropertyCard property={property}/>))
                        } 
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Properties;