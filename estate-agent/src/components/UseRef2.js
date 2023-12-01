import {useRef} from "react"
 
 
function UseRef2(){
 
    let inputID1=useRef(null)
    let inputID2=useRef(null)
    let inputID3=useRef(null)
   
 
    function add(){
   
        let num1=inputID1.current.value;
        let num2=inputID1.current.value;
       
        let R=parseInt(num1) + parseInt(num2)
          inputID3.current.value=R
 
   
    }
   
    return(
        <>
        <div >
        **********************************************************************
        <br></br>
        First number:<input type="text" ref={inputID1}/> <br/>
        Second number:<input type="text" ref={inputID2}/> <br/>
 
        <input type="button" value="+" onClick={ ()=> add()}/><br/>
        <h3>
            Result=<input type="text" ref={inputID3}/>
        </h3>
        </div>    
        **********************************************************************
        </>
    )
}
 
export default UseRef2;