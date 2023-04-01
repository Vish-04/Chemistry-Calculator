const math = require('mathjs');
const INT_MAX = 9007199254740992; // 2^53

function balanceChemicalEquation(input) {
    // Split the input string into the left-hand and right-hand sides
    const sides = input.split("=");
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();
  
    // Parse the formulas on each side of the equation
    const leftFormulas = parseFormulas(leftSide);
    const rightFormulas = parseFormulas(rightSide);

    // Get the list of all unique atoms in the equation
    const atoms = getUniqueAtoms([...leftFormulas, ...rightFormulas]);
  
    // Construct the matrix of coefficients for the system of equations
    let coefficientMatrix = constructMatrix(leftFormulas, rightFormulas, atoms);
    console.log("MATRIX");
    console.log(coefficientMatrix);

    if (!isBalanced(coefficientMatrix)){
        if (!isEchelonForm(coefficientMatrix)){
            console.log("ECHELON FORM");
            coefficientMatrix = echelonForm(coefficientMatrix);
            console.log(coefficientMatrix);
        } 
    } else{
        let coefficients = [];
        for (let i = 0; i < coefficientMatrix[0].length; i++){
            coefficients.push(1);
            console.log(coefficients);
            return;
        }
    }

    console.log("EXTRACT COEFF");
    const extractedMatrix = extractCoefficients(coefficientMatrix);
    console.log(extractedMatrix);
    
    const coefficients = []; 
  
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
  
    console.log("BALANCED EQUATION");
    console.log(balancedEquation);
    return balancedEquation;

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
        }
    }
    let count = stack[0][atom]; 
    if (isNaN(count)){
        return 0;
    }
    return count;
  }
 
  // function to find the GCD of two numbers
function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
  
  // function to swap two rows in a matrix
  function swapRows(matrix, i, j) {
    const temp = matrix[i];
    matrix[i] = matrix[j];
    matrix[j] = temp;
  }
  function isEchelonForm(matrix) {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    let lastNonzeroCol = -1;
  
    for (let r = 0; r < rowCount; r++) {
      let firstNonzeroCol = -1;
      for (let c = 0; c < colCount; c++) {
        if (matrix[r][c] !== 0) {
          firstNonzeroCol = c;
          break;
        }
      }
  
      if (firstNonzeroCol === -1) {
        // The row is all zeros, so it must be below all previous rows with nonzero elements
        continue;
      }
  
      if (firstNonzeroCol <= lastNonzeroCol) {
        // The first nonzero element is in a column that is not to the right of the previous row's nonzero element
        return false;
      }
  
      lastNonzeroCol = firstNonzeroCol;
    }
  
    return true;
  }

  function isBalanced(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let r = 0; r < rows; r++){
        let total = 0;
        for (let c = 0; c<cols; c++){
            total += matrix[r][c];
        }
        if (total != 0){
            console.log(false);
            return false;
        }
    }
    console.log(true);
    return true;
  }
   // function to simplify a row in a matrix
   function simplifyRow(row) {
    const gcdRow = row.reduce(gcd);
    return row.map((elem) => elem / gcdRow);
  }
  

  function echelonForm(matrix) {
    let lead = 0;
    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    function findLCM(a, b) {
        // Find the greatest common divisor using the Euclidean algorithm
        function gcd(x, y) {
          if (y === 0) {
            return x;
          } else {
            return gcd(y, x % y);
          }
        }
      
        // Calculate the LCM using the formula LCM(a,b) = (a*b) / gcd(a,b)
        return (a * b) / gcd(a, b);
      }
    for (let r =0; r< rowCount; r++){
    	matrix[r] = simplifyRow(matrix[r]);
    }
    for (let r = 0; r < rowCount; r++) {
      if (lead >= colCount) {
        return matrix;
      }
      let i = r;
      while (matrix[i][lead] === 0) {
        i++;
        if (i === rowCount) {
          i = r;
          lead++;
          if (lead === colCount) {
            return matrix;
          }
        }
      }
      
      // Swap rows i and r
      const tmp = matrix[i];
      matrix[i] = matrix[r];
      matrix[r] = tmp;
      
      //lv is the value of the pivot
      let lv = matrix[r][lead];
       for (let row = 0; row< rowCount; row++){
        const lcm = findLCM(lv, matrix[row][lead]);
        if (lcm != 0 && r != row){
            const r1 = lcm/lv;
            const r2 = lcm/matrix[row][lead];
            for(let c = lead; c<colCount; c++){
                matrix[r][c] *= r1;
                matrix[row][c] *= r2;
                matrix[row][c] -= matrix[r][c];
                lv *= r1;
            }
        }
        matrix[row] = simplifyRow(matrix[row]);
      } 
      lead++;
    }
  
    return matrix;
  }
  
  // function to perform Gauss Jordan elimination on a matrix
  function gaussJordanElimination(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    try {
    for (let col = 0; col < numCols - 1; col++) {
      let pivotRow = col;
      for (let row = col + 1; row < numRows; row++) {
        // find the row with the largest absolute value in the pivot column
        if (Math.abs(matrix[row][col]) > Math.abs(matrix[pivotRow][col])) {
            
          pivotRow = row;
        }
      }
  
      // swap the pivot row with the current row if necessary
      if (pivotRow !== col) {
        swapRows(matrix, pivotRow, col);
      }
  
      // bring all other rows to a common multiple with the pivot row
      for (let row = 0; row < numRows; row++) {
        if (row !== col) {
          const commonMultiple = matrix[row][col] / matrix[col][col];
          for (let i = col; i < numCols; i++) {
            matrix[row][i] = matrix[row][i] - commonMultiple * matrix[col][i];
            
          }
        }
      }
    }
  
    // simplify each row in the matrix
    for (let row = 0; row < numRows; row++) {
      matrix[row] = simplifyRow(matrix[row]);
    }
  
    
    } catch (error) {
        console.warn(error);    
    }
    return matrix;
  }
  function extractCoefficients(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    // if (cols - 1 > rows || get(cols - 2, cols - 2) == 0)
        // throw new RangeError("Multiple independent solutions");
    let lcm = 1;
    for (let i = 0; i < cols - 1; i++)
        lcm = checkedMultiply(lcm / gcd(lcm, get(i, i)), get(i, i));
    let coefs = [];
    for (let i = 0; i < cols - 1; i++)
        coefs.push(checkedMultiply(lcm / get(i, i), get(i, cols - 1)));
    if (coefs.every(x => x == 0))
        throw new RangeError("Assertion error: All-zero solution");

        
    function get(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols)
            throw new RangeError("Index out of bounds");
        return matrix[r][c];
    }
    return coefs;

    
}
function checkedMultiply(x, y) {
    return checkOverflow(x * y);
}
function checkOverflow(x) {
    if (Math.abs(x) >= INT_MAX)
        throw new RangeError("Arithmetic overflow");
    return x;
}

  
  
export default balanceChemicalEquation;