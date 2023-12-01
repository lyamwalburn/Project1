import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Buyers = () => {

    const [buyers,setBuyers] = useState([])
    const URL = 'http://localhost:8081/buyer'

    useEffect(()=>{
        fetchBuyers()
    },[])

    const fetchBuyers = ()=>{
        fetch(URL).then(res=>res.json().then(setBuyers))
    }

    const deleteBuyer = (id)=>{
        fetch(`${URL}/${id}`,{
            method:"delete"
        }).then(fetchBuyers)
    }

    return ( 
        <div>
            <Link to='/buyers/new'><button>New Buyer</button></Link>
            <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postcode</th>
                    <th>Phone</th>
                    <th>Bought Properties</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
        {buyers.map(buyer=>(
            <tr key={buyer.id}>
                <td>{buyer.id}</td>
                <td>{`${buyer.firstName} ${buyer.surname}`}</td>
                <td>{buyer.address}</td>
                <td>{buyer.postcode}</td>
                <td>{buyer.phone}</td>
                <td><Link to={`/properties/buyer/${buyer.id}`}>Properties</Link></td>
                <td>EditBtn</td>
                <td><input type="button" value='Delete' onClick={()=>{deleteBuyer(buyer.id)}} /></td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
}
 
export default Buyers;