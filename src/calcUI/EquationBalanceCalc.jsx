import '../css/EquationBalanceCalc.css';
import { useState, useEffect } from 'react';
import balanceChemicalEquation from '../calcFunctions/EquationBalanceFunc';

function EquationBalanceCalc() {
    const [text, setText] = useState("");
    const [molarMassText, setMolarMassText] = useState("");
    function handleSubmit (){
      let coefficients = balanceChemicalEquation(text);
      console.log(coefficients);
    }

  return (
    <div className='calc-container'>
        <h1>Chemical Equation Balance</h1>
        <input placeholder='Ex: CaCO3, NH4^1+, BaBr2, SO4^2-' onChange={(val)=>{setText(val.target.value);}} />
        <button className='submit' onClick={handleSubmit}>Calculate</button>
        {/* {text ? <h3>Calculated Molar Mass: {molarMassText}</h3>: null} */}
    </div>
  );
}

export default EquationBalanceCalc;
