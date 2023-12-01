import { useReducer } from "react";


function myreducer(state1,action1){
    switch(parseInt(action1.type)){
        case 1: return 'Andy'
        case 1: return 'shafeeq'
        case 1: return 'james'
        case 1: return 'peter'
        default: return ''
    }
}

const UseReducerEx = () => {
    let [trainer,dispatch1]=useReducer(myreducer,'shafeeq')

    return ( 
        <>
        Trainer:{trainer}
        <br/>
        <button onClick={()=> dispatch1({type:'1'})}>Jave</button><br/>
        <button onClick={()=> dispatch1({type:'2'})}>c#</button><br/>
        <button onClick={()=> dispatch1({type:'3'})}>html</button><br/>
        <button onClick={()=> dispatch1({type:'4'})}>sql</button><br/>
        </> );
}
 
export default UseReducerEx;

