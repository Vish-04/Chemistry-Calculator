import '../css/VRMSCalc.css';
import { useState, useEffect } from 'react';
import CalculateVRMS from '../calcFunctions/VRMSFunc';

function VRMSCalc() {
    const [temperature, setTemperature] = useState("");
    const [molecule, setMolecule] = useState("");
    const [rms, setRms] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [temperature, molecule, rms].filter((input) => input != "");
        if (inputs.length == 2){
            setDisabled([temperature, molecule, rms].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [temperature, molecule, rms]);

    function handleSubmit (){
        setResult(CalculateVRMS(temperature, molecule, rms));
    }

  return (
    <div className='calc-container'>
        <h1>ROOT MEAN SQUARE SPEED</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='temperature' className='input-label'>Temperature</label>
                <input id='temperature' className='input' disabled={disabled == 1} placeholder='ENTER Temperature' onChange={(val) => { setTemperature(val.target.value); }} />
                <label htmlFor='molecule' className='input-label'>Molecular Formula or Weight (kg)</label>
                <input id='molecule' className='input' disabled={disabled == 2} placeholder='ENTER Molecule' onChange={(val) => { setMolecule(val.target.value); }} />
                <label htmlFor='rms' className='input-label'>Root Mean Square Speed</label>
                <input id='rms' className='input' disabled={disabled == 3} placeholder='ENTER Root Mean Square Speed' onChange={(val) => { setRms(val.target.value); }} />
                </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default VRMSCalc;
