import calculateMolarMass from "./MMFunc";

function CalculateMeanSpeed (temperature, molecule, ms){
    
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
    const valid ={Temperature:ValidateInput(temperature), MS:ValidateInput(ms)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid ${key} Input`, value:null}
        }
    }
    
    if (parseFloat(temperature) <=0){
        return {error: true, message:`Temperature cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(ms) <= 0){
        return {error: true, message:`Root Mean Square Speed cannot be 0 or lower`, value:null}
    } 

    if (isNaN(parseFloat(temperature))){

        return {error: false, message:"", value: (Math.pow(parseFloat(ms), 2) * parseFloat(molecule)/21.1727)}

    } else if (isNaN(parseFloat(molecule))){

        return {error: false, message:"", value: (21.1727*parseFloat(temperature)/Math.pow(parseFloat(ms), 2))}

    } else if (isNaN(parseFloat(ms))){

        return {error: false, message:"", value: (Math.sqrt(21.1727*parseFloat(temperature)/parseFloat(molecule)))}
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

export default CalculateMeanSpeed;