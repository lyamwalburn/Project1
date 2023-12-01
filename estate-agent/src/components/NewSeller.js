import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
const NewSeller = () => {

    const URL = 'http://localhost:8081/seller'

    const {sellerId} = useParams()

    const [seller,setSeller] = useState([])

    useEffect(()=>{
        if(sellerId != 'new'){
            fetch(`${URL}/${sellerId}`).then(res=>res.json().then(setSeller))
        }
    },[])

    const createSeller = ()=>{
        let newSeller = {
            firstName: document.getElementById('fname').value,
            surname: document.getElementById('sname').value,
            address: document.getElementById('address').value,
            postcode: document.getElementById('postcode').value,
            phone: document.getElementById('phone').value,
        }
        
        fetch(URL,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newSeller)
            })

    }


    return ( 
        <>
         
            {sellerId == 'new' ?
                <form>
                    <label>First Name:</label>
                    <input type="text" id='fname' ></input>
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
                    <Link to='/sellers'><input type="button" value={sellerId == 'new' ? 'Create Seller' : 'Save Changes'} onClick={()=>createSeller()} /></Link>
                </form>
            :
            <form>
                    <label>First Name:</label>
                    <input type="text" id='fname' ></input>
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
                    <Link to='/sellers'><input type="button" value={sellerId == 'new' ? 'Create Seller' : 'Save Changes'} onClick={()=>createSeller()} /></Link>
            </form>
            }
       
        </>  
    );
}
 
export default NewSeller;