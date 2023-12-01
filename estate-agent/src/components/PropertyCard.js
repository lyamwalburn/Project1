import { Link } from 'react-router-dom';

const PropertyCard = (props) => {

    const cardStyle = {
        width: '18rem',
    }

    return ( 
        
        <div class="card" style={cardStyle}>
            <img className="card-img-top" src={require('../img/img-missing.avif')} alt="Property Image"/>
            <div className="card-body">
                <h5 className="card-title">{props.property.address}</h5>
                <p className="card-text">{props.property.type}.</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
                <Link to={`/sellers/${props.property.sellerId}`} className='card-link'>Seller</Link>
                <Link to='/' className='card-link'>Manage Bookings</Link>
            </div>
        </div>
     );
}
 
export default PropertyCard;