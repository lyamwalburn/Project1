import { useEffect, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { validName, validNumbers } from "../utils";

const UserForm = (props) => {

    const navigate = useNavigate()
    
    const firstNameInput = useRef(null)
    const surnameInput = useRef(null)
    const addressInput = useRef(null)
    const postcodeInput = useRef(null)
    const phoneInput = useRef(null)

    const firstNameErr = useRef(null)
    const surnameErr= useRef(null)
    const addressErr= useRef(null)
    const postcodeErr= useRef(null)
    const phoneErr= useRef(null)


    const saveUser = (e)=>{

        e.preventDefault()

        let user = {
            firstName: firstNameInput.current.value,
            surname: surnameInput.current.value,
            address: addressInput.current.value,
            postcode: postcodeInput.current.value,
            phone: phoneInput.current.value
        }
        if(props.id != 'new'){
            user.id = props.id
        }

        if(validateUser(user)){
            props.create(user)
            navigate(props.route)
        }

    }

    const validateUser = (user)=>{
        let isValid = true

        if(!validName.test(user.firstName)){
            firstNameInput.current.className = 'form-control is-invalid'
            firstNameErr.current.className = 'invalid-feedback'
            firstNameErr.current.innerHTML = 'Names must be capitalized and only contain letters'
            isValid = false
        } else {
            firstNameInput.current.className = 'form-control is-valid'
            firstNameErr.current.className = ''
            firstNameErr.current.innerHTML = ''
        }
        if(!validName.test(user.surname)){
            surnameInput.current.className = 'form-control is-invalid'
            surnameErr.current.className = 'invalid-feedback'
            surnameErr.current.innerHTML = 'Names must be capitalized and only contain letters'
            isValid = false
        } else {
            surnameInput.current.className = 'form-control is-valid'
            surnameErr.current.className = ''
            surnameErr.current.innerHTML = ''
        }
        if(user.address.length <= 0){
            addressInput.current.className = 'form-control is-invalid'
            addressErr.current.className = 'invalid-feedback'
            addressErr.current.innerHTML = 'Please enter an address'
            isValid = false
        } else {
            addressInput.current.className = 'form-control is-valid'
            addressErr.current.className = ''
            addressErr.current.innerHTML = ''
        }
        if(user.postcode.length <= 0){
            postcodeInput.current.className = 'form-control is-invalid'
            postcodeErr.current.className = 'invalid-feedback'
            postcodeErr.current.innerHTML = 'Please enter a postal code'
            isValid = false
        } else {
            postcodeInput.current.className = 'form-control is-valid'
            postcodeErr.current.className = ''
            postcodeErr.current.innerHTML = ''
        }
        if(!validNumbers.test(user.phone)){
            phoneInput.current.className = 'form-control is-invalid'
            phoneErr.current.className = 'invalid-feedback'
            phoneErr.current.innerHTML = 'Phone numbers can only be numbers 0-9'
            isValid = false
        } else {
            phoneInput.current.className = 'form-control is-valid'
            phoneErr.current.className = ''
            phoneErr.current.innerHTML = ''
        }
        return isValid
    }


    useEffect(()=>{
        if(props.id != 'new'){
            //get data to edit
            fetchUser() 
        }
    },[])

    async function fetchUser(){
        const res = await fetch(`${props.url}/${props.id}`)
        const data = await res.json()

        firstNameInput.current.value = data.firstName
        surnameInput.current.value = data.surname
        addressInput.current.value = data.address
        postcodeInput.current.value = data.postcode
        phoneInput.current.value = data.phone

    }

    return (  
        <div className="container mt-4">
        <h2 className="ms-4">{props.title}</h2>
        <form className="col-md-10 m-auto mt-5 needs-validated" noValidate id='userForm'>
            <div className="row">
                <div className="form-group col-md-6 mt-2">
                    <input type="text" ref={firstNameInput} className="form-control" placeholder="Firstname:"></input>
                    <span ref={firstNameErr}></span>
                </div>
                <div className="form-group col-md-6 mt-2">
                    <input type="text" className="form-control" placeholder="Surname:" ref={surnameInput} required></input>
                    <span className="" id='surnameErr' ref={surnameErr}></span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-12 mt-2">
                    <input type="text" className="form-control" placeholder="Address" ref={addressInput} required/>
                    <span className="" id='addressErr' ref={addressErr}></span>
                </div>
            </div>
            <div className="row">
                 <div className="form-group col-md-6 mt-2">
                    <input type="text" className="form-control" placeholder="Postcode" ref={postcodeInput} required/>
                    <span className="" id='postcodeErr' ref={postcodeErr}></span>
                </div>
                <div className="form-group col-md-6 mt-2">
                    <input type="text" ref={phoneInput} className="form-control" placeholder="Phone:" required></input>
                    <span className="" id='phoneErr' ref={phoneErr}></span>
                </div>
            </div>
                <Link className=''to={props.route}><input className="btn btn-primary mt-2" type="button" value='Save' onClick={e=>saveUser(e)} /></Link>
        </form>
        </div>
    );
}
 
export default UserForm;