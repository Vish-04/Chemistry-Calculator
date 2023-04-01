function CalculateBoyle(p1, p2, v1, v2){

    // validation check
    const valid ={p1:ValidateInput(p1), p2:ValidateInput(p2), p3:ValidateInput(v1), p4:ValidateInput(v2)}
    console.log(valid);
    for(const key in valid){
        if (valid[key] == false){
            return {error: true, message:`Invalid Input at ${key}`, value:null}
        }
    }
    
    if (p1 == null){
        return {error: false, message:"", value: (parseFloat(p2)*parseFloat(v2)/parseFloat(v1))}
    }
    if (p2 == null){
        return {error: false, message:"", value: (parseFloat(p1)*parseFloat(v1)/parseFloat(v2))}
    }
    if (v1 == null){
        return {error: false, message:"", value: (parseFloat(p2)*parseFloat(v2)/parseFloat(p1))}
    }
    if (v2 == null){
        return {error: false, message:"", value: (parseFloat(p1)*parseFloat(v1)/parseFloat(p2))}
    }
}

function ValidateInput(input){
    if (input == null){
        return true;
    }
    if(isNaN(parseFloat(input))){
        return false;
    }
    if(parseFloat(input).toString != input.trim()){
        return false;
    }
    else{
        return true;
    }
}

export default CalculateBoyle;