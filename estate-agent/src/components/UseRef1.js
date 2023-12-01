import {useRef} from "react"
 
 
function UseRef1(){
 
    let inputRef=useRef(null)
 
    function dosomeThing(){
        let id=inputRef.current.value
        inputRef.current.value= inputRef.current.value + "*"
        inputRef.current.focus()
        inputRef.current.style.color="red"
       
    }
    return (
        <>
 
        Enter Value:<input
                type="text"
                ref={inputRef}
                />
        <input type="Button" value="Click it "
                onClick={()=>dosomeThing()}/>
 
 
 
        </>
    )
 
}
 
export default UseRef1;