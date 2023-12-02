import { Link } from "react-router-dom";
const UserTable = (props) => {
    return ( 
    <div>
        <Link to={props.createLink}><button>Create New</button></Link>
        <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Postcode</th>
                <th>Phone</th>
                <th>Properties</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
    {props.users.map(user=>(
        <tr key={user.id}>
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