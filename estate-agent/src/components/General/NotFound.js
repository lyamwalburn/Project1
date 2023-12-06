import QuickLinks from "./QuickLinks";

const NotFound = () => {
    return ( 
    <div className="container">
        <h2 className="col-12">Sorry, we couldn't find that are you looking for any of the below?</h2>
        <div className="row">
        <QuickLinks />
        </div>
    </div> );
}
 
export default NotFound;