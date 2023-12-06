import { useNavigate } from "react-router-dom";
import { PATH_IDS, ROUTES } from "../utils";

const QuickLinks = () => {

    const navigate = useNavigate()

    return ( 
        <div className="container col-sm-12 mt-4 mb-0 bg-dark px-4 pt-2 pb-5 text-light mb-0 rounded-top">
            <h4 className="text-light mb-3">Quick Links</h4>
             <div className="grid">
                <div className="row d-flex justify-content-center">
                    <button className='btn btn-primary col-sm-3 mx-2' onClick={()=>{navigate(`${ROUTES.SELLERS}/${PATH_IDS.NEW}`)}}>Create Seller</button>
                    <button className='btn btn-success col-sm-3 mx-2' onClick={()=>{navigate(`${ROUTES.BUYERS}/${PATH_IDS.NEW}`)}}>Create Buyer</button>
                    <button className='btn btn-warning col-sm-3 mx-2 text-dark' onClick={()=>{navigate(`${ROUTES.PROPERTIES_UPSERT}/${PATH_IDS.NEW}`)}}>Create Property</button>
                </div>    
            </div>     
        </div>
     );
}
 
export default QuickLinks;