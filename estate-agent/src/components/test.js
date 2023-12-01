function Test(){
    function add(){
        let num1=document.getElementById("t1").value
        let num2=document.getElementById("t2").value
        alert(num1+".."+num2)
    }
   
    return(
        <>
        First number:<input type="text" id="t1" /> <br/>
        Second number:<input type="text" id="t2" /> <br/>
 
        <input type="button" value="+" onClick={ ()=> add()}/><br/>
 
   
        </>
    )
}
 
export default Test