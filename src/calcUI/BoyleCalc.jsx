import '../css/BoyleCalc.css';
import { useState, useEffect } from 'react';

function BoyleCalc() {
    const [pOne, setPOne] = useState("");
    const [pTwo, setPTwo] = useState("");
    const [vvOne, setVOne] = useState("");
    const [vTwo, setVTwo] = useState("");
    function handleSubmit (){
        
    }

  return (
    <div className='calc-container'>
        <h1>BOYLE'S LAW</h1>
        <div className='input-container'>
            <div>
                <input className='input' placeholder='ENTER P1' onChange={(val)=>{setPOne(val.target.value);}} />               
                <input className='input' placeholder='ENTER P2' onChange={(val)=>{setPTwo(val.target.value);}} />
            </div>
            <div>
                <input className='input' placeholder='ENTER V1' onChange={(val)=>{setVOne(val.target.value);}} />
                <input className='input' placeholder='ENTER V2' onChange={(val)=>{setVTwo(val.target.value);}} />
            </div>
        </div>
        
        <button className='submit' onClick={handleSubmit}>Calculate</button>
        <h3>Result:</h3>
    </div>
  );
}

export default BoyleCalc;
