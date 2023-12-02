import { useEffect, useRef } from "react";
import {Link} from 'react-router-dom'

const UserForm = (props) => {

    
    const firstNameInput = useRef(null)
    const surnameInput = useRef(null)
    const addressInput = useRef(null)
    const postcodeInput = useRef(null)
    const phoneInput = useRef(null)

    const saveUser = ()=>{
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
        props.create(user)
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
        <form>
            <label>First Name:</label>
            <input type="text" ref={firstNameInput}></input>
            <br/>
            <label>Surname:</label>
            <input type="text" ref={surnameInput}></input>
            <br/>
            <label>Address:</label>
            <input type="text" ref={addressInput}></input>
            <br/>
            <label>Postcode:</label>
            <input type="text" ref={postcodeInput}></input>
            <br/>
            <label>Phone:</label>
            <input type="text" ref={phoneInput}></input>
            <br/>
            <Link to={props.route}><input type="button" value='Save' onClick={()=>saveUser()} /></Link>
        </form>
    );
}
 
export default UserForm;