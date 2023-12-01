const PropertyRow = (props) => {
    return ( 
        <tr>
            <td>{props.property.id}</td>
                <td>{props.property.address}</td>
                <td>{props.property.postcode}</td>
                <td>{props.property.type}</td>
                <td>{props.property.price}</td>
                <td>{props.property.bedroom}</td>
                <td>{props.property.bathroom}</td>
                <td>{props.property.garden}</td>
                <td>{props.property.sellerId}</td>
                <td>{props.property.status}</td>
                <td>{props.property.buyerId}</td>
                
           <td><input type="button" value='Delete' onClick={()=>{props.delete(props.property.id)}} /></td> 
        </tr>
     );
}
 
export default PropertyRow;