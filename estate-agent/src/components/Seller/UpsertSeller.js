import { useNavigate, useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, ROUTES, URLPATHS, USER_TYPE, validName } from "../utils"

const UpsertSeller = () => {


    const {sellerId} = useParams()
    const navigate = useNavigate()
    const createSeller = (newSeller)=>{

        fetch(URLPATHS.SELLERS, {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(newSeller)
          })
    }

    const EditSeller = (seller)=>{
        console.log(seller)

        fetch(`${URLPATHS.SELLERS}/${seller.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(seller)
          }).then(res=>res.json().then(redirectIf200(res)))
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
                <UserForm create={createSeller} type={USER_TYPE.SELLER} route={ROUTES.SELLERS} id={sellerId} title='Create Seller' />
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