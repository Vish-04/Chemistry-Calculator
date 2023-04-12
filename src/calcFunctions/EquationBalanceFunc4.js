import Fraction from 'fraction.js';

function balanceChemicalEquation(input) {
    // Split the input string into the left-hand and right-hand sides
    const sides = input.split("=");
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();
  
    // Parse the formulas on each side of the equation
    const leftFormulas = parseFormulas(leftSide);
    console.log(leftFormulas);
    const rightFormulas = parseFormulas(rightSide);

    // Get the list of all unique atoms in the equation
    const atoms = getUniqueAtoms([...leftFormulas, ...rightFormulas]);
  
    // Construct the matrix of coefficients for the system of equations
    const coefficientMatrix = constructMatrix(leftFormulas, rightFormulas, atoms);
    console.log("MATRIX");
    console.log(coefficientMatrix);

    console.log("SOLVED MATRIX")
    const solvedMatrix = balance(coefficientMatrix);
    console.log(solvedMatrix);


    const coefficients = multiplyColumns(solvedMatrix);
    // Construct the balanced equation string
    let balancedEquation = "";
    for (let i = 0; i < leftFormulas.length; i++) {
      const coefficient = coefficients[i];
      const formula = leftFormulas[i];
      balancedEquation += `${coefficient}${formula}`;
      if (i < leftFormulas.length - 1) {
        balancedEquation += " + ";
      }
    }
    balancedEquation += " = ";
    for (let i = 0; i < rightFormulas.length; i++) {
      const coefficient = coefficients[leftFormulas.length + i];
      const formula = rightFormulas[i];
      balancedEquation += `${coefficient}${formula}`;
      if (i < rightFormulas.length - 1) {
        balancedEquation += " + ";
      }
    }
  
    return {error: false, message: "", value: balancedEquation};

  }

  function removeZeroRows(matrix) {
    return matrix.filter(row => !row.every(element => element === 0));
  }
  
  function parseFormulas(side) {
    const formulas = side.split("+").map((f) => f.trim());
    return formulas;
  }
  
  function getUniqueAtoms(formulas) {
    const atoms = new Set();
    for (const formula of formulas) {
      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      while ((match = regex.exec(formula)) !== null) {
        const atom = match[1];
        atoms.add(atom);
      }
    }
    return Array.from(atoms);
  }
  
  function constructMatrix(leftFormulas, rightFormulas, atoms) {
    const matrix = [];
    for (const atom of atoms) {
      const row = [];
      for (const formula of leftFormulas) {
        const count = getCountOfAtomInFormula(atom, formula);
        row.push(count);
      }
      for (const formula of rightFormulas) {
        const count = getCountOfAtomInFormula(atom, formula);
        row.push(-count);
      }
      matrix.push(row);
    }
    return matrix;
  }
  
  function getCountOfAtomInFormula(atom, formula) {
    const re = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
    const stack = [{ count: 1 }];
    let match;
    while ((match = re.exec(formula)) !== null) {
        if (match[1]) {
        const element = match[1];
        const count = match[2] === '' ? 1 : Number(match[2]);
        const last = stack[stack.length - 1];
        if (last.hasOwnProperty(element)) {
            last[element] += count;
        } else {
            last[element] = count;
        }
        } else if (match[3]) {
        stack.push({ count: Number(match[4] || 1) });
        } else if (match[4] && stack.length > 1) {
        const last = stack.pop();
        const count = Number(match[5] || 1);
        for (const [element, elementCount] of Object.entries(last)) {
            const multipliedCount = count * elementCount;
            const prev = stack[stack.length - 1];
            if (prev.hasOwnProperty(element)) {
            prev[element] += multipliedCount;
            } else {
            prev[element] = multipliedCount;
            }
        }
        } else {
            return "ERROR, invalid formula, check parentheses"
            throw new Error('Invalid formula');
        }
    }
    let count = stack[0][atom]; 
    if (isNaN(count)){
        return 0;
    }
    return count;
  }

  function isBalanced(matrix){
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    for(let r = 0; r<numRows; r++){
        let total = 0
        for(let c = 0; c<numCols; c++){
            total += matrix[r][c]
        }
        if (total != 0){
            return false;
        }
    }

    return true;
  }

  function balance(matrix){
    const rows = matrix.length;
    const columns = matrix[0].length;
    let fMatrix = matrix.map(row => row.map(ele => new Fraction(ele.toString() + "/1") ))

    let lead = 0;
    for (let r = 0; r < rows; r++) {
        if (columns <= lead) {
        return fMatrix.map(row => row.map(ele => ele.valueOf()));;
        }
        let i = r;
        while (fMatrix[i][lead].valueOf() == 0) {
        i++;
        if (rows == i) {
            i = r;
            lead++;
            if (columns == lead) {
            return fMatrix.map(row => row.map(ele => ele.valueOf()));;
            }
        }
        }
        let tmp = fMatrix[i];
        fMatrix[i] = fMatrix[r];
        fMatrix[r] = tmp;
        let val = fMatrix[r][lead];
        for (let j = 0; j < columns; j++) {
            fMatrix[r][j] = fMatrix[r][j].div(val);
        }
        for (let i = 0; i < rows; i++) {
        if (i == r) continue;
        val = fMatrix[i][lead];
        for (let j = 0; j < columns; j++) {
            fMatrix[i][j] = fMatrix[i][j].sub(fMatrix[r][j].mul(val));
        }
        }
        lead++;
    }   

        for (let r = 0; r < rows; r++){
            fMatrix[r] = integerizeRow(fMatrix[r]);
        }
        return fMatrix.map(row => row.map(ele => ele.valueOf()));
    }

    function integerizeRow(arr) {
        let lcmVal = 1;
        for(let col = 0; col < arr.length; col++){
            if (arr[col].valueOf() != 0){
                lcmVal = lcm(lcmVal, arr[col].d);
            }
        }
        console.log("LCM VAL", lcmVal);
        return arr.map(ele => ele.mul(lcmVal));
    }

    function lcm(num1, num2) {        
        return (num1 * num2) / gcd(num1, num2);
    }    

    function gcd(a, b) {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    function multiplyColumns(matrix){
        const rows = matrix.length;
        const cols = matrix[0].length;
        const coeff = new Array(cols).fill(1);
        let lcmVal = 0;
        while(!isBalanced(matrix)){
            for(let r = 0; r < rows; r++){
                lcmVal = lcm(matrix[r][r], Math.abs(matrix[r][cols-1]));
                coeff[r] *= lcmVal/(Math.abs(matrix[r][r]));
                coeff[cols-1] *= lcmVal/(Math.abs(matrix[r][cols-1]));
                matrix[r][r] *= lcmVal/(Math.abs(matrix[r][r]));
                console.log("COEFF", coeff);
                for(let row = 0; row < rows; row++){
                    matrix[row][cols-1] *= lcmVal/(Math.abs(matrix[r][cols-1]));
                }
                console.log(isBalanced(matrix), matrix);
                
            }
        }
        return coeff;
    }
    

export default balanceChemicalEquation;