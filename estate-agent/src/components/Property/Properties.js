import { useEffect, useId } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";
import { SALESTATUS, URLPATHS } from "../utils";

const Properties = () => {

    let id = useId()
    const [properties,setProperties] = useState([])

    const {sellerId,buyerId} = useParams()

    useEffect(()=>{
        fetchProperties()
        console.log(`seller id = ${sellerId}`)
        console.log(`buyer id = ${buyerId}`)
    },[])

    const fetchProperties = ()=>{
        fetch(URLPATHS.PROPERTY).then(res=>res.json().then(setProperties))
    }

    const deleteProperty = (id)=>{
        fetch(`${URLPATHS.PROPERTY}/${id}`,{
            method:"delete"
        }).then(fetchProperties)
    }

    return ( 
        <>
            <div className="container mt-4">
                <div className="grid">
                    <div className="row d-flex justify-content-center text-center">
                        {sellerId != null ? properties.filter((p)=> p.sellerId == sellerId).map((property,i)=>(
                            <PropertyCard property={property} key={id+i}/>
                        )) :
                        buyerId != null ? properties.filter(p=>p.buyerId == buyerId).map((property,i)=>(
                            <PropertyCard property={property} key={id+i}/>
                        )):
                        properties.filter(p=> p.status == SALESTATUS.SOLD).map((property,i)=>(
                            <>
                                <h2 className="text-start">Sold Properties</h2>
                                <PropertyCard property={property} key={id+i}/>
                            </>
                            ))
                        } 
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Properties;