import '../css/AvagadroCalc.css';
import { useState, useEffect } from 'react';
import CalculateAvagadro from '../calcFunctions/AvagadroFunc';

function AvagadroCalc() {
    const [nOne, setNOne] = useState("");
    const [nTwo, setNTwo] = useState("");
    const [vOne, setVOne] = useState("");
    const [vTwo, setVTwo] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [nOne, nTwo, vOne, vTwo].filter((input) => input != "");
        if (inputs.length ==3){
            setDisabled([nOne, nTwo, vOne, vTwo].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [nOne, nTwo, vOne, vTwo]);

    function handleSubmit (){
        setResult(CalculateAvagadro(nOne, nTwo, vOne, vTwo));
    }

  return (
    <div className='calc-container'>
        <h1>AVAGADRO'S LAW</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='n1' className='input-label'>Moles 1</label>
                <input id='n1' className='input' disabled={disabled == 1} placeholder='ENTER N1' onChange={(val) => { setNOne(val.target.value); }} />
                <label htmlFor='n2' className='input-label'>Moles 2</label>
                <input id='n2' className='input' disabled={disabled == 2} placeholder='ENTER N2' onChange={(val) => { setNTwo(val.target.value); }} />
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

export default AvagadroCalc;
