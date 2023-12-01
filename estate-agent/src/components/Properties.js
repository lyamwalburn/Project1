import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";

const Properties = () => {

    const [properties,setProperties] = useState([])
    const URL = 'http://localhost:8081/property'

    const {sellerId} = useParams()

    useEffect(()=>{
        fetchProperties()
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
            <div className="container text-center">
                <div className="grid">
                    <div className="row d-flex justify-content-center">
                        <Link to='/properties/new'><button>New Property</button></Link>
                        {sellerId != null ? properties.filter(p=> p.sellerId == sellerId).map(property=>(
                            <PropertyCard property={property}/>
                        )) :
                        properties.map(property=>(
                            <PropertyCard property={property}/>
                        ))} 
                    </div>
                </div>
            </div>
    );
}
 
export default Properties;