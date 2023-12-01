import { useState } from "react";
import {Link} from 'react-router-dom'

const NewUserForm = (props) => {

    const [user,setUser] = useState({})

    // let newBuyer = {
    //     firstName: document.getElementById('fname').value,
    //     surname: document.getElementById('sname').value,
    //     address: document.getElementById('address').value,
    //     postcode: document.getElementById('postcode').value,
    //     phone: document.getElementById('phone').value,
    // }

    return (  
        <form>
            <label>First Name:</label>
            <input type="text" id='fname'></input>
            <br/>
            <label>Surname:</label>
            <input type="text" id='sname'></input>
            <br/>
            <label>Address:</label>
            <input type="text" id='address'></input>
            <br/>
            <label>Postcode:</label>
            <input type="text" id='postcode'></input>
            <br/>
            <label>Phone:</label>
            <input type="text" id='phone'></input>
            <br/>
            <Link to={props.route}><input type="button" value={props.id == 'new' ? 'Create Buyer' : 'Save Changes'} onClick={()=>props.createUser(user)} /></Link>
        </form>
    );
}
 
export default NewUserForm;