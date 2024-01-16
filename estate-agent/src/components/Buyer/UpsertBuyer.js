import { Link, useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, ROUTES, URLPATHS, USER_TYPE } from "../utils"
const UpsertBuyer = () => {

    const {buyerId} = useParams()

    const createBuyer = (newBuyer)=>{
        fetch(URLPATHS.BUYERS, {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(newBuyer)
          })
    }

    const EditBuyer = (buyer)=>{
        console.log(buyer)
        fetch(`${URLPATHS.BUYERS}/${buyer.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(buyer)
          })
    }


    return ( 
        <>
         
            {buyerId == PATH_IDS.NEW ?
                <>
                <UserForm create={createBuyer} type={USER_TYPE.BUYER} route={ROUTES.BUYERS} id={buyerId} title='Create Buyer'/>
                </>
            :
            <>
                <UserForm create={EditBuyer} type={USER_TYPE.BUYER} route={ROUTES.BUYERS} id={buyerId} url={URLPATHS.BUYERS} title='Edit Buyer'/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertBuyer;