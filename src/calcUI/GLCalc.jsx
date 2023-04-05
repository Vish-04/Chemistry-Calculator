import '../css/GLCalc.css';
import { useState, useEffect } from 'react';
import CalculateGL from '../calcFunctions/GLFunc';

function GLCalc() {
    const [tOne, setTOne] = useState("");
    const [tTwo, setTTwo] = useState("");
    const [pOne, setPOne] = useState("");
    const [pTwo, setPTwo] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [tOne, tTwo, pOne, pTwo].filter((input) => input != "");
        if (inputs.length ==3){
            setDisabled([tOne, tTwo, pOne, pTwo].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [tOne, tTwo, pOne, pTwo]);

    function handleSubmit (){
        setResult(CalculateGL(tOne, tTwo, pOne, pTwo));
    }

  return (
    <div className='calc-container'>
        <h1>GAY LUSSAC'S LAW</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='t1' className='input-label'>Temperature 1</label>
                <input id='t1' className='input' disabled={disabled == 1} placeholder='ENTER T1' onChange={(val) => { setTOne(val.target.value); }} />
                <label htmlFor='t2' className='input-label'>Temperature 2</label>
                <input id='t2' className='input' disabled={disabled == 2} placeholder='ENTER T2' onChange={(val) => { setTTwo(val.target.value); }} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='p1' className='input-label'>Pressure 1</label>
                <input id='p1' className='input' disabled={disabled == 3} placeholder='ENTER P1' onChange={(val) => { setPOne(val.target.value); }} />
                <label htmlFor='p2' className='input-label'>Pressure 2</label>
                <input id='p2' className='input' disabled={disabled == 4} placeholder='ENTER P2' onChange={(val) => { setPTwo(val.target.value); }} />
            </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default GLCalc;
