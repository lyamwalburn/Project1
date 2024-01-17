import { Link, redirect, useParams,useNavigate } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, ROUTES, URLPATHS, USER_TYPE } from "../utils"
const UpsertBuyer = () => {
    const navigate = useNavigate()
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
        try{
        fetch(`${URLPATHS.BUYERS}/${buyer.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(buyer)
          }).then(res=>res.json().then(redirectIf200(res)))
        }
        catch (err){
            console.err(err)
        }
    }

    const redirectIf200 = (res)=>{
        console.log(res)
        if(res.status == 200){
            navigate('/buyers')
        }     
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