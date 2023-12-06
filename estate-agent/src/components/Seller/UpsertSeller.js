import { useParams } from "react-router-dom"
import UserForm from "../User/UserForm"
import { PATH_IDS, ROUTES, URLPATHS, USER_TYPE, validName } from "../utils"

const UpsertSeller = () => {

    const URL = 'http://localhost:8081/seller'

    const {sellerId} = useParams()

    const createSeller = (newSeller)=>{

        fetch(URLPATHS.SELLERS,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newSeller)
            })
    }

    const EditSeller = (buyer)=>{
        console.log(buyer)
        fetch(`${URLPATHS.SELLERS}/${buyer.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(buyer)
        })
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