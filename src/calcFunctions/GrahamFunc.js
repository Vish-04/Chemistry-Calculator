import calculateMolarMass from "./MMFunc";

function CalculateGraham(r1, r2, m1, m2){

  if(m1 != "" && isNaN(parseFloat(m1))){
    m1 = calculateMolarMass(m1);
    console.log(m1);
    if (typeof m1 == String){
      return {error: true, message: m1, value:null}
    }
  }
  if(m2 != "" && isNaN(parseFloat(m2))){
    m2 = calculateMolarMass(m2);
    console.log(m2);
    if (typeof m2 == String){
      return {error: true, message: m2, value:null}
    }
  }
  // validation check
  const valid ={R1:ValidateInput(r1), R2:ValidateInput(r2)}
  for(const key in valid){
      if (valid[key] == false){
          return {error: true, message:`Invalid Input at ${key}`, value:null}
      }
  }
  
  if (parseFloat(r1) <=0){
      return {error: true, message:`Rate R1 cannot be 0 or lower`, value:null}
  } 
  if (parseFloat(r2) <=0){
      return {error: true, message:`Rate R2 cannot be 0 or lower`, value:null}
  } 
  if (parseFloat(m1) <=0){
      return {error: true, message:`Molar Mass M1 cannot be 0 or lower`, value:null}
  } 
  if (parseFloat(m2) <=0){
      return {error: true, message:`Molar Mass M2 cannot be 0 or lower`, value:null}
  } 
  
  if (isNaN(parseFloat(r1))){

    return {error: false, message:"", value: (parseFloat(r2)*Math.sqrt(parseFloat(m2)/parseFloat(m1)))}

  } else if (isNaN(parseFloat(r2))){

    return {error: false, message:"", value: (parseFloat(r1)*Math.sqrt(parseFloat(m1)/parseFloat(m2)))}

  } else if (isNaN(parseFloat(m1))){
    console.log("M1, M2, R1, R2", m1, parseFloat(m2), parseFloat(r1), parseFloat(r2));

    return {error: false, message:"", value: (parseFloat(m2)*Math.pow((parseFloat(r2)/parseFloat(r1)), 2))}

  } else if (isNaN(parseFloat(m2))){
    console.log("M1, M2, R1, R2", parseFloat(m1), m2, parseFloat(r1), parseFloat(r2));

    return {error: false, message:"", value: (parseFloat(m1)*Math.pow((parseFloat(r1)/parseFloat(r2)), 2))}

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

export default CalculateGraham;