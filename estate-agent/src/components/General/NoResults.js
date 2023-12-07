import { useNavigate } from "react-router";

const NoResults = () => {

    const navigate = useNavigate()
    return ( 
        <div className="container py-5">
        <h2 className="py-5">Sorry we couldn't find anything matching your criteria</h2>
        <p className="py-5 mb-5">At this time there are no sold properites to display. Our agents are constantly making moves in the market so try back here again soon!</p>
        <button className="btn btn-primary btn-lg mb-5" onClick={()=>{navigate('/')}}>Go Home</button>
    </div>
     );
}
 
export default NoResults;