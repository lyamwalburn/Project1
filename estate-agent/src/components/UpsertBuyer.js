import { Link, useParams } from "react-router-dom"
import UserForm from "./UserForm"
const UpsertBuyer = () => {

    const URL = 'http://localhost:8081/buyer'

    const {buyerId} = useParams()

    const createBuyer = (newBuyer)=>{
        fetch(URL,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newBuyer)
            })
    }

    const EditBuyer = (buyer)=>{
        console.log(buyer)
        fetch(`${URL}/${buyer.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(buyer)
        })
    }


    return ( 
        <>
         
            {buyerId == 'new' ?
                <>
                <h2 className="mt-4">Create a new Buyer</h2>
                <UserForm create={createBuyer} type='buyer' route='/buyers' id={buyerId}/>
                </>
            :
            <>
                <h2 className="mt-4">Edit Buyer</h2>
                <UserForm create={EditBuyer} type='buyer' route='/buyers' id={buyerId} url={URL}/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertBuyer;