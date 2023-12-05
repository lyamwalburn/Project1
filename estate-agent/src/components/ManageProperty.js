import { useState, useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import { useParams, useNavigate } from "react-router-dom";
import {URLPATHS} from './utils'

const ManageProperty = (props) => {

    const SALESTATUS = {
        FORSALE: 'FOR SALE',
        SOLD: 'SOLD'
    }

    const {propertyId} = useParams()

    const [property,setProperty]=useState([])
    const [buyers,setBuyers]=useState([])

    const navigate = useNavigate()

    const buyerInput = useRef(null)
    const buyerErr = useRef(null)

    useEffect(()=>{
        fetchProperty()
        fetchBuyers()
    },[])

    const fetchProperty = ()=>{
        fetch(`${URLPATHS.PROPERTY}/${propertyId}`).then(res=>res.json().then(setProperty))
    }

    const fetchBuyers = () =>{
        fetch(`${URLPATHS.BUYERS}`).then(res=>res.json().then(setBuyers))
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

        if(property.status == SALESTATUS.SOLD || validateBuyer()){
        
            fetch(`${URLPATHS.PROPERTY}/${property.id}`,{
                method:"PUT",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newProp)
            })
            navigate('/properties')
        }
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
                            Bookings
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        {property.status == SALESTATUS.FORSALE ? 
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Purchase
                            </button>
                        :
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Re-list
                            </button>
                        }
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
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