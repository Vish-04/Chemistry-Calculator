import '../css/BoyleCalc.css';
import { useState, useEffect } from 'react';
import CalculateBoyle from '../calcFunctions/BoyleFunc';

function BoyleCalc() {
    const [pOne, setPOne] = useState("");
    const [pTwo, setPTwo] = useState("");
    const [vOne, setVOne] = useState("");
    const [vTwo, setVTwo] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [pOne, pTwo, vOne, vTwo].filter((input) => input != "");
        if (inputs.length ==3){
            setDisabled([pOne, pTwo, vOne, vTwo].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [pOne, pTwo, vOne, vTwo]);

    function handleSubmit (){
        setResult(CalculateBoyle(pOne, pTwo, vOne, vTwo));
    }

  return (
    <div className='calc-container'>
        <h1>BOYLE'S LAW</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='pressure1' className='input-label'>Pressure 1</label>
                <input id='pressure1' className='input' disabled={disabled == 1} placeholder='ENTER P1' onChange={(val) => { setPOne(val.target.value); }} />
                <label htmlFor='pressure2' className='input-label'>Pressure 2</label>
                <input id='pressure2' className='input' disabled={disabled == 2} placeholder='ENTER P2' onChange={(val) => { setPTwo(val.target.value); }} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='volume1' className='input-label'>Volume 1</label>
                <input id='volume1' className='input' disabled={disabled == 3} placeholder='ENTER V1' onChange={(val) => { setVOne(val.target.value); }} />
                <label htmlFor='volume2' className='input-label'>Volume 2</label>
                <input id='volume2' className='input' disabled={disabled == 4} placeholder='ENTER V2' onChange={(val) => { setVTwo(val.target.value); }} />
            </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default BoyleCalc;
