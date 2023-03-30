import '../css/MMCalc.css';
import { useState, useEffect } from 'react';
import calculateMolarMass from '../calcFunctions/MMFunc';

function MMCalc() {
    const [text, setText] = useState("CaCO3");
    const [molarMassText, setMolarMassText] = useState("");
    let mm  = 0;
    function handleSubmit (){
      mm = calculateMolarMass(text);
      setMolarMassText(mm.toString());
    }

  return (
    <div className='calc-container'>
        <h1>Molar Mass Calculator</h1>
        <input placeholder='Ex: CaCO3, NH4NO2, BaBr2' onChange={(val)=>{setText(val.target.value);}} />
        <button className='submit' onClick={handleSubmit}>Calculate</button>
        <h3>Calculated Molar Mass:</h3>
        <h4>{molarMassText}</h4>
    </div>
  );
}

export default MMCalc;
