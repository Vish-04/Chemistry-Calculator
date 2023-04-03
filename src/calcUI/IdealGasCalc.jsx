import '../css/IdealGasCalc.css';
import { useState, useEffect } from 'react';
import CalculateIdealGas from '../calcFunctions/IdealGasFunc';

function IdealGasCalc() {
    const [pressure, setPressure] = useState({value: "", units: "atm"});
    const [volume, setVolume] = useState("");
    const [moles, setMoles] = useState("");
    const [temperature, setTemperature] = useState("");
    const [disabled, setDisabled] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        const inputs = [pressure, volume, moles, temperature].filter((input) => input != "");
        if (inputs.length ==3){
            setDisabled([pressure, volume, moles, temperature].findIndex((input) => input === "")+1);
        } else{
            setDisabled(0);
        }
      }, [pressure, volume, moles, temperature]);

    function handleSubmit (){
        setResult(CalculateIdealGas(pressure, volume, moles, temperature));
    }

    function handleDropdown(e){
        setPressure({value: pressure.value, units:e.target.value})
        console.log(pressure);
    }

  return (
    <div className='calc-container'>
        <h1>IDEAL GAS LAW</h1>
        <div className='input-container' style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='p' className='input-label'>Pressure</label>
                <div style={{display:'flex', flexDirection:"row", justifyContent:"center"}}>
                    <input id='p' className='input' disabled={disabled == 1} placeholder='ENTER Pressure' onChange={(val) => { setPressure({value:val.target.value, units:pressure.units}); }} />
                    <select id="dropdown"  onChange={handleDropdown}>
                        <option value="atm">atm</option>
                        <option value="kPa">kPa</option>
                        <option value="Pa">Pa</option>
                        <option value="Bar">Bar</option>
                        <option value="mmHg">mmHg</option>
                        <option value="Torr">Torr</option>
                    </select>
                </div>
                <label htmlFor='v' className='input-label'>Volume</label>
                <input id='v' className='input' disabled={disabled == 2} placeholder='ENTER Volume' onChange={(val) => { setVolume(val.target.value); }} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='n' className='input-label'>Moles</label>
                <input id='n' className='input' disabled={disabled == 3} placeholder='ENTER Moles' onChange={(val) => { setMoles(val.target.value); }} />
                <label htmlFor='t' className='input-label'>Temperature</label>
                <input id='t' className='input' disabled={disabled == 4} placeholder='ENTER Temperature' onChange={(val) => { setTemperature(val.target.value); }} />
            </div>
            </div>
        {result.error ? <h1 style={{color: 'red', fontSize: '18px', fontWeight: 'bold'}}>{result.message}</h1>: ""}
        <button disabled={disabled == 0} className='submit' onClick={handleSubmit}>Calculate</button>
        {!result.error ? <h3> Result: {result.value}</h3> : ""}
    </div>
  );
}

export default IdealGasCalc;
