import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faTree, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import { useId } from 'react';
import { SALESTATUS } from '../utils';


const PropertyCard = (props) => {

    const cardStyle = {
        width: '18rem',
        boxShadow: '7px 8px 19px -2px rgba(0,0,0,0.49)',
    }

    const imgStyle = {
        height: '12rem',
    }

    const soldStyle = {
        filter: 'grayscale(100%)',
        height: '12rem',
    }

    const linkStyle = {
        textDecoration: 'none',
    }

    let id = useId()
    return ( 
        <>
        <div className="card m-3 text-center  p-0" style={cardStyle} key={id}>
            <img className="card-img-top p-0" style={props.property.status == SALESTATUS.FORSALE ? imgStyle : soldStyle} src={props.property.image == null ? require('../../img/img-missing.avif') : require(`../../img/${props.property.image}`)} alt="Property Image"/>
            <div className="card-body">
                <h5 className="card-title">{props.property.address}</h5>
                <p className="card-text">{props.property.type}.</p>
            </div>
            
            <ul className="list-group list-group-flush p-2">
                <li className="list-group-item d-flex justify-content-center" key={id+1}>
                    <span className='p-1 mx-2'><FontAwesomeIcon icon={faBed} className='me-2'/>{props.property.bedroom}</span>
                    <span className='p-1 mx-2'><FontAwesomeIcon icon={faBath} className='me-2'/>{props.property.bathroom}</span>
                    <span className='p-1 mx-2'><FontAwesomeIcon icon={faTree} className='me-2'/>{props.property.garden}</span>
                </li>
                <li className="list-group-item" key={id+2}><b>{`£${Number(props.property.price).toLocaleString('en')}`}</b></li>
                {props.property.status == SALESTATUS.FORSALE ? 
                <Link to={`/properties/manage/${props.property.id}`} className='card-link' style={linkStyle}>
                    <li className="list-group-item bg-success text-light fw-bold rounded" key={id+3}>{props.property.status}</li>
                </Link>
                :
                <Link to={`/properties/manage/${props.property.id}`} className='card-link' style={linkStyle}>
                    <li className="list-group-item bg-danger text-light fw-bold rounded" key={id+3}>{props.property.status}</li>
                </Link>
                }
            </ul>
            <div className="card-body">
                <Link to={`/sellers/${props.property.sellerId}`} className='card-link' >
                    <button className='btn btn-primary col-md-4'><FontAwesomeIcon icon={faUser} /></button>
                </Link>
                <Link to={`/properties/upsert/${props.property.id}`} className='card-link'>
                    <button className='btn btn-warning col-md-4'><FontAwesomeIcon icon={faPenToSquare} /></button>
                </Link>
            </div>
        </div>
        </>
     );
}
 
export default PropertyCard;