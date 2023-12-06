import { Link, useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, URLPATHS } from "../utils"
const UpsertBuyer = () => {

    const {buyerId} = useParams()

    const createBuyer = (newBuyer)=>{
        fetch(URLPATHS.BUYERS,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newBuyer)
            })
    }

    const EditBuyer = (buyer)=>{
        console.log(buyer)
        fetch(`${URLPATHS.BUYERS}/${buyer.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(buyer)
        })
    }


    return ( 
        <>
         
            {buyerId == PATH_IDS.NEW ?
                <>
                <UserForm create={createBuyer} type='buyer' route='/buyers' id={buyerId} title='Create Buyer'/>
                </>
            :
            <>
                <UserForm create={EditBuyer} type='buyer' route='/buyers' id={buyerId} url={URLPATHS.BUYERS} title='Edit Buyer'/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertBuyer;