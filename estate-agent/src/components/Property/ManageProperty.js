import { useState, useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import { useParams, useNavigate } from "react-router-dom";
import {URLPATHS} from '../utils'
import BookingForm from "../Booking/BookingForm";
import BookingsTable from "../Booking/BookingsTable";

const ManageProperty = (props) => {

    const SALESTATUS = {
        FORSALE: 'FOR SALE',
        SOLD: 'SOLD'
    }

    const {propertyId} = useParams()

    const [property,setProperty]=useState([])
    const [buyers,setBuyers]=useState([])
    const [bookings,setBookings]=useState([])

    const navigate = useNavigate()

    const buyerInput = useRef(null)
    const buyerErr = useRef(null)

    useEffect(()=>{
        fetchProperty()
        fetchBuyers()
        fetchBookings()
    },[])

    const fetchProperty = async ()=>{
       await fetch(`${URLPATHS.PROPERTY}/${propertyId}`).then(res=>res.json().then(setProperty))
    }

    const fetchBookings = async ()=>{
        await fetch(`${URLPATHS.BOOKING}`).then(res=>res.json().then(setBookings))
    }

    const fetchBuyers = async () =>{
        await fetch(`${URLPATHS.BUYERS}`).then(res=>res.json().then(setBuyers))
    }

    const deleteBooking = (id) =>{
        fetch(`${URLPATHS.BOOKING}/${id}`,{
            method:"delete"
        }).then(fetchBookings)
    }

    const saveProperty = (e)=>{
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

        if(newProp.status == SALESTATUS.SOLD){
            removeBookings(newProp.id)
        }
        if(property.status == SALESTATUS.SOLD || validateBuyer()){
        
            fetch(`${URLPATHS.PROPERTY}/${property.id}`,{
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newProp)
            })
            navigate('/properties')
        }
    }

    const removeBookings = (id)=>{
        let toCancel = bookings.filter(p=> p.propertyId == id)
        toCancel.forEach(booking =>{
            fetch(`${URLPATHS.BOOKING}/${booking.id}`,{
                method:"delete"
            }).then()
        })
        navigate('/')
    }

    const validateBuyer = ()=>{
        if(buyerInput.current.value == 'not-selected'){
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
        <div className="container mt-4">
            <div className="grid">
                <div className="row justify-content-center">
                <PropertyCard className='col-md-4' property={property}/>
                <div className="accordion col-md-7" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Make Booking
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <BookingForm buyers={buyers} property={property} refreshBookings={fetchBookings}/>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                     <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Bookings
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                            <BookingsTable buyers={buyers} property={property} bookings={bookings} deleteBooking={deleteBooking}/>
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
                                <option defaultValue value='not-selected'>Buyer</option>
                                {buyers.map(buyer=>(
                                <option value={buyer.id} key={buyer.id}>{`${buyer.firstName} ${buyer.surname}`}</option>
                                ))}
                            </select>
                            <span ref={buyerErr}></span>
                            <button className="mt-2 btn btn-primary" onClick={(e)=>saveProperty(e)}>Purchase</button>
                            </>
                            :
                                <button className="mt-2 btn btn-primary" onClick={(e)=>saveProperty(e)}>Re-list</button>
                            }
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ManageProperty;