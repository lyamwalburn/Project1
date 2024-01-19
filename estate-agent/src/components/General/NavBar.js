
import { Link } from "react-router-dom";

const NavBar = () => {

  const t = sessionStorage.getItem("jwt")
  const signOut = ()=>{
    sessionStorage.removeItem("jwt")
  }


  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link to="/" className="navbar-brand text-white ms-2">B&G Estate</Link>
          </div>
          <div className="navbar-nav ms-auto me-2">
          <Link to='/' className="nav-item nav-link">Search Properties</Link>
          <Link to='/sellers' className="nav-item nav-link">Sellers</Link>
          <Link to='/buyers' className="nav-item nav-link">Buyers</Link>
          <Link to='/properties' className="nav-item nav-link">Sold Properties</Link>
          <Link to='/properties/withdrawn' className="nav-item nav-link">Withdrawn Properties</Link>

          <Link to='/signin' className="nav-item nav-link">Sign In</Link> 
          <button className="nav-item nav-link" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </nav>
      <div className="mt-5"></div>
    </>
  );
};
 
export default NavBar;

{/* <Link to='/' className="nav-item nav-link"><span className="sr-only">Home</span></Link>

<Link to='/sellers' className="nav-item nav-link"><span className="sr-only">Sellers</span></Link>


<Link to='/buyers' className="nav-item nav-link"><span className="sr-only">Buyers</span></Link>


<Link to='/properties' className="nav-item nav-link"><span className="sr-only">Properties</span></Link> */}