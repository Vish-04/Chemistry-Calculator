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
    const coefficientMatrix = constructMatrix(leftFormulas, rightFormulas, atoms);
    console.log("MATRIX");
    console.log(coefficientMatrix);

    console.log("SOLVED");
    const solvedMatrix = solve(coefficientMatrix);
    console.log(solvedMatrix);

    console.log("EXTRACT COEFF");
    const extractedMatrix = extractCoefficients(solvedMatrix);
    console.log(extractedMatrix);
    
    const coefficients = extractedMatrix; 
  
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
            throw new Error('Invalid formula');
        }
    }
    let count = stack[0][atom]; 
    if (isNaN(count)){
        return 0;
    }
    return count;
  }

  // DONE
  function set(cells, r, c, val) {
    const numRows = cells.length;
    const numCols = cells[0].length;
    if (r < 0 || r >= numRows || c < 0 || c >= numCols)
        throw new RangeError("Index out of bounds");
    cells[r][c] = val;
    return cells;
    }

function get(cells, r, c) {
    const numRows = cells.length;
    const numCols = cells[0].length;
    if (r < 0 || r >= numRows || c < 0 || c >= numCols)
        throw new RangeError("Index out of bounds");
    return cells[r][c];
}

  // DONE 
  function gcdRow(x) {
    let result = 0;
    for (const val of x){
        result = gcd(val, result);
    }    
    return result;
}
// DONE
  function simplifyRow(x) {
    let sign = 0;
    for (const val of x) {
        if (val != 0) {
            sign = Math.sign(val);
            break;
        }
    }
    if (sign == 0)
        return x.slice();
    const g = gcdRow(x) * sign;
    return x.map(val => val / g);
}
// DONE
function swapRows(cells, i, j) {
    const numRows = cells.length;
    if (i < 0 || i >= numRows || j < 0 || j >= numRows)
        throw new RangeError("Index out of bounds");
    const temp = cells[i];
    cells[i] = cells[j];
    cells[j] = temp;
    return cells
}

// DONE
function addRows(x, y) {
    let z = [];
    for (let i = 0; i < x.length; i++)
        z.push(checkedAdd(x[i], y[i]));
    return z;
}
function multiplyRow(x, c) {
    return x.map(val => checkedMultiply(val, c));
}
    // DONE
  function gaussJordanEliminate(matrix) {
    // Simplify all rows
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let cells = [];
    for(let i = 0; i < numRows; i++){
        cells.push(simplifyRow(matrix[i]));
    }
    // Compute row echelon form (REF)
    let numPivots = 0;
    for (let i = 0; i < numCols; i++) {
        // Find pivot
        let pivotRow = numPivots;
        while (pivotRow < numRows && cells[pivotRow][i] == 0)
            pivotRow++;
        if (pivotRow == numRows)
            continue;
        const pivot = cells[pivotRow][i];
        cells = swapRows(cells, numPivots, pivotRow);
        numPivots++;
        // Eliminate below
        for (let j = numPivots; j < numRows; j++) {
            const g = gcd(pivot, cells[j][i]);
            cells[j] = simplifyRow(addRows(multiplyRow(cells[j], pivot / g), multiplyRow(cells[i], -cells[j][i] / g)));
        }
    }
    return cells;
}

  function solve(matrix) {
    matrix = gaussJordanEliminate(matrix);
    console.log(matrix);
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    function countNonzeroCoeffs(row) {
        let count = 0;
        for (let i = 0; i < numCols; i++) {
            if (get(matrix, row, i) != 0)
                count++;
        }
        return count;
    }
    // Find row with more than one non-zero coefficient
    let i;
    for (i = 0; i < numRows - 1; i++) {
        if (countNonzeroCoeffs(i) > 1)
            break;
    }
    if (i == numRows - 1)
        throw new RangeError("All-zero solution"); // Unique solution with all coefficients zero
    // Add an inhomogeneous equation
    matrix = set(matrix, numRows - 1, i, 1);
    matrix = set(matrix, numRows - 1,numCols - 1, 1);
    console.log(matrix);
    matrix = gaussJordanEliminate(matrix);
    console.log(matrix);
    return matrix;
}
// DONE
function gcd(x, y) {
    if (typeof x != "number" || typeof y != "number" || isNaN(x) || isNaN(y))
        throw new Error("Invalid argument");
    x = Math.abs(x);
    y = Math.abs(y);
    while (y != 0) {
        const z = x % y;
        x = y;
        y = z;
    }
    return x;
}

function extractCoefficients(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    if (cols - 1 > rows || get(cols - 2, cols - 2) == 0)
        throw new RangeError("Multiple independent solutions");
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
// Returns the sum of the given integers, or throws an exception if the result is too large. DONE
function checkedAdd(x, y) {
    return checkOverflow(x + y);
}
// Returns the product of the given integers, or throws an exception if the result is too large. DONE
function checkedMultiply(x, y) {
    return checkOverflow(x * y);
}
// Throws an exception if the given integer is too large, otherwise returns it. DONE
function checkOverflow(x) {
    if (Math.abs(x) >= INT_MAX)
        throw new RangeError("Arithmetic overflow");
    return x;
}
 
  
export default balanceChemicalEquation;