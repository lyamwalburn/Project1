import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faTree } from '@fortawesome/free-solid-svg-icons'


const PropertyCard = (props) => {

    const cardStyle = {
        width: '18rem',
    }

    return ( 
        
        <div className="card" style={cardStyle}>
            <img className="card-img-top" src={require('../img/img-missing.avif')} alt="Property Image"/>
            <div className="card-body">
                <h5 className="card-title">{props.property.address}</h5>
                <p className="card-text">{props.property.type}.</p>
            </div>
            <ul className="list-group list-group-flush">

                <li className="list-group-item"><FontAwesomeIcon icon={faBed}/>{props.property.bedroom}<FontAwesomeIcon icon={faBath}/>{props.property.bathroom}<FontAwesomeIcon icon={faTree}/>{props.property.garden}</li>
                <li className="list-group-item">{props.property.price}</li>
                <li className="list-group-item">{props.property.status}</li>
            </ul>
            <div className="card-body">
                <Link to={`/sellers/${props.property.sellerId}`} className='card-link'>Seller</Link>
                <Link to='/' className='card-link'>Manage Bookings</Link>
            </div>
        </div>
     );
}
 
export default PropertyCard;