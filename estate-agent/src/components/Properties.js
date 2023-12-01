import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyRow from "./PropertyRow";
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
        // if(sellerId != null){
        //     setProperties(properties.filter(p=>p.sellerId == sellerId))
        // } else {
        //     console.log(sellerId)
        // }
    }

    const deleteProperty = (id)=>{
        fetch(`${URL}/${id}`,{
            method:"delete"
        }).then(fetchProperties)
    }

    return ( 
        <div>
            <Link to='/properties/new'><button>New Property</button></Link>
            <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Address</th>
                    <th>Postcode</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Bedroom</th>
                    <th>Bathroom</th>
                    <th>Garden</th>
                    <th>SellerId</th>
                    <th>Status</th>
                    <th>BuyerId</th>
                </tr>
            </thead>
            <tbody>
        {sellerId != null ? properties.filter(p=> p.sellerId == sellerId).map(property=>(
            // <PropertyRow property={property} delete={deleteProperty}/>
            <PropertyCard property={property}/>
        )) :
        properties.map(property=>(
           <PropertyRow property={property} delete={deleteProperty}/>
        ))}
        </tbody>
        </table>
        </div>
    );
}
 
export default Properties;