
import { useParams, useNavigate } from "react-router-dom";
import PropertyForm from "./PropertyForm";
import { PATH_IDS, URLPATHS } from "../utils";

const UpsertProperty = () => {

    const {propertyId} = useParams()
    const navigate = useNavigate()
    let errorCB
    const createProperty = (newProperty,errorReportCB)=>{
        errorCB = errorReportCB
        const token = sessionStorage.getItem("jwt")

        fetch(URLPATHS.PROPERTY, {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`},
            body:JSON.stringify(newProperty)
        })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log(res)
                res.json().then(handleResponse)
            }
        })
        .catch(catchError)
    }

    const EditProperty = (property,errorReportCB)=>{
        errorCB = errorReportCB
        const token = sessionStorage.getItem("jwt")
        fetch(`${URLPATHS.PROPERTY}/${property.id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`},
            body:JSON.stringify(property)
        })
        .then(res => {
            if(res.status != 200){
                catchError(res)
            } else {
                console.log('editseller try handle response')
                console.log(res)
                res.json().then(handleResponse)
            }
        })
        .catch(catchError)
    }

    const catchError = (res)=>{
        if(res.status == 401){
            navigate('/signin')
        }
        if(res.status == 400){
            console.log('400 response upsertseller'); res.json().then(errorCB);
        }
    }

    const handleResponse = (res)=>{
        console.log(res)
        switch(res.status){
            case 400 : console.log('400 response upsertProperty'); errorCB(res); break;
            case 200 : redirectIf200(res); break;
            default: navigate('/');
        }
    }

    
    const redirectIf200 = (res)=>{
        console.log(res)
        if(res.status == 200){
            navigate('/')
        }     
    }

    return ( <>
        {propertyId == PATH_IDS.NEW ?
            <PropertyForm saveProperty={createProperty} id={propertyId} title="Create Property"/>
        :
            <PropertyForm saveProperty={EditProperty} id={propertyId} title="Edit Property"/>
        }
        </>
    );
}
 
export default UpsertProperty;