import { useEffect, useRef, useState } from 'react';
import {URLPATHS} from './utils'
import PropertyCard from './PropertyCard';

const PropertySearch = () => {


    const priceRef = useRef(100000)
    const priceSlider = useRef(100000)


    const [properties,setProperties] = useState([])
    const [filteredProperties,setFilteredProperties] = useState([])

    useEffect(()=>{
        fetch(URLPATHS.PROPERTY).then(res=>res.json().then(getdata))
    },[])

    const getdata = (data) =>{
        setProperties(data)
        setFilteredProperties(data)
    }

    const updateValue = (valueRef,targetRef)=>{
        targetRef.current.value = valueRef.current.value
    }

    const filteredSearch = ()=>{
        console.log(properties)
        let searchResults = [...properties]
        
        console.log(searchResults[0].price)
        setFilteredProperties(searchResults.filter(property=>parseInt(property.price) <= parseInt(priceRef.current.value)))
    }

    return ( 
        <>
            <div className='col-4 '>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="radioUnder" autoComplete="off" defaultChecked/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Prices Under</label>

                    <input type="radio" className="btn-check" name="btnradio" id="radioOver" autoComplete="off"/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Prices Over</label>
                </div>
                <input type='text' ref={priceRef}
                    onChange={()=>{updateValue(priceRef,priceSlider)}}/>
                <input type="range" className="form-range" min="10000" max="500000" id="customRange2" step='5000' ref={priceSlider}
                     onChange={()=>{updateValue(priceSlider,priceRef)}}/>
            </div>
            <button onClick={()=>{filteredSearch()}} className='btn btn-primary'>Search</button>

            <div className='d-flex'>
                { filteredProperties.map(property=>(
                        <PropertyCard property={property}/>
                    ))} 
            </div>
        </>
     );
}
 
export default PropertySearch;