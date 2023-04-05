import calculateMolarMass from "./MMFunc";

function CalculateVRMS (temperature, molecule, rms){
    
    if(molecule != "" && isNaN(parseFloat(molecule))){
        molecule = calculateMolarMass(molecule);
        console.log(molecule);
        if (typeof molecule == String){
          return {error: true, message: molecule, value:null}
        } else{
            molecule = molecule* 1.67377e-27;
        }
      }

    // validation check
    const valid ={Temperature:ValidateInput(temperature), RMS:ValidateInput(rms)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid ${key} Input`, value:null}
        }
    }
    
    if (parseFloat(temperature) <=0){
        return {error: true, message:`Temperature cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(rms) <= 0){
        return {error: true, message:`Root Mean Square Speed cannot be 0 or lower`, value:null}
    } 

    if (isNaN(parseFloat(temperature))){

        return {error: false, message:"", value: (Math.pow(parseFloat(rms), 2) * parseFloat(molecule)/24.942)}

    } else if (isNaN(parseFloat(molecule))){

        return {error: false, message:"", value: (24.942*parseFloat(temperature)/Math.pow(parseFloat(rms), 2))}

    } else if (isNaN(parseFloat(rms))){

        return {error: false, message:"", value: (Math.sqrt(24.942*parseFloat(temperature)/parseFloat(molecule)))}
    }
    return {error:true, message:"calculation failed", value:null}

}

function ValidateInput(input){
    if (!input){
        return true;
    } else if(isNaN(parseFloat(input))){
        return false;
    }else if(parseFloat(input).toString() != input.trim()){
        return false;
    }
    else{
        return true;
    }
}

export default CalculateVRMS;