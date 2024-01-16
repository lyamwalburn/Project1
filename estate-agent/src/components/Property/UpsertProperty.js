
import { useParams, useNavigate } from "react-router-dom";
import PropertyForm from "./PropertyForm";
import { PATH_IDS, URLPATHS } from "../utils";

const UpsertProperty = () => {

    const {propertyId} = useParams()
    const navigate = useNavigate()

    const createProperty = (newProperty)=>{

        fetch(URLPATHS.PROPERTY,{
                mode: 'cors',
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newProperty)
            })
            navigate('/')
    }

    const EditProperty = (property)=>{
        console.log(property)
        fetch(`${URLPATHS.PROPERTY}/${property.id}`,{
            mode: 'cors',
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(property)
        })
        navigate('/')
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