import { useState, useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import { useParams, useNavigate } from "react-router-dom";
import {URLPATHS, SALESTATUS, SELECTVALUE, ROUTES} from '../utils'
import BookingForm from "../Booking/BookingForm";
import BookingsTable from "../Booking/BookingsTable";

const ManageProperty = (props) => {

    const {propertyId} = useParams()

    const [property,setProperty]=useState([])
    const [buyers,setBuyers]=useState([])
    const [bookings,setBookings]=useState([])

    const navigate = useNavigate()

    const buyerInput = useRef(SELECTVALUE.NOT_SELECTED)
    const buyerErr = useRef(null)

    useEffect(()=>{
        fetchProperty()
        fetchBuyers()
        fetchBookings()
    },[])


    const fetchProperty = ()=>{
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.PROPERTY}/${propertyId}`, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.json().then(setProperty)
            }
        })
        .catch(catchError)
        
    }

    const fetchBookings = ()=>{
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.BOOKING}`, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.json().then(setBookings)
            }
        })
        .catch(catchError)
        
    }

    const fetchBuyers = ()=>{
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.BUYERS}`, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                //console.log(res)
                res.json().then(setBuyers)
            }
        })
        .catch(catchError)
        
    }

    const deleteBooking = (id) =>{
       const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.BOOKING}/${id}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`}
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.then(fetchBookings)
            }
        })
        .catch(catchError)
    }


        
    const catchError = (res)=>{
        if(res.status == 401){
            navigate('/signin')
        }
    }


    const saveProperty = async (e)=>{
        e.preventDefault()
        let newProp = {}
        property.status == SALESTATUS.FORSALE ?
        newProp = {...property,
            buyerId: buyerInput.current.value,
            status: SALESTATUS.SOLD}
        :
        newProp = {...property,
            buyerId: null,
            status: SALESTATUS.FORSALE}

            /* logic mvoed to backend
        if(newProp.status == SALESTATUS.SOLD){
          // await removeBookings(newProp.id)
          await deleteAll(newProp.id).then(()=>{updateProperty(newProp)})
        } else {
            */
            updateProperty(newProp)
        //}
        
    }

    const sellProperty = (e)=>{
        e.preventDefault()
        let soldProperty = {...property,
            buyerId: buyerInput.current.value
        }
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.PROPERTY}${ROUTES.PROPERTY_SELL}${property.id}`, {
            mode: 'cors',
            method: 'PATCH',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`},
            body:JSON.stringify(soldProperty)
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                navigate('/')
            }
        })
        .catch(catchError)
    }

    const relistProperty = (e) => {
        e.preventDefault()

        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.PROPERTY}${ROUTES.PROPERTY_RELIST}${property.id}`, {
            mode: 'cors',
            method: 'PATCH',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`},
            body:JSON.stringify({id: property.id})
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                navigate('/')
            }
        })
        .catch(catchError)
    }

    const withdrawProperty = (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.PROPERTY}${ROUTES.PROPERTY_WITHDRAW}${property.id}`, {
            mode: 'cors',
            method: 'PATCH',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`},
            body:JSON.stringify({id: property.id})
          })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                navigate('/')
            }
        })
        .catch(catchError)
    }

    const updateProperty = async (newProp)=>{
        if(property.status == SALESTATUS.SOLD || validateBuyer()){
        
            await fetch(`${URLPATHS.PROPERTY}/${property.id}`,{
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newProp)
            }).then(res=>{
                if(res.ok){
                    navigate('/')
                } else {
                    console.log(res.statusText)
                }
            })
           // navigate('/')
        }
    }

    const removeBookings = async (id)=>{
        let toCancel = bookings.filter(b=> b.propertyId == id)
         toCancel.forEach(booking =>{
            fetch(`${URLPATHS.BOOKING}/${booking.id}`,{
                method:"delete"
            }).then(console.log('deleted'))
        })
    }

    
    //deletes all the bookings for a given property id
    const deleteAll= async (id)=>{
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
            
            let delArray = bookings.filter(p=> p.propertyId == id)
            let delFetch = delArray.map(booking => {
            return fetch(URLPATHS.BOOKING +'/'+ booking.id, {
            method: 'DELETE',
            headers: headers,
            });
            });
            
            return await Promise.all([delFetch])
    }


    const validateBuyer = ()=>{
        if(buyerInput.current.value == SELECTVALUE.NOT_SELECTED){
            buyerInput.current.className = 'form-select is-invalid'
            buyerErr.current.className = 'invalid-feedback'
            buyerErr.current.innerHTML = 'Please Select a Seller from the list'
            return false
        } else {
            buyerInput.current.className = 'form-select is-valid'
            buyerErr.current.className = ''
            buyerErr.current.innerHTML = ''
        }
        return true
    }

    return ( 
        <div className="container mt-4 ">
            <div className="grid">
                <div className="row justify-content-center pb-5">
                <PropertyCard className='col-md-4' property={property} manage={true}/>
                <div className="accordion col-md-7 mt-2" id="accordionExample">
                    <div className="accordion-item mt-2">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Make Booking
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        {property.status == SALESTATUS.FORSALE ? 
                            <BookingForm buyers={buyers} property={property} refreshBookings={fetchBookings}/>
                            :
                            <p>Cannot make booking for this property.</p>
                        }
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                     <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Bookings
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {property.status == SALESTATUS.FORSALE ? 
                            <BookingsTable buyers={buyers} property={property} bookings={bookings} deleteBooking={deleteBooking}/>
                        :
                            <p>This prperty cannot have bookings.</p>
                        }
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                        {property.status == SALESTATUS.FORSALE ? 
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Purchase
                            </button>
                        :
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Re-list
                            </button>
                        }
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        {property.status == SALESTATUS.FORSALE ? 
                            <>
                            <select ref={buyerInput} className="form-select">
                                <option defaultValue={SELECTVALUE.NOT_SELECTED} value={SELECTVALUE.NOT_SELECTED}>Buyer</option>
                                {buyers.map(buyer=>(
                                <option value={buyer.id} key={buyer.id}>{`${buyer.firstName} ${buyer.surname}`}</option>
                                ))}
                            </select>
                            <span ref={buyerErr}></span>
                            <button className="mt-2 btn btn-primary" onClick={(e)=>sellProperty(e)}>Purchase</button>
                            </>
                            :
                                <button className="mt-2 btn btn-primary" onClick={(e)=>relistProperty(e)}>Re-list</button>
                            }
                        </div>
                        </div>
                        {property.status == SALESTATUS.FORSALE  || property.status == SALESTATUS.SOLD? 
                        <>
                        <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                            Withdraw Property
                        </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <button className="mt-2 btn btn-primary" onClick={(e)=>withdrawProperty(e)}>Withdraw Property</button>
                        </div>
                        </div>
                        </>
                        : <></>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ManageProperty;