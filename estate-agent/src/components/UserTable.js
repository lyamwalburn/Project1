import { Link } from "react-router-dom";
const UserTable = (props) => {
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
        <tr key={user.id} className="text-center">
            <td>{user.id}</td>
            <td>{`${user.firstName} ${user.surname}`}</td>
            <td>{user.address}</td>
            <td>{user.postcode}</td>
            <td>{user.phone}</td>
            <td><Link to={`${props.propertiesLink}${user.id}`}>Properties</Link></td>
            <td><Link to={`${props.editLink}${user.id}`}>Edit</Link></td>
            <td><input type="button" value='Delete' onClick={()=>{props.removeUser(user.id)}} /></td>
        </tr>
    ))}
    </tbody>
    </table>
    </div> 
);
}
 
export default UserTable;