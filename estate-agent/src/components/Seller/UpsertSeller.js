import { useNavigate, useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, ROUTES, URLPATHS, USER_TYPE, validName } from "../utils"
import { useState } from "react"

const UpsertSeller = () => {


    const {sellerId} = useParams()
    const navigate = useNavigate()
    const [errors,setErrors] = useState([])
    let errorCB
    const createSeller = (newSeller,errorReportCB)=>{
        errorCB = errorReportCB
        fetch(URLPATHS.SELLERS, {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(newSeller)
          }).then(res=>res.json().then(handleResponse))
    }

    const EditSeller = (seller,errorReportCB)=>{
        console.log(seller)
        errorCB = errorReportCB
        fetch(`${URLPATHS.SELLERS}/${seller.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(seller)
          }).then(res=>res.json().then(handleResponse))
    }

    const handleResponse = (res)=>{
        console.log(res)
        switch(res.status){
            case 400 : console.log('400 response upsertseller'); errorCB(res); break;
            case 200 : redirectIf200(res); break;
            default: navigate('/sellers');
        }
    }

    
    const redirectIf200 = (res)=>{
        console.log(res)
        if(res.status == 200){
            navigate('/sellers')
        }     
    }

    return ( 
        <>
         
            {sellerId == PATH_IDS.NEW ?
                <>
                <UserForm create={createSeller} type={USER_TYPE.SELLER} route={ROUTES.SELLERS} id={sellerId} title='Create Seller' errors={errors}/>
                </>
            :
                <>
                <UserForm create={EditSeller} type={USER_TYPE.SELLER} route={ROUTES.SELLERS} id={sellerId} url={URLPATHS.SELLERS} title='Edit Seller'/>
                </>
            }
       
        </>  
    );
}
 
export default UpsertSeller;