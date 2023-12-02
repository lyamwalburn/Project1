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
    <form className="col-md-10 m-auto mt-4 px-5">
        <div className="row">
            <div className="col-md-7 mt-2">
                <input type="text" className="form-control" placeholder="Address" ref={addressInput}/>
            </div>
            <div className="col-md-5 mt-2">
                <input type="text" className="form-control" placeholder="Postcode" ref={postcodeInput}/>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-4 mt-3">
                <input type="text" className="form-control" placeholder="Bedrooms" ref={bedroomsInput}/>
            </div>
            <div className="col-md-4 mt-3">
                <input type="text" className="form-control" placeholder="Bathrooms" ref={bathroomsInput}/>
            </div>
            <div className="col-md-4 mt-3">
                <input type="text" className="form-control" placeholder="Gardens" ref={gardensInput}/>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-4 mt-3"> 
                <input type="text" className="form-control" placeholder="Value" ref={valueInput}/>
            </div>
            <div className="form-group col-md-4 mt-3">
                <select ref={typeInput} className="form-select">
                    <option selected disabled>Property type...</option>
                    <option value={'DETATCHED'}>DETATCHED</option>
                    <option value={'SEMI-DETATCHED'}>SEMI-DETATCHED</option>
                    <option value={'TERRACED'}>TERRRACED</option>
                    <option value={'APARTMENT'}>APARTMENT</option>
                </select>
            </div>
            <div className="form-group col-md-4 mt-3">
                <select ref={sellerInput} className="form-select">
                    <option selected disabled>Seller</option>
                    {sellers.map(seller=>(
                    <option value={seller.id} key={seller.id}>{`${seller.firstName} ${seller.surname}`}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="row">
            <button className="btn btn-primary mt-3 col-md-3 ms-auto me-2" onClick={()=>{saveDetails()}}>Create Property</button>
        </div>
    </form> 
    );
}
 
export default UpsertProperty;