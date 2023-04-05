import '../css/MeanSpeedCalc.css';
import { useState, useEffect } from 'react';
import CalculateMeanSpeed from '../calcFunctions/MeanSpeedFunc';

function MeanSpeedCalc() {
    const [temperature, setTemperature] = useState("");
    const [molecule, setMolecule] = useState("");
    const [ms, setMs] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [temperature, molecule, ms].filter((input) => input != "");
        if (inputs.length == 2){
            setDisabled([temperature, molecule, ms].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [temperature, molecule, ms]);

    function handleSubmit (){
        setResult(CalculateMeanSpeed(temperature, molecule, ms));
    }

  return (
    <div className='calc-container'>
        <h1>MEAN SPEED</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='temperature' className='input-label'>Temperature</label>
                <input id='temperature' className='input' disabled={disabled == 1} placeholder='ENTER Temperature' onChange={(val) => { setTemperature(val.target.value); }} />
                <label htmlFor='molecule' className='input-label'>Molecular Formula or Weight (kg)</label>
                <input id='molecule' className='input' disabled={disabled == 2} placeholder='ENTER Molecule' onChange={(val) => { setMolecule(val.target.value); }} />
                <label htmlFor='ms' className='input-label'>Mean Speed</label>
                <input id='ms' className='input' disabled={disabled == 3} placeholder='ENTER Mean Speed' onChange={(val) => { setMs(val.target.value); }} />
                </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default MeanSpeedCalc;
