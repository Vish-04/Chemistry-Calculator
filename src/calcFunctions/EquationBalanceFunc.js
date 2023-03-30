function balanceChemicalEquation(input) {
    // Split the input string into the left-hand and right-hand sides
    const sides = input.split("=");
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();

    console.log("SIDES");
    console.log(leftSide, rightSide);
  
    // Parse the formulas on each side of the equation
    const leftFormulas = parseFormulas(leftSide);
    const rightFormulas = parseFormulas(rightSide);
    console.log("LEFTFORMULAS");
    console.log(leftFormulas);
    console.log("RIGHTFORMULAS");
    console.log(rightFormulas);

    // Get the list of all unique atoms in the equation
    const atoms = getUniqueAtoms([...leftFormulas, ...rightFormulas]);
    console.log(atoms);
  
    // Construct the matrix of coefficients for the system of equations
    const coefficientMatrix = constructMatrix(leftFormulas, rightFormulas, atoms);
    const rrefCoefficientMatrix = rref(coefficientMatrix);
    console.log("MATRIX");
    console.log(coefficientMatrix);

    console.log("RREF");
    console.log(rrefCoefficientMatrix);
    
    const nullCoefficientMatrix = nullSpace(rrefCoefficientMatrix);
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

  function nullSpace(rref) {
    const numRows = rref.length;
    const numCols = rref[0].length;
  
    // Find basic and free variables
    let basicVars = [];
    let freeVars = [];
    for (let i = 0; i < numRows; i++) {
      let row = rref[i];
      let pivotCol = row.findIndex(val => val !== 0 && !basicVars.includes(row.indexOf(val)));
      if (pivotCol >= 0) {
        basicVars.push(pivotCol);
      } else {
        freeVars.push(i);
      }
    }
  
    // Construct basis for null space
    let basis = [];
    for (let i = 0; i < numCols; i++) {
      if (!basicVars.includes(i)) {
        let vec = new Array(numCols).fill(0);
        vec[i] = 1;
        for (let j of basicVars) {
          if (j < rref.length && i < rref[j].length) {
            vec[j] = -rref[j][i];
          }
        }
        basis.push(vec);
      }
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
    console.log("STACK and COUNT and ATOM");
    console.log(atom);
    console.log(stack[0]);
    console.log(count);
    return count;
  }
  

export default balanceChemicalEquation;