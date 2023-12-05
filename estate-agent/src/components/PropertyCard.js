import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faTree } from '@fortawesome/free-solid-svg-icons'
import { useId } from 'react';


const PropertyCard = (props) => {

    const cardStyle = {
        width: '20rem',
    }

    let id = useId()
    return ( 
        <>
        <div className="card m-2 text-center" style={cardStyle} key={id}>
            <img className="card-img-top" src={require('../img/img-missing.avif')} alt="Property Image"/>
            <div className="card-body">
                <h5 className="card-title">{props.property.address}</h5>
                <p className="card-text">{props.property.type}.</p>
            </div>
            
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-center" key={id+1}>
                    <span className='p-1 mx-2'><FontAwesomeIcon icon={faBed} className='me-2'/>{props.property.bedroom}</span>
                    <span className='p-1 mx-2'><FontAwesomeIcon icon={faBath} className='me-2'/>{props.property.bathroom}</span>
                    <span className='p-1 mx-2'><FontAwesomeIcon icon={faTree} className='me-2'/>{props.property.garden}</span>
                </li>
                <li className="list-group-item" key={id+2}>{props.property.price}</li>
                <li className="list-group-item" key={id+3}>{props.property.status}</li>
            </ul>
            <div className="card-body">
                <Link to={`/sellers/${props.property.sellerId}`} className='card-link'>Seller</Link>
                <Link to={`/properties/manage/${props.property.id}`} className='card-link'>Manage Property</Link>
                <Link to={`/properties/upsert/${props.property.id}`} className='card-link'>Edit Details</Link>
            </div>
        </div>
        </>
     );
}
 
export default PropertyCard;