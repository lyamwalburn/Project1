import { useState } from "react";
import { Link } from "react-router-dom";
const UserTable = (props) => {

    const [userToDelete,setuserToDelete] = useState()

    return ( 
    <div className="container">
        <Link to={props.createLink}><button className="btn btn-primary m-3">Create New</button></Link>
        <table className="table table-hover">
        <thead className="thead-light">
            <tr className="table-dark text-center">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Postcode</th>
                <th scope="col">Phone</th>
                <th scope="col">Properties</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
    {props.users.map(user=>(
        <>
        <tr key={user.id} className="text-center">
            <td>{user.id}</td>
            <td>{`${user.firstName} ${user.surname}`}</td>
            <td>{user.address}</td>
            <td>{user.postcode}</td>
            <td>{user.phone}</td>
            <td><Link to={`${props.propertiesLink}${user.id}`}>Properties</Link></td>
            <td><Link to={`${props.editLink}${user.id}`}>Edit</Link></td>
            {/* <td><input type="button" value='Delete' onClick={()=>{props.removeUser(user.id)}} /></td> */}
            <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setuserToDelete(user.id)}>Delete</button></td>
        </tr>
 
   </>
    ))}
    </tbody>
    </table>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
           <div class="modal-content">
           <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Are you sure?</h5>
               <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
           </div>
           <div class="modal-body">
               This user will be permenantly deleted this cannot be undone.
           </div>
           <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
               <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{
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