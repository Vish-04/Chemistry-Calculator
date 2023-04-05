const math = require('mathjs');


function balanceChemicalEquation(input) {
    console.log("FRACTIONS");
    console.log(math.fraction(0.333));

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

    console.log(rref(coefficientMatrix));
    
    const nullCoefficientMatrix = findNullSpace(coefficientMatrix);
    console.log("NULLSPACE");
    console.log(nullCoefficientMatrix);
    
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
  
  function rref(A) {
    const numRows = A.length;
    const numCols = A[0].length;
  
    let lead = 0;
    for (let r = 0; r < numRows; r++) {
      if (lead >= numCols) {
        return;
      }
      let i = r;
      while (A[i][lead] === 0) {
        i++;
        if (i === numRows) {
          i = r;
          lead++;
          if (lead === numCols) {
            return;
          }
        }
      }
      let tempRow = A[i];
      A[i] = A[r];
      A[r] = tempRow;
  
      let lv = A[r][lead];
      for (let j = 0; j < numCols; j++) {
        A[r][j] = A[r][j] / lv;
      }
  
      for (let i = 0; i < numRows; i++) {
        if (i !== r) {
          lv = A[i][lead];
          for (let j = 0; j < numCols; j++) {
            A[i][j] -= lv * A[r][j];
          }
        }
      }
      lead++;
    }
    return A;
  }

  function removeZeroRows(matrix) {
    return matrix.filter(row => !row.every(element => element === 0));
  }

  function nullSpace(rref) {
    // Get the dimensions of the matrix
    const numRows = rref.length;
    const numCols = rref[0].length;
  
    // Find the columns corresponding to the free variables
    const freeCols = [];
    for (let j = 0; j < numCols - 1; j++) {
      let isFree = true;
      for (let i = 0; i < numRows; i++) {
        if (rref[i][j] !== 0) {
          isFree = false;
          break;
        }
      }
      if (isFree) {
        freeCols.push(j);
      }
    }
  
    // Generate the basis of the nullspace using the free variables
    const basis = [];
    for (let j of freeCols) {
      const vec = Array(numCols - 1).fill(0);
      vec[j] = 1;
      for (let i = 0; i < numRows; i++) {
        if (rref[i][j] !== 0) {
          for (let k of freeCols) {
            vec[k] -= rref[i][k] * vec[j];
          }
          vec[numCols - 1] += rref[i][j] * vec[j];
        }
      }
      basis.push(vec);
    }
  
    return basis;
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

function findNullSpace(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    console.log(m,n);
    matrix = math.matrix(matrix);

    const A = math.subset(matrix, math.index(math.range(0, m), math.range(0, n - 1)));
    console.log("A", A);

    
    const b = math.subset(matrix, math.index(math.range(0, m), n - 1));
  

    console.log("B");
    console.log(b);
    const x = math.lusolve(A, b);
    console.log("X")
    console.log(x);
    return x;
    return x._data.map(row => row[0]);
}

export default balanceChemicalEquation;