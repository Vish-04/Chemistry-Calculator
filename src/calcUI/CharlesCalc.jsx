import '../css/CharlesCalc.css';
import { useState, useEffect } from 'react';
import CalculateCharles from '../calcFunctions/CharlesFunc';

function CharlesCalc() {
    const [tOne, setTOne] = useState("");
    const [tTwo, setTTwo] = useState("");
    const [vOne, setVOne] = useState("");
    const [vTwo, setVTwo] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [tOne, tTwo, vOne, vTwo].filter((input) => input != "");
        if (inputs.length ==3){
            setDisabled([tOne, tTwo, vOne, vTwo].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [tOne, tTwo, vOne, vTwo]);

    function handleSubmit (){
        setResult(CalculateCharles(tOne, tTwo, vOne, vTwo));
    }

  return (
    <div className='calc-container'>
        <h1>CHARLES' LAW</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='t1' className='input-label'>Temperature 1</label>
                <input id='t1' className='input' disabled={disabled == 1} placeholder='ENTER T1' onChange={(val) => { setTOne(val.target.value); }} />
                <label htmlFor='t2' className='input-label'>Temperature 2</label>
                <input id='t2' className='input' disabled={disabled == 2} placeholder='ENTER T2' onChange={(val) => { setTTwo(val.target.value); }} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='v1' className='input-label'>Volume 1</label>
                <input id='v1' className='input' disabled={disabled == 3} placeholder='ENTER V1' onChange={(val) => { setVOne(val.target.value); }} />
                <label htmlFor='v2' className='input-label'>Volume 2</label>
                <input id='v2' className='input' disabled={disabled == 4} placeholder='ENTER V2' onChange={(val) => { setVTwo(val.target.value); }} />
            </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default CharlesCalc;
