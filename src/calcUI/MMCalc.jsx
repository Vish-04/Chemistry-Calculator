import '../css/MMCalc.css';
import { useState, useEffect } from 'react';
import calculateMolarMass from '../calcFunctions/MMFunc';

function MMCalc() {
    const [text, setText] = useState("");
    const [molarMassText, setMolarMassText] = useState("");
    let mm  = 0;
    function handleSubmit (){
      mm = calculateMolarMass(text);
      setMolarMassText(mm.toString());
    }

  return (
    <div className='calc-container'>
        <h1>Molar Mass Calculator</h1>
        <input placeholder='Ex: CaCO3, NH4^1+, BaBr2, SO4^2-' onChange={(val)=>{setText(val.target.value);}} />
        <button className='submit' onClick={handleSubmit}>Calculate</button>
        {text ? <h3>Calculated Molar Mass: {molarMassText} g/mol</h3>: null}
    </div>
  );
}

export default MMCalc;
