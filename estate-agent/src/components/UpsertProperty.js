
import { useParams } from "react-router-dom";
import PropertyForm from "./PropertyForm";

const UpsertProperty = () => {

    const {propertyId} = useParams()

    const createProperty = (newProperty)=>{
        fetch('http://localhost:8081/property',{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newProperty)
            })
    }

    const EditProperty = (property)=>{
        console.log(property)
        fetch(`http://localhost:8081/property/${property.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(property)
        })
    }

    return ( <>
        {propertyId == 'new' ?
            <PropertyForm saveProperty={createProperty} id={propertyId}/>
        :
            <PropertyForm saveProperty={EditProperty} id={propertyId}/>
        }
        </>
    );
}
 
export default UpsertProperty;