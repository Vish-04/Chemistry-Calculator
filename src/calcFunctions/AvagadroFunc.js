function CalculateAvagadro (n1, n2, v1, v2){
    // validation check
    const valid ={N1:ValidateInput(n1), N2:ValidateInput(n2), V1:ValidateInput(v1), V2:ValidateInput(v2)}
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid Input at ${key}`, value:null}
        }
    }
    
    if (parseFloat(n1) <=0){
        return {error: true, message:`Moles N1 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(n2) <=0){
        return {error: true, message:`Moles N2 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(v1) ==0){
        return {error: true, message:`Volume V1 cannot be 0 or lower`, value:null}
    } 
    if (parseFloat(v2) ==0){
        return {error: true, message:`Volume V2 cannot be 0 or lower`, value:null}
    } 
    
    if (isNaN(parseFloat(n1))){

        return {error: false, message:"", value: (parseFloat(n2)*parseFloat(v1)/parseFloat(v2))}

    } else if (isNaN(parseFloat(n2))){

        return {error: false, message:"", value: (parseFloat(v2)*parseFloat(n1)/parseFloat(v1))}

    } else if (isNaN(parseFloat(v1))){

        return {error: false, message:"", value: (parseFloat(n1)*parseFloat(v2)/parseFloat(n2))}

    } else if (isNaN(parseFloat(v2))){

        return {error: false, message:"", value: (parseFloat(v1)*parseFloat(n2)/parseFloat(n1))}

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

export default CalculateAvagadro;