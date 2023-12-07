import { useEffect, useRef, useState } from 'react';
import {SALESTATUS, URLPATHS, PROPERTY_TYPES} from '../utils'
import PropertyCard from './PropertyCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const PropertySearch = () => {


    const priceRef = useRef(100000)
    const priceSlider = useRef(100000)
    const bedroomInput = useRef(5)
    const bathroomInput = useRef(5)
    const typeInput = useRef(PROPERTY_TYPES.ALL)


    const [properties,setProperties] = useState([])
    const [filteredProperties,setFilteredProperties] = useState([])

    useEffect(()=>{
        fetch(URLPATHS.PROPERTY).then(res=>res.json().then(getdata))
        priceRef.current.value = 100000
        priceSlider.current.value = 100000
    },[])

    const getdata = (data) =>{
        setProperties(data)
        setFilteredProperties(data)
        //only show properties that are for sale
        //setFilteredProperties(data.filter(property=>property.status == SALESTATUS.FORSALE))
    }

    const updateValue = (valueRef,targetRef)=>{
        targetRef.current.value = valueRef.current.value
    }

    const filteredSearch = ()=>{
        let searchResults = [...properties]


        //status
        searchResults = searchResults.filter(property => property.status == SALESTATUS.FORSALE)

        //price
        if(document.getElementById('radioUnder').checked){
            searchResults = searchResults.filter(property=>parseInt(property.price) <= parseInt(priceRef.current.value))
        } else if (document.getElementById('radioOver').checked){
            searchResults = searchResults.filter(property=>parseInt(property.price) >= parseInt(priceRef.current.value))
        }

        //bedrooms
        searchResults = searchResults.filter(property => property.bedroom >= bedroomInput.current.value)


        //bathrooms
        searchResults = searchResults.filter(property => property.bathroom >= bathroomInput.current.value)

        //garden
        if(document.getElementById('radioGardenAny').checked){
            searchResults = searchResults.filter(property => property.garden >= 0) //no preference on garden
        } else if(document.getElementById('radioGardenTrue').checked){
            searchResults = searchResults.filter(property => property.garden > 0) //has a garden
        } else {
            searchResults = searchResults.filter(property => property.garden == 0) //no garden
        }

        //type
        if(typeInput.current.value != PROPERTY_TYPES.ALL){
            searchResults = searchResults.filter(property => property.type == typeInput.current.value)
        }

        setFilteredProperties(searchResults)
    }

    const clearFilters = ()=>{
        setFilteredProperties(properties)
        priceRef.current.value = 100000
        priceSlider.current.value = 100000
        typeInput.current.value = PROPERTY_TYPES.ALL
        bathroomInput.current.value = 1
        bedroomInput.current.value = 1
        document.getElementById('raidoAllPrices').checked = true
        document.getElementById('radioGardenAny').checked = true
    }

    return ( 
        <>
            
            <div className='container p-3 bg-light text-dark rounded-bottom'>
            <h2 className='mb-3'>Search Properties</h2>
                <div className='grid border-bottom pb-4'>
                    <div className='row'>
                        <div className="form-group col-md-6 border-start border-end border-bottom border-top rounded pe-3 pb-3">
                            <div className="btn-group mb-3" role="group" aria-label="Price filters button toggle group">
                                <input type="radio" className="btn-check" name="btnPrice" id="raidoAllPrices" autoComplete="off" defaultChecked/>
                                <label className="btn btn-outline-primary" htmlFor="raidoAllPrices">All Prices</label>

                                <input type="radio" className="btn-check" name="btnPrice" id="radioUnder" autoComplete="off"/>
                                <label className="btn btn-outline-primary" htmlFor="radioUnder">Prices Under</label>

                                <input type="radio" className="btn-check" name="btnPrice" id="radioOver" autoComplete="off"/>
                                <label className="btn btn-outline-primary" htmlFor="radioOver">Prices Over</label>                    
                            </div>
                            <input type='text' ref={priceRef} className='form-control'
                            onChange={()=>{updateValue(priceRef,priceSlider)}}/>
                            <input type="range" className="form-range" min="10000" max="500000" id="customRange2" step='5000' ref={priceSlider}
                            onChange={()=>{updateValue(priceSlider,priceRef)}}/>
                        </div>

                        <div className="form-group col-md-6">
                        <div className="btn-group mb-3" role="group" aria-label="Garden preference toggle group">
                            <input type="radio" className="btn-check" name="btnGarden" id="radioGardenAny" autoComplete="off" defaultChecked/>
                            <label className="btn btn-outline-primary" htmlFor="radioGardenAny">Any Garden</label>

                            <input type="radio" className="btn-check" name="btnGarden" id="radioGardenTrue" autoComplete="off"/>
                            <label className="btn btn-outline-primary" htmlFor="radioGardenTrue">Has Garden</label>

                            <input type="radio" className="btn-check" name="btnGarden" id="radioGardenFalse" autoComplete="off"/>
                            <label className="btn btn-outline-primary" htmlFor="radioGardenFalse">No Garden</label> 
                        </div>
                            <div>
                                <label>Property Type</label>
                                <select ref={typeInput} className="form-select">
                                    <option defaultValue value ={PROPERTY_TYPES.ALL}>All</option>
                                    <option value={PROPERTY_TYPES.DETACHED}>Detached</option>
                                    <option value={PROPERTY_TYPES.SEMI_DETACHED}>Semi-Detached</option>
                                    <option value={PROPERTY_TYPES.APARTMENT}>Apartment</option>
                                </select>
                            </div>
                        </div>
                    </div>
                <div className='row mt-3'>
                    <div className="form-group col-md-6">
                        <label>Min Bedrooms</label>
                        <select ref={bedroomInput} className="form-select">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5+</option>
                        </select>
                    </div>

                    <div className="form-group col-md-6">
                        <label>Min Bathrooms</label>
                        <select ref={bathroomInput} className="form-select">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5+</option>
                        </select>
                    </div>

                </div>
                <div className='row d-flex justify-content-between'>
                    <button onClick={()=>{clearFilters()}} className='btn btn-danger mt-3 col-md-3 px-5'><FontAwesomeIcon icon={faRotateLeft} className='pe-2'/>Clear Filters</button>
                    <button onClick={()=>{filteredSearch()}} className='btn btn-primary mt-3 col-md-3 px-5'><FontAwesomeIcon icon={faMagnifyingGlass} className='pe-2'/>Search</button>       
                </div>
            </div>
            </div>

            <div className="container mt-0 bg-white p-5">
                <div className="grid">
                    <div className="row justify-content-center text-center">
                { filteredProperties.map(property=>(
                        <PropertyCard property={property} key={property.id} manage={false}/>
                    ))} 
                    </div>
                </div>
            </div>
            
        </>
     );
}
 
export default PropertySearch;