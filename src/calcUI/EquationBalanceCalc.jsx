import '../css/EquationBalanceCalc.css';
import { useState} from 'react';
import balanceChemicalEquation from '../calcFunctions/EquationBalanceFunc';

function EquationBalanceCalc() {
    const [text, setText] = useState("");
    const [balancedEquation, setBalancedEquation] = useState({});
    function handleSubmit (){
      setBalancedEquation(balanceChemicalEquation(text));
    }

  return (
    <div className='calc-container'>
        <h1>CHEMICAL EQUATION BALANCER</h1>
        <input placeholder='Ex: CaCO3, NH4^1+, BaBr2, SO4^2-' onChange={(val)=>{setText(val.target.value);}} />

        {balancedEquation.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{balancedEquation.message}</h1>: ""}
        <button className='submit' onClick={handleSubmit}>Calculate</button>
        {!balancedEquation.error ? <h3> Balanced Chemical Equation: {balancedEquation.value}</h3> : ""}
    </div>
  );
}

export default EquationBalanceCalc;
