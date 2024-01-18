import { useRef } from "react";
import { useNavigate} from 'react-router-dom'
import { URLPATHS } from "../utils";

const SignIn = () => {

    const navigate = useNavigate()
    
    const usernameInput = useRef(null)
    const passwordInput = useRef(null)

    const usernameErr = useRef(null)
    const passwordErr= useRef(null)

    const fetchLogin = (user)=>{
        try{
        fetch(`${URLPATHS.BASE}/user/login`, {
            mode: 'cors',
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(user)
          }).then(res=>res.json().then(tryStoreJWT))
        }
        catch(err){
            console.log(err.message)
            //handle errors
        }
    }

    const login = (e)=>{
        e.preventDefault()
        console.log(`logging in with ${usernameInput.current.value} and ${passwordInput.current.value}`)
        let user = {
            pasword: passwordInput.current.value,
            username: usernameInput.current.value
        }
        fetchLogin(user)
    }

    const tryStoreJWT = (res)=>{
        if(res.data.autorizationToken){
            console.log(`token data :${res.data.autorizationToken}`)
            const jwtToken = res.data.authorizationToken
            if(jwtToken){
                sessionStorage.setItem("jwt",jwtToken)
                navigate('/')       
            }
        }
    }

    return ( 
        <div className="container mt-0 bg-light px-4 py-5 mb-5">
        <h2 className="ms-4 mt-5">Sign In to B&G Estates</h2>
        <form className="col-md-10 m-auto my-5 needs-validated pb-5 pt-3" noValidate id='userForm'>
            <div className="row">
                <div className="form-group col-md-12 mt-2">
                    <input type="text" ref={usernameInput} className="form-control" placeholder="Username:"></input>
                    <span ref={usernameErr}></span>
                </div>
                <div className="form-group col-md-12 mt-2">
                    <input type="password" className="form-control" placeholder="Password:" ref={passwordInput} required></input>
                    <span className="" id='surnameErr' ref={passwordErr}></span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mt-3 col-md-6" type="button" onClick={e=>login(e)}>Login</button>
            </div>
        </form>
        </div>
    );
}
 
export default SignIn;