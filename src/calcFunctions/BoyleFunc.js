function CalculateBoyle (p1, p2, v1, v2){
    // validation check
    const valid ={P1:ValidateInput(p1), P2:ValidateInput(p2), V1:ValidateInput(v1), V2:ValidateInput(v2)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid Input at ${key}`, value:null}
        }
    }
    
    if (parseFloat(p1) ==0){
        return {error: true, message:`Pressure P1 cannot be 0`, value:null}
    } 
    if (parseFloat(p2) ==0){
        return {error: true, message:`Pressure P2 cannot be 0`, value:null}
    } 
    if (parseFloat(v1) <=0){
        return {error: true, message:`Volume V1 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(v2) <=0){
        return {error: true, message:`Volume V2 cannot be 0 or lower`, value:null}
    } 
    if(!isNaN(parseFloat(p1))&&!isNaN(parseFloat(p2))){
        if (Math.sign(parseFloat(p1)) != Math.sign(parseFloat(p2))){
            return {error: true, message:`Pressure Signs Mismatch: P1 and P2 should have the same signs`, value:null}
        } 
    }
    
    if (isNaN(parseFloat(p1))){

        return {error: false, message:"", value: (parseFloat(p2)*parseFloat(v2)/parseFloat(v1))}

    } else if (isNaN(parseFloat(p2))){

        return {error: false, message:"", value: (parseFloat(p1)*parseFloat(v1)/parseFloat(v2))}

    } else if (isNaN(parseFloat(v1))){

        return {error: false, message:"", value: (parseFloat(p2)*parseFloat(v2)/parseFloat(p1))}

    } else if (isNaN(parseFloat(v2))){

        return {error: false, message:"", value: (parseFloat(p1)*parseFloat(v1)/parseFloat(p2))}

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

export default CalculateBoyle;