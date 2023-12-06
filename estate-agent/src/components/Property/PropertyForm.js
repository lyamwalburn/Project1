import { useEffect, useRef, useState } from "react";
import { validNumbers } from "../utils";

const PropertyForm = (props) => {

    const [sellers,setSellers] = useState([])


    const addressInput = useRef(null)
    const postcodeInput = useRef(null)
    const valueInput = useRef(null)
    const bedroomsInput = useRef(null)
    const bathroomsInput = useRef(null)
    const typeInput = useRef(null)
    const sellerInput = useRef(null)
    const gardensInput = useRef(null)

    const addressErr = useRef(null)
    const postcodeErr = useRef(null)
    const bedroomsErr = useRef(null)
    const bathroomsErr = useRef(null)
    const gardensErr = useRef(null)
    const valueErr = useRef(null)
    const typeErr = useRef(null)
    const sellerErr = useRef(null)

    useEffect(()=>{
        fetch('http://localhost:8081/seller').then(res=>res.json().then(setSellers))
        
        if(props.id != 'new'){
            fetchProperty() 
        }
    },[])

    async function fetchProperty(){
        const res = await fetch(`http://localhost:8081/property/${props.id}`)
        const data = await res.json()
        console.log(data)
        addressInput.current.value = data.address
        postcodeInput.current.value = data.postcode
        typeInput.current.value = data.type
        valueInput.current.value = data.price
        bedroomsInput.current.value = data.bedroom
        bathroomsInput.current.value = data.bathroom
        gardensInput.current.value = data.garden
        sellerInput.current.value = data.sellerId
    }

    const saveDetails = (e) =>{
        e.preventDefault()
        let property = {
            address: addressInput.current.value,
            postcode: postcodeInput.current.value,
            type: typeInput.current.value,
            price: valueInput.current.value,
            bedroom: bedroomsInput.current.value,
            bathroom: bathroomsInput.current.value,
            garden: gardensInput.current.value,
            sellerId: sellerInput.current.value,
            status: 'FOR SALE'
        }
        if(props.id != 'new'){
            property.id = props.id
        }

       if( validateProperty(property)){
            props.saveProperty(property)
       }
    }


    const validateProperty = (property) =>{

        let isValid = true
        if(property.address.length <= 0){
            addressInput.current.className = 'form-control is-invalid'
            addressErr.current.className = 'invalid-feedback'
            addressErr.current.innerHTML = 'Please enter an address'
            isValid = false
        } else {
            addressInput.current.className = 'form-control is-valid'
            addressErr.current.className = ''
            addressErr.current.innerHTML = ''
        }
        if(property.postcode.length <= 0){
            postcodeInput.current.className = 'form-control is-invalid'
            postcodeErr.current.className = 'invalid-feedback'
            postcodeErr.current.innerHTML = 'Please enter a postal code'
            isValid = false
        } else {
            postcodeInput.current.className = 'form-control is-valid'
            postcodeErr.current.className = ''
            postcodeErr.current.innerHTML = ''
        }
        if(!validNumbers.test(property.bedroom)){
            bedroomsInput.current.className = 'form-control is-invalid'
            bedroomsErr.current.className = 'invalid-feedback'
            bedroomsErr.current.innerHTML = 'Please enter number of bedrooms with digits 0-9'
            isValid = false
        } else {
            bedroomsInput.current.className = 'form-control is-valid'
            bedroomsErr.current.className = ''
            bedroomsErr.current.innerHTML = ''
        }
        if(!validNumbers.test(property.bathroom)){
            bathroomsInput.current.className = 'form-control is-invalid'
            bathroomsErr.current.className = 'invalid-feedback'
            bathroomsErr.current.innerHTML = 'Please enter number of bathrooms with digits 0-9'
            isValid = false
        } else {
            bathroomsInput.current.className = 'form-control is-valid'
            bathroomsErr.current.className = ''
            bathroomsErr.current.innerHTML = ''
        }
        if(!validNumbers.test(property.garden)){
            gardensInput.current.className = 'form-control is-invalid'
            gardensErr.current.className = 'invalid-feedback'
            gardensErr.current.innerHTML = 'Please enter number of gardens with digits 0-9'
            isValid = false
        } else {
            gardensInput.current.className = 'form-control is-valid'
            gardensErr.current.className = ''
            gardensErr.current.innerHTML = ''
        }
        if(!validNumbers.test(property.price)){
            valueInput.current.className = 'form-control is-invalid'
            valueErr.current.className = 'invalid-feedback'
            valueErr.current.innerHTML = 'Please enter property value in digits 0-9'
            isValid = false
        } else {
            valueInput.current.className = 'form-control is-valid'
            valueErr.current.className = ''
            valueErr.current.innerHTML = ''
        }
        console.log(typeInput.current.value)

        if(typeInput.current.value == 'not-selected'){
            typeInput.current.className = 'form-select is-invalid'
            typeErr.current.className = 'invalid-feedback'
            typeErr.current.innerHTML = 'Please Select a Property type from the list'
            isValid = false
        } else {
            typeInput.current.className = 'form-select is-valid'
            typeErr.current.className = ''
            typeErr.current.innerHTML = ''
        }

        if(sellerInput.current.value == 'not-selected'){
            sellerInput.current.className = 'form-select is-invalid'
            sellerErr.current.className = 'invalid-feedback'
            sellerErr.current.innerHTML = 'Please Select a Seller from the list'
            isValid = false
        } else {
            sellerInput.current.className = 'form-select is-valid'
            sellerErr.current.className = ''
            sellerErr.current.innerHTML = ''
        }


        return isValid
    }


    return ( 
        <form className="col-md-10 m-auto mt-4 px-5 needs-validated">
        <div className="row">
            <div className="col-md-7 mt-2">
                <input type="text" className="form-control" placeholder="Address" ref={addressInput}/>
                <span ref={addressErr}></span>
            </div>
            <div className="col-md-5 mt-2">
                <input type="text" className="form-control" placeholder="Postcode" ref={postcodeInput}/>
                <span ref={postcodeErr}></span>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-4 mt-3">
                <input type="text" className="form-control" placeholder="Bedrooms" ref={bedroomsInput}/>
                <span ref={bedroomsErr}></span>
            </div>
            <div className="col-md-4 mt-3">
                <input type="text" className="form-control" placeholder="Bathrooms" ref={bathroomsInput}/>
                <span ref={bathroomsErr}></span>
            </div>
            <div className="col-md-4 mt-3">
                <input type="text" className="form-control" placeholder="Gardens" ref={gardensInput}/>
                <span ref={gardensErr}></span>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-4 mt-3"> 
                <input type="text" className="form-control" placeholder="Value" ref={valueInput}/>
                <span ref={valueErr}></span>
            </div>
            <div className="form-group col-md-4 mt-3">
                <select ref={typeInput} className="form-select">
                    <option defaultValue value={'not-selected'}>Property type...</option>
                    <option value={'DETACHED'}>DETACHED</option>
                    <option value={'SEMI-DETACHED'}>SEMI-DETACHED</option>
                    <option value={'TERRACED'}>TERRRACED</option>
                    <option value={'APARTMENT'}>APARTMENT</option>
                </select>
                <span ref={typeErr}></span>
            </div>
            <div className="form-group col-md-4 mt-3">
                <select ref={sellerInput} className="form-select">
                    <option defaultValue value={'not-selected'}>Seller</option>
                    {sellers.map(seller=>(
                    <option value={seller.id} key={seller.id}>{`${seller.firstName} ${seller.surname}`}</option>
                    ))}
                </select>
                <span ref={sellerErr}></span>
            </div>
        </div>
        <div className="row">
            {props.id == 'new' ? 
                <button className="btn btn-primary mt-3 col-md-3 ms-auto me-2" onClick={(e)=>{saveDetails(e)}}>Create Property</button>
                :
                <button className="btn btn-primary mt-3 col-md-3 ms-auto me-2" onClick={(e)=>{saveDetails(e)}}>Save Changes</button>}
        </div>
    </form> 
     );
}
 
export default PropertyForm;