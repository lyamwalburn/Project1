import { Link, redirect, useParams,useNavigate } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, ROUTES, URLPATHS, USER_TYPE } from "../utils"
const UpsertBuyer = () => {
    const navigate = useNavigate()
    const {buyerId} = useParams()
    let errorCB
    const createBuyer = (newBuyer,errorReportCB)=>{
        errorCB = errorReportCB
        const token = sessionStorage.getItem("jwt")
        try{
        fetch(URLPATHS.BUYERS, {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`},
            body:JSON.stringify(newBuyer)
          }).then(res=>res.json().then(handleResponse))
        } catch(error){
            //handle errors

        }
    }

    const EditBuyer = (buyer,errorReportCB)=>{
       // console.log(buyer)
        errorCB = errorReportCB
        const token = sessionStorage.getItem("jwt")
        try{
        fetch(`${URLPATHS.BUYERS}/${buyer.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`},
            body:JSON.stringify(buyer)
          }).then(res=>res.json().then(handleResponse))
        }
        catch (err){
            //handle errors
            console.err(err)
        }
    }
    const handleResponse = (res)=>{
        console.log(res)
        switch(res.status){
            case 400 : console.log('400 response upsertseller'); errorCB(res); break;
            case 200 : redirectIf200(res); break;
            default: navigate('/buyers');
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