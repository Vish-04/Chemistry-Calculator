function CalculateIdealGas (pressure, volume, moles, temperature){
    // validation check
    console.log(pressure);
    const valid ={Pressure:ValidateInput(pressure.value), Volume:ValidateInput(volume), Moles:ValidateInput(moles), Temperature:ValidateInput(temperature)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid Input at ${key}`, value:null}
        }
    }
    
    if (parseFloat(pressure.value) <=0){
        return {error: true, message:`Pressure cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(volume) <=0){
        return {error: true, message:`Volume cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(moles) <= 0){
        return {error: true, message:`Moles cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(temperature) <= 0){
        return {error: true, message:`Temperature cannot be 0 or lower`, value:null}
    } 

    // let tempPressure = pressure;
    // if (pressure.units == "kPa"){
    //     tempPressure.units = "atm";
    //     tempPressure.value = (parseFloat(pressure.value) * 0.00986923).toString();
    // } else if(pressure.units == "Pa") {
    //     tempPressure.units = "atm";
    //     tempPressure.value = (parseFloat(pressure.value) * (0.00986923/1000)).toString();
    // } else if(pressure.units == "Bar") {
    //     tempPressure.units = "atm";
    //     tempPressure.value = (parseFloat(pressure.value) * (0.00986923*100)).toString();
    // } else if(pressure.units == "mmHg" || pressure.units == "Torr") {
    //     tempPressure.units = "atm";
    //     tempPressure.value = (parseFloat(pressure.value)/760).toString();
    // }
    
    if (isNaN(parseFloat(pressure.value))){

        return {error: false, message:"", value: (parseFloat(moles) * 0.0821* parseFloat(temperature)/parseFloat(volume))}

    } else if (isNaN(parseFloat(volume))){

        return {error: false, message:"", value: (parseFloat(moles) * 0.0821* parseFloat(temperature)/parseFloat(pressure.value))}

    } else if (isNaN(parseFloat(moles))){

        return {error: false, message:"", value: (parseFloat(pressure.value)*parseFloat(volume)/(0.0821* parseFloat(temperature)))}

    } else if (isNaN(parseFloat(temperature))){

        return {error: false, message:"", value: (parseFloat(pressure.value)*parseFloat(volume)/(0.0821* parseFloat(moles)))}

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

export default CalculateIdealGas;