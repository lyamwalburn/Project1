import { useEffect, useId } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PropertyCard from "./PropertyCard";
import { SALESTATUS, URLPATHS } from "../utils";

const Properties = () => {

    let id = useId()
    const navigate = useNavigate()
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
                        )): properties.filter(p=> p.status == SALESTATUS.SOLD).length > 0 ?
                            properties.filter(p=> p.status == SALESTATUS.SOLD).map((property,i)=>(
                            <>
                                <h2 className="text-start">Sold Properties</h2>
                                <PropertyCard property={property} key={id+i}/>
                            </>
                            
                        )) :
                            <div className="container py-5">
                                <h2 className="py-5">Sorry we couldn't find anything matching your criteria</h2>
                                <p className="py-5 mb-5">At this time there are no sold properites to display. Our agents are constantly making moves in the market so try back here again soon!</p>
                                <button className="btn btn-primary btn-lg mb-5" onClick={()=>{navigate('/')}}>Go Home</button>
                            </div>

                        } 
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Properties;