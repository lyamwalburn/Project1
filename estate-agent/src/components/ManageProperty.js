import { useState, useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import { useParams, useNavigate } from "react-router-dom";

const ManageProperty = (props) => {

    const URL = 'http://localhost:8081'

    const {propertyId} = useParams()

    const [property,setProperty]=useState([])
    const [buyers,setBuyers]=useState([])
    const [sellers,setSellers]=useState([])

    const navigate = useNavigate()

    const buyerInput = useRef(null)

    useEffect(()=>{
        fetchProperty()
        fetchBuyers()
    },[])

    const fetchProperty = ()=>{
        fetch(`${URL}/property/${propertyId}`).then(res=>res.json().then(setProperty))
    }

    const fetchBuyers = () =>{
        fetch(`${URL}/buyer`).then(res=>res.json().then(setBuyers))
    }

    const saveProperty = ()=>{
        let newProp = {}
        property.status == 'FOR SALE' ?
        newProp = {...property,
            buyerId: buyerInput.current.value,
            status: 'SOLD'}
        :
        newProp = {...property,
            buyerId: null,
            status: 'FOR SALE'}
        
        fetch(`http://localhost:8081/property/${property.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(newProp)
        })
        navigate('/properties')
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
                            Accordion Item #1
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
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Purchase
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <select ref={buyerInput} className="form-select">
                                <option selected disabled>Buyer</option>
                                {buyers.map(buyer=>(
                                <option value={buyer.id} key={buyer.id}>{`${buyer.firstName} ${buyer.surname}`}</option>
                                ))}
                            </select>
                            <button onClick={()=>saveProperty()}>Purchase</button>
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