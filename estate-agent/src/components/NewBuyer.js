import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import NewUserForm from "./NewUserForm"
const NewBuyer = () => {

    const URL = 'http://localhost:8081/buyer'

    const {buyerId} = useParams()

    const [buyer,setBuyer] = useState([])

    useEffect(()=>{
        if(buyerId != 'new'){
            fetch(`${URL}/${buyerId}`).then(res=>res.json().then(setBuyer))
        }
    },[])

    const createBuyer = (newBuyer)=>{
        
        // fetch(URL,{
        //         method:"POST",
        //         headers:{"Content-Type": "application/json"},
        //         body:JSON.stringify(newBuyer)
        //     })
        alert('caleld create')

    }


    return ( 
        <>
         
            {buyerId == 'new' ?
                <NewUserForm create={createBuyer} user={{}} route='/buyers' id={buyerId} />
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
                    <Link to='/buyers'><input type="button" value={buyerId == 'new' ? 'Create Buyer' : 'Save Changes'} onClick={()=>createBuyer()} /></Link>
            </form>
            }
       
        </>  
    );
}
 
export default NewBuyer;