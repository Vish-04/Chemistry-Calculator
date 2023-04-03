import '../css/GLCalc.css';
import { useState, useEffect } from 'react';
import CalculateGraham from '../calcFunctions/GrahamFunc';

function GrahamCalc() {
    const [rOne, setROne] = useState("");
    const [rTwo, setRTwo] = useState("");
    const [mOne, setMOne] = useState("");
    const [mTwo, setMTwo] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [rOne, rTwo, mOne, mTwo].filter((input) => input != "");
        if (inputs.length ==3){
            setDisabled([rOne, rTwo, mOne, mTwo].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [rOne, rTwo, mOne, mTwo]);

    function handleSubmit (){
        setResult(CalculateGraham(rOne, rTwo, mOne, mTwo));
    }

  return (
    <div className='calc-container'>
        <h1>GRAHAM'S LAW</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='r1' className='input-label'>Rate 1</label>
                <input id='r1' className='input' disabled={disabled == 1} placeholder='ENTER R1' onChange={(val) => { setROne(val.target.value); }} />
                <label htmlFor='r2' className='input-label'>Rate 2</label>
                <input id='r2' className='input' disabled={disabled == 2} placeholder='ENTER R2' onChange={(val) => { setRTwo(val.target.value); }} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='m1' className='input-label'>Molecule 1 or Molar Mass 1</label>
                <input id='m1' className='input' disabled={disabled == 3} placeholder='ENTER M1' onChange={(val) => { setMOne(val.target.value); }} />
                <label htmlFor='m2' className='input-label'>Molecule 2 or Molar Mass 2</label>
                <input id='m2' className='input' disabled={disabled == 4} placeholder='ENTER M2' onChange={(val) => { setMTwo(val.target.value); }} />
            </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default GrahamCalc;
