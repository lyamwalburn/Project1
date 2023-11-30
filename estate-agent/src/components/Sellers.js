import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sellers = () => {

    const [sellers,setSellers] = useState([])
    const URL = 'http://localhost:8081/seller'

    useEffect(()=>{
        fetchSellers()
    },[])

    const fetchSellers = ()=>{
        fetch(URL).then(res=>res.json().then(setSellers))
    }

    const deleteSeller = (id)=>{
        fetch(`${URL}/${id}`,{
            method:"delete"
        }).then(fetchSellers)
    }

    return ( 
        <div>
            <Link to='/sellers/new'><button>New Seller</button></Link>
            <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postcode</th>
                    <th>Phone</th>
                    <th>Properties</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
        {sellers.map(seller=>(
            <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{`${seller.firstName} ${seller.surname}`}</td>
                <td>{seller.address}</td>
                <td>{seller.postcode}</td>
                <td>{seller.phone}</td>
                <td><Link to={`/properties/${seller.id}`}>Properties</Link></td>
                <td>EditBtn</td>
                <td><input type="button" value='Delete' onClick={()=>{deleteSeller(seller.id)}} /></td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
}
 
export default Sellers;