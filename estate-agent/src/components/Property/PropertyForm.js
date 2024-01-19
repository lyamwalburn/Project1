import { useEffect, useRef, useState } from "react";
import { PATH_IDS, SALESTATUS, SELECTVALUE, URLPATHS, validNumbers } from "../utils";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate()
    useEffect(()=>{
        const token = sessionStorage.getItem("jwt")
        try{
        fetch(URLPATHS.SELLERS, {
            mode: 'cors',
            method: 'GET',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`}
          })
        .then(res=>res.json().then(setSellers))
        } catch(error){
            //handle error
        }
        if(props.id != PATH_IDS.NEW){
            fetchProperty() 
        }
    },[])

    const fetchProperty = ()=>{
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.PROPERTY}/${props.id}`, {
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
                res.json().then(setFields)
            }
        })
        .catch(catchError)
        

    }

    const setFields = (data)=>{
       // console.log(data)
       addressInput.current.value = data.address
       postcodeInput.current.value = data.postCode
       typeInput.current.value = data.type
       valueInput.current.value = data.price
       bedroomsInput.current.value = data.numberOfBedrooms
       bathroomsInput.current.value = data.numberOfBathrooms
       gardensInput.current.value = data.garden
       sellerInput.current.value = data.sellerId
    }

    
    const catchError = (res)=>{
        if(res.status == 401){
            navigate('/signin')
        }
    }


    const saveDetails = (e) =>{
        e.preventDefault()
        let property = {
            address: addressInput.current.value,
            postCode: postcodeInput.current.value,
           // type: typeInput.current.value,
            price: parseInt(valueInput.current.value),
            numberOfBedrooms: parseInt(bedroomsInput.current.value),
            numberOfBathrooms: parseInt(bathroomsInput.current.value),
           // garden: (gardensInput.current.value === 'true'),
            sellerId: parseInt(sellerInput.current.value),
            status: SALESTATUS.FORSALE,
            buyerId: null
        }
        if(gardensInput.current.value != 'Garden'){
            property["garden"] = (gardensInput.current.value === 'true')
        }
        if(typeInput.current.value != 'not selected'){
            property["type"] = typeInput.current.value
        }
        if(props.id != PATH_IDS.NEW){
            property.id = props.id
        }
        console.log(property)
       //if( validatePropertyFE(property)){
            props.saveProperty(property,errorReportCB)
       //}
    }

    const errorReportCB = (res) =>{
        console.log('logging an error in propertyform')
        console.log(res)
        Object.hasOwn(res.errors,'Address') ?
            displayErrorOnFormField(addressInput,addressErr,res.errors.Address) :
            displayValidOnFormField(addressInput,addressErr)
        Object.hasOwn(res.errors,'NumberOfBathrooms') ?
            displayErrorOnFormField(bathroomsInput,bathroomsErr,res.errors.NumberOfBathrooms) :
            displayValidOnFormField(bathroomsInput,bathroomsErr)
        Object.hasOwn(res.errors,'NumberOfBedrooms') ?
            displayErrorOnFormField(bedroomsInput,bedroomsErr,res.errors.NumberOfBedrooms) :
            displayValidOnFormField(bedroomsInput,bedroomsErr)
        Object.hasOwn(res.errors,'PostCode') ?
            displayErrorOnFormField(postcodeInput,postcodeErr,res.errors.PostCode) :
            displayValidOnFormField(postcodeInput,postcodeErr)
        Object.hasOwn(res.errors,'Price') ?
            displayErrorOnFormField(valueInput,valueErr,res.errors.Price) :
            displayValidOnFormField(valueInput,valueErr)
        Object.hasOwn(res.errors,'SellerId') ?
            displayErrorOnFormField(sellerInput,sellerErr,res.errors.SellerId) :
            displayValidOnFormField(sellerInput,sellerErr)
        Object.hasOwn(res.errors,'Garden') ?
            displayErrorOnFormField(gardensInput,gardensErr,res.errors.Garden) :
            displayValidOnFormField(gardensInput,gardensErr)
        Object.hasOwn(res.errors,'Type') ?
            displayErrorOnFormField(typeInput,typeErr,res.errors.Type) :
            displayValidOnFormField(typeInput,typeErr)
    }

    const displayErrorOnFormField = (formInput,formError,errorText)=>{
        console.log(errorText)
        formInput.current.className = 'form-control is-invalid'
        formError.current.className = 'invalid-feedback'
        formError.current.innerHTML = errorText
    }

    const displayValidOnFormField = (formInput, formError)=>{
        formInput.current.className = 'form-control is-valid'
        formError.current.className = ''
        formError.current.innerHTML = ''
    }


    const validatePropertyFE = (property) =>{

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
        if(property.postCode.length <= 0){
            postcodeInput.current.className = 'form-control is-invalid'
            postcodeErr.current.className = 'invalid-feedback'
            postcodeErr.current.innerHTML = 'Please enter a postal code'
            isValid = false
        } else {
            postcodeInput.current.className = 'form-control is-valid'
            postcodeErr.current.className = ''
            postcodeErr.current.innerHTML = ''
        }
        if(!validNumbers.test(property.numberOfBedrooms)){
            bedroomsInput.current.className = 'form-control is-invalid'
            bedroomsErr.current.className = 'invalid-feedback'
            bedroomsErr.current.innerHTML = 'Please enter number of bedrooms with digits 0-9'
            isValid = false
        } else {
            bedroomsInput.current.className = 'form-control is-valid'
            bedroomsErr.current.className = ''
            bedroomsErr.current.innerHTML = ''
        }
        if(!validNumbers.test(property.numberOfBathrooms)){
            bathroomsInput.current.className = 'form-control is-invalid'
            bathroomsErr.current.className = 'invalid-feedback'
            bathroomsErr.current.innerHTML = 'Please enter number of bathrooms with digits 0-9'
            isValid = false
        } else {
            bathroomsInput.current.className = 'form-control is-valid'
            bathroomsErr.current.className = ''
            bathroomsErr.current.innerHTML = ''
        }
        // if(!validNumbers.test(property.garden)){
        //     gardensInput.current.className = 'form-control is-invalid'
        //     gardensErr.current.className = 'invalid-feedback'
        //     gardensErr.current.innerHTML = 'Please enter number of gardens with digits 0-9'
        //     isValid = false
        // } else {
        //     gardensInput.current.className = 'form-control is-valid'
        //     gardensErr.current.className = ''
        //     gardensErr.current.innerHTML = ''
        // }
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

        if(typeInput.current.value == SELECTVALUE.NOT_SELECTED){
            typeInput.current.className = 'form-select is-invalid'
            typeErr.current.className = 'invalid-feedback'
            typeErr.current.innerHTML = 'Please Select a Property type from the list'
            isValid = false
        } else {
            typeInput.current.className = 'form-select is-valid'
            typeErr.current.className = ''
            typeErr.current.innerHTML = ''
        }

        if(sellerInput.current.value == SELECTVALUE.NOT_SELECTED){
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
        <div className="container my-5 pb-4">
        <h2 className="ms-4">{props.title}</h2>
        <form className="col-md-12 m-auto my-5 p-5 needs-validated">
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
                <select ref={gardensInput} className="form-select">
                    <option defaultValue={null} value={null}>Garden</option>
                    <option value={'true'}>Yes</option>
                    <option value={'false'}>No</option>
                </select>
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
                    <option defaultValue value={'not selected'}>Property type...</option>
                    <option value={'DETACHED'}>DETACHED</option>
                    <option value={'SEMI'}>SEMI DETACHED</option>
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
        <div className="row mt-3">
            {props.id == PATH_IDS.NEW ? 
                <button className="btn btn-primary mt-3 col-md-3 ms-auto me-2" onClick={(e)=>{saveDetails(e)}}>Create Property</button>
                :
                <button className="btn btn-primary mt-3 col-md-3 ms-auto me-2" onClick={(e)=>{saveDetails(e)}}>Save Changes</button>}
        </div>
    </form> 
    </div>
     );
}
 
export default PropertyForm;