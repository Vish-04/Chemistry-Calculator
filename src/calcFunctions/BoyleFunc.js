function CalculateBoyle(p1, p2, v1, v2){
    const valid = [ValidateInput(p1), ValidateInput(p2), ValidateInput(v1), ValidateInput(v2),]
    console.log(valid);
    
}

function ValidateInput(input){
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