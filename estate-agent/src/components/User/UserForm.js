import { useEffect, useRef, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { PATH_IDS, validName, validNumbers } from "../utils";

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
            postCode: postcodeInput.current.value,
            phone: phoneInput.current.value
        }
        if(props.id != PATH_IDS.NEW){
            user.id = props.id
        }

        //if(validateUserFE(user)){

           props.create(user,errorReportCB)
            //navigate(props.route)
        //}

    }

    const errorReportCB = (res) =>{
        console.log('logging an error in userform')
        console.log(res)
        Object.hasOwn(res.errors,'FirstName') ?
            displayErrorOnFormField(firstNameInput,firstNameErr,res.errors.FirstName) :
            displayValidOnFormField(firstNameInput,firstNameErr)
        Object.hasOwn(res.errors,'Surname') ?
            displayErrorOnFormField(surnameInput,surnameErr,res.errors.Surname) :
            displayValidOnFormField(surnameInput,surnameErr)
        Object.hasOwn(res.errors,'Phone') ?
            displayErrorOnFormField(phoneInput,phoneErr,res.errors.Phone) :
            displayValidOnFormField(phoneInput,phoneErr)
        Object.hasOwn(res.errors,'PostCode') ?
            displayErrorOnFormField(postcodeInput,postcodeErr,res.errors.PostCode) :
            displayValidOnFormField(postcodeInput,postcodeErr)
        Object.hasOwn(res.errors,'Address') ?
            displayErrorOnFormField(addressInput,addressErr,res.errors.Address) :
            displayValidOnFormField(addressInput,addressErr)
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

    const validateUserFE = (user)=>{
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
        if(user.postCode.length <= 0){
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
        if(props.id != PATH_IDS.NEW){
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
        postcodeInput.current.value = data.postCode
        phoneInput.current.value = data.phone

    }

    return (  
        <div className="container mt-0 bg-light px-4 py-5 mb-5">
        <h2 className="ms-4 mt-5">{props.title}</h2>
        <form className="col-md-10 m-auto my-5 needs-validated pb-5 pt-3" noValidate id='userForm'>
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
            <div className="row">
                <button className="btn btn-primary mt-3 col-md-3 ms-auto me-2" type="button" onClick={e=>saveUser(e)}>Save</button>
            </div>
        </form>
        </div>
    );
}
 
export default UserForm;