function CalculateCharles (t1, t2, v1, v2){
    // validation check
    const valid ={T1:ValidateInput(t1), T2:ValidateInput(t2), V1:ValidateInput(v1), V2:ValidateInput(v2)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid Input at ${key}`, value:null}
        }
    }
    
    if (parseFloat(t1) <=0){
        return {error: true, message:`Temperature T1 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(t2) <=0){
        return {error: true, message:`Temperature T2 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(v1) <=0){
        return {error: true, message:`Volume V1 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(v2) <=0){
        return {error: true, message:`Volume V2 cannot be 0 or lower`, value:null}
    } 
    
    if (isNaN(parseFloat(t1))){

        return {error: false, message:"", value: (parseFloat(t2)*parseFloat(v1)/parseFloat(v2))}

    } else if (isNaN(parseFloat(t2))){

        return {error: false, message:"", value: (parseFloat(v2)*parseFloat(t1)/parseFloat(v1))}

    } else if (isNaN(parseFloat(v1))){

        return {error: false, message:"", value: (parseFloat(t1)*parseFloat(v2)/parseFloat(t2))}

    } else if (isNaN(parseFloat(v2))){

        return {error: false, message:"", value: (parseFloat(v1)*parseFloat(t2)/parseFloat(t1))}

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

export default CalculateCharles;