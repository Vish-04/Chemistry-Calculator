import '../css/MostProbableCalc.css';
import { useState, useEffect } from 'react';
import CalculateMostProbable from '../calcFunctions/MostProbableFunc';
function MostProbableCalc() {
    const [temperature, setTemperature] = useState("");
    const [molecule, setMolecule] = useState("");
    const [mps, setMps] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [temperature, molecule, mps].filter((input) => input != "");
        if (inputs.length == 2){
            setDisabled([temperature, molecule, mps].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [temperature, molecule, mps]);

    function handleSubmit (){
        setResult(CalculateMostProbable(temperature, molecule, mps));
    }

  return (
    <div className='calc-container'>
        <h1>MOST PROBABLE SPEED</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='temperature' className='input-label'>Temperature</label>
                <input id='temperature' className='input' disabled={disabled == 1} placeholder='ENTER Temperature' onChange={(val) => { setTemperature(val.target.value); }} />
                <label htmlFor='molecule' className='input-label'>Molecular Formula or Weight (kg)</label>
                <input id='molecule' className='input' disabled={disabled == 2} placeholder='ENTER Molecule' onChange={(val) => { setMolecule(val.target.value); }} />
                <label htmlFor='mps' className='input-label'>Most Probable Speed</label>
                <input id='mps' className='input' disabled={disabled == 3} placeholder='ENTER Most Probable Speed' onChange={(val) => { setMps(val.target.value); }} />
                </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default MostProbableCalc;
