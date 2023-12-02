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
        <form className="col-md-10 m-auto mt-5">
            <div className="row">
                <div className="form-group col-md-6 mt-2">
                    <input type="text" ref={firstNameInput} className="form-control" placeholder="Firstname:"></input>
                </div>
                <div className="form-group col-md-6 mt-2">
                    <input type="text" className="form-control" placeholder="Surname:" ref={surnameInput}></input>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-12 mt-2">
                    <input type="text" className="form-control" placeholder="Address" ref={addressInput}/>
                </div>
            </div>
            <div className="row">
                 <div className="form-group col-md-6 mt-2">
                    <input type="text" className="form-control" placeholder="Postcode" ref={postcodeInput}/>
                </div>
                <div className="form-group col-md-6 mt-2">
                    <input type="text" ref={phoneInput} className="form-control" placeholder="Phone:"></input>
                </div>
            </div>
                <Link className=''to={props.route}><input className="btn btn-primary mt-2" type="button" value='Save' onClick={()=>saveUser()} /></Link>
        </form>
    );
}
 
export default UserForm;