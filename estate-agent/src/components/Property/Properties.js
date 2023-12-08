import { useEffect, useId } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";
import { SALESTATUS, URLPATHS } from "../utils";
import NoResults from "../General/NoResults";

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
                        <h2 className="text-start">Properties</h2>
                        {sellerId != null ? properties.filter((p)=> p.sellerId == sellerId).length > 0 ? properties.filter((p)=> p.sellerId == sellerId).map((property,i)=>(
                            <PropertyCard property={property} key={id+i}/>
                            )):
                            <NoResults />
                         :
                        buyerId != null ? properties.filter(p=>p.buyerId == buyerId).length > 0 ? properties.filter(p=>p.buyerId == buyerId).map((property,i)=>(
                            <PropertyCard property={property} key={id+i}/>
                        )) : <NoResults />
                        
                        : properties.filter(p=> p.status == SALESTATUS.SOLD).length > 0 ?
                            properties.filter(p=> p.status == SALESTATUS.SOLD).map((property,i)=>(
                            <>
                                <PropertyCard property={property} key={id+i}/>
                            </>
                            
                        )) :
                            <NoResults />

                        } 
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Properties;