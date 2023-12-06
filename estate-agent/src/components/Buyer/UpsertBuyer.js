import { Link, useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
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
                <UserForm create={createBuyer} type='buyer' route='/buyers' id={buyerId} title='Create Buyer'/>
                </>
            :
            <>
                <UserForm create={EditBuyer} type='buyer' route='/buyers' id={buyerId} url={URL} title='Edit Buyer'/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertBuyer;