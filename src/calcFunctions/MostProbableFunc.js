import calculateMolarMass from "./MMFunc";

function CalculateMostProbable (temperature, molecule, mps){
    
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
    const valid ={Temperature:ValidateInput(temperature), MPS:ValidateInput(mps)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid ${key} Input`, value:null}
        }
    }
    
    if (parseFloat(temperature) <=0){
        return {error: true, message:`Temperature cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(mps) <= 0){
        return {error: true, message:`Root Mean Square Speed cannot be 0 or lower`, value:null}
    } 

    if (isNaN(parseFloat(temperature))){

        return {error: false, message:"", value: (Math.pow(parseFloat(mps), 2) * parseFloat(molecule)/16.629)}

    } else if (isNaN(parseFloat(molecule))){

        return {error: false, message:"", value: (16.629*parseFloat(temperature)/Math.pow(parseFloat(mps), 2))}

    } else if (isNaN(parseFloat(mps))){

        return {error: false, message:"", value: (Math.sqrt(16.629*parseFloat(temperature)/parseFloat(molecule)))}
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

export default CalculateMostProbable;