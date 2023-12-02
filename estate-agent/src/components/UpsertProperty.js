import { useEffect, useRef, useState } from "react";

const UpsertProperty = () => {
    const [sellers,setSellers] = useState([])


    const addressInput = useRef(null)
    const postcodeInput = useRef(null)
    const valueInput = useRef(null)
    const bedroomsInput = useRef(null)
    const bathroomsInput = useRef(null)
    const typeInput = useRef(null)
    const sellerInput = useRef(null)
    const gardensInput = useRef(null)

    useEffect(()=>{
        fetch('http://localhost:8081/seller').then(res=>res.json().then(setSellers))
        console.log(sellers)
    },[])

    const createProperty = (newProperty)=>{
        fetch('http://localhost:8081/property',{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(newProperty)
            })
    }

    const saveDetails = () =>{
        let property = {
            address: addressInput.current.value,
            postcode: postcodeInput.current.value,
            type: typeInput.current.value,
            price: valueInput.current.value,
            bedroom: bedroomsInput.current.value,
            bathroom: bathroomsInput.current.value,
            garden: gardensInput.current.value,
            sellerId: sellerInput.current.value,
            status: 'FOR SALE'
        }
        createProperty(property)
    }

    return ( 
    <form>
        <label>Address:</label>
        <input type="text" placeholder="address..." ref={addressInput}/>
        <label>Postcode:</label>
        <input type="text" placeholder="postcode..." ref={postcodeInput}/>
        <label>Value:</label>
        <input type="text" placeholder="£10000..." ref={valueInput}/>
        <label>Bedrooms:</label>
        <input type="text" placeholder="bedrooms..." ref={bedroomsInput}/>
        <label>Bathrooms:</label>
        <input type="text" placeholder="bathrooms..." ref={bathroomsInput}/>
        <label>garden:</label>
        <input type="text" placeholder="garden..." ref={gardensInput}/>
        <label>Type:</label>
        
        <select ref={typeInput}>
            <option selected disabled>Property type...</option>
            <option value={'DETATCHED'}>DETATCHED</option>
            <option value={'SEMI-DETATCHED'}>SEMI-DETATCHED</option>
            <option value={'TERRACED'}>TERRRACED</option>
            <option value={'APARTMENT'}>APARTMENT</option>
        </select>
        <label>Seller</label>
        <select ref={sellerInput}>
            <option selected disabled>Seller...</option>
            {sellers.map(seller=>(
                <option value={seller.id} key={seller.id}>{`${seller.firstName} ${seller.surname}`}</option>
            ))}
        </select>
        <button onClick={()=>{saveDetails()}}>Create Property</button>
    </form> 
    );
}
 
export default UpsertProperty;