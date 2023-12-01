import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link to='/' className="navbar-brand ms-2">B&G Estates</Link>

       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarNav">
         <ul className="navbar-nav ms-auto me-2">
           <li className="nav-item active">
                <Link to='/' className="nav-link"><span className="sr-only">Home</span></Link>
           </li>
           <li className="nav-item">
                <Link to='/sellers' className="nav-link"><span className="sr-only">Sellers</span></Link>
           </li>
           <li className="nav-item">
                <Link to='/buyers' className="nav-link"><span className="sr-only">Buyers</span></Link>
           </li>
           <li className="nav-item">
                <Link to='/properties' className="nav-link"><span className="sr-only">Properties</span></Link>
           </li>
         </ul>
       </div>
     </nav>
        
    );
}
 
export default Navbar;