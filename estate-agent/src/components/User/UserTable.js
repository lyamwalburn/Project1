import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_TYPE } from "../utils";
const UserTable = (props) => {

    const [userToDelete,setuserToDelete] = useState()
    const navigate = useNavigate()
    let id = useId()

    return ( 
    <div className="container px-4 py-5 bg-light text-dark">
        {props.type == USER_TYPE.SELLER ?
        <h2 className="mb-4">All Sellers</h2> :
        <h2 className="mb-4">All Buyers</h2>
        }
        <table className="table table-hover">
        <thead className="thead-light">
            <tr className="table-dark text-center">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Postcode</th>
                <th scope="col">Phone</th>
                <th scope="col">Operations</th>

            </tr>
        </thead>
        <tbody>
    {props.users.map(user=>(
        <tr key={id+user.id} className="text-center">
            <td key={id+1}>{user.id}</td>
            <td key={id+2}>{`${user.firstName} ${user.surname}`}</td>
            <td key={id+3}>{user.address}</td>
            <td key={id+4}>{user.postcode}</td>
            <td key={id+5}>{user.phone}</td>
            <td key={id+6} className="col-sm-4 mx-auto">
                <div className="row d-flex justify-content-center">
                            <button className="btn btn-primary col-lg-3 m-1 " onClick={()=>{navigate(`${props.propertiesLink}${user.id}`)}}>Properties</button>
                            <button className="btn btn-warning m-1 col-lg-3" onClick={()=>{navigate(`${props.editLink}${user.id}`)}}>Edit</button>
                             
            {/* <td><input type="button" value='Delete' onClick={()=>{props.removeUser(user.id)}} /></td> */}
                            <button type="button" className="btn btn-danger col-lg-3 m-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={()=>setuserToDelete(user.id)}>Delete</button>
                            </div>
            </td>
        </tr>
    ))}
    </tbody>
    </table>
    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
       <div className="modal-dialog" role="document">
           <div className="modal-content">
           <div className="modal-header">
               <h5 className="modal-title" id="deleteModalLabel">Are you sure?</h5>
               <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
           </div>
           <div className="modal-body">
               This user will be permenantly deleted this cannot be undone.
           </div>
           <div className="modal-footer">
               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
               <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{
                props.removeUser(userToDelete) 
                }}>Confirm Delete</button>
           </div>
           </div>
       </div>
   </div>

    </div> 
);
}
 
export default UserTable;