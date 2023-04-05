function CalculateGL (t1, t2, p1, p2){
    // validation check
    const valid ={T1:ValidateInput(t1), T2:ValidateInput(t2), P1:ValidateInput(p1), P2:ValidateInput(p2)}
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
    if (parseFloat(p1) ==0){
        return {error: true, message:`Pressure P1 cannot be 0`, value:null}
    } 
    if (parseFloat(p2) ==0){
        return {error: true, message:`Pressure P2 cannot be 0`, value:null}
    } 
    if(!isNaN(parseFloat(p1)) && !isNaN(parseFloat(p2))){
        if (Math.sign(parseFloat(p1)) != Math.sign(parseFloat(p2))){
            return {error: true, message:`Pressure Signs Mismatch: P1 and P2 should have the same signs`, value:null}
        } 
    }
    
    if (isNaN(parseFloat(t1))){

        return {error: false, message:"", value: (parseFloat(t2)*parseFloat(p1)/parseFloat(p2))}

    } else if (isNaN(parseFloat(t2))){

        return {error: false, message:"", value: (parseFloat(p2)*parseFloat(t1)/parseFloat(p1))}

    } else if (isNaN(parseFloat(p1))){

        return {error: false, message:"", value: (parseFloat(t1)*parseFloat(p2)/parseFloat(t2))}

    } else if (isNaN(parseFloat(p2))){

        return {error: false, message:"", value: (parseFloat(p1)*parseFloat(t2)/parseFloat(t1))}

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

export default CalculateGL;