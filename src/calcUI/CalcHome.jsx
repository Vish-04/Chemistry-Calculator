import '../css/CalcHome.css';
import { useState, useEffect } from 'react';

function CalcHome() {
    const [submittedText, setSubmittedText] = useState("")
    function handleSubmit (){
        setSubmittedText("clicked submit");
    }

  return (
    <div className='calc-container'>
        <h1>GENERAL CALC UI</h1>
        <input placeholder='ENTER SOME CHEMISTRY' onChange={(val)=>{setSubmittedText(val.target.value);}} />
        <button className='submit' onClick={handleSubmit}>Calculate</button>
        <h3>Result:</h3>
        <h4>{submittedText}</h4>
    </div>
  );
}

export default CalcHome;
