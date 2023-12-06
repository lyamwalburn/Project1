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
                <UserForm create={createSeller} type='seller' route='/sellers' id={sellerId} title='Create Seller' />
                </>
            :
                <>
                <UserForm create={EditSeller} type='seller' route='/sellers' id={sellerId} url={URL} title='Edit Seller'/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertSeller;