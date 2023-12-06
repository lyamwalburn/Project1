import { useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
import { validName } from "../utils"

const UpsertSeller = () => {

    const URL = 'http://localhost:8081/seller'

    const {sellerId} = useParams()

    const createSeller = (newSeller)=>{

        fetch(URL,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newSeller)
            })
    }

    const EditSeller = (buyer)=>{
        console.log(buyer)
        fetch(`${URL}/${buyer.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(buyer)
        })
    }


    return ( 
        <>
         
            {sellerId == 'new' ?
                <>
                <h2 className="mt-4">Create a new Seller</h2>
                <UserForm create={createSeller} type='seller' route='/sellers' id={sellerId}/>
                </>
            :
                <>
                <h2 className="mt-4">Edit Seller</h2>
                <UserForm create={EditSeller} type='seller' route='/sellers' id={sellerId} url={URL}/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertSeller;