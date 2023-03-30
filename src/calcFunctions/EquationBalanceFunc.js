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
    const matrix = constructMatrix(leftFormulas, rightFormulas, atoms);
    console.log(matrix);
  
    // Solve the system of equations to get the coefficients
    const coefficients = solveMatrix(matrix);
    console.log(coefficients)
  
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
        row.push(count);
      }
      matrix.push(row);
    }
    return matrix;
  }
  
  function getCountOfAtomInFormula(atom, formula) {
    const regex = new RegExp(`${atom}(\\d*)`, "g");
    let match = regex.exec(formula);
    if (match === null) {
      return 0;
    } else {
      const countString = match[1] || "1";
      const count = parseInt(countString, 10);
      return count;
    }
  }
  
  function solveMatrix(matrix) {
    const augmentedMatrix = matrix.map((row) => [...row]);
    for (let i = 0; i < matrix.length; i++) {
      augmentedMatrix[i].push(0);
    }
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
    // Pivot row
    let pivotRow = i;
    let pivotValue = augmentedMatrix[pivotRow][i];
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(augmentedMatrix[j][i]) > Math.abs(pivotValue)) {
        pivotRow = j;
        pivotValue = augmentedMatrix[pivotRow][i];
      }
    }

    // Swap rows
    if (pivotRow !== i) {
      [augmentedMatrix[i], augmentedMatrix[pivotRow]] = [
        augmentedMatrix[pivotRow],
        augmentedMatrix[i],
      ];
    }

    // Eliminate column
    for (let j = i + 1; j < n; j++) {
      const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
      for (let k = i; k <= n; k++) {
        augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
      }
    }
  }

  // Back-substitute to get the coefficients
  const coefficients = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += augmentedMatrix[i][j] * coefficients[j];
    }
    coefficients[i] = (augmentedMatrix[i][n] - sum) / augmentedMatrix[i][i];
  }

  return coefficients;
}
  

export default balanceChemicalEquation;