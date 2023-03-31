function balanceChemicalEquation(matrix) {
  // Balances the Chemical Reaction
  // Returns: None (void)
  
  if (!this.is_balanced) {
      let compound_formulas = [];
      let compounds = [];
      for (let i = 0; i < this.compounds.length; i++) {
          let j = this.compounds[i];
          if (!compound_formulas.includes(j.formula)) {
              compound_formulas.push(j.formula);
              compounds.push(j);
          }
      }
      
      let toRemove = [];
      let zeroRow = Array(matrix[0].length).fill(0);
      for (let i = 0; i < matrix.length; i++) {
          if (JSON.stringify(matrix[i]) === JSON.stringify(zeroRow)) {
              toRemove.push(i);
          }
      }
      
      toRemove.reverse();
      for (let num of toRemove) {
          matrix.splice(num, 1);
      }
      
      let rows = matrix.length;
      let columns = matrix[0].length;
      if (rows === columns) {
          throw new Error("Not a real reaction (Can't be balanced)");
      }
      
      let extraColumns = columns - rows;
      let solution = Array(columns).fill(0);
      for (let i = 0; i < extraColumns; i++) {
          let index = columns - i - 1;
          let curr = [];
          for (let j = 0; j < rows; j++) {
              curr.push(matrix[j][index]);
          }
          let sol = lcm(curr.map(j => j.q));
          solution[index] = sol;
      }
      
      for (let i = 0; i < rows; i++) {
          let val = 0;
          let row = matrix[i];
          for (let j = 0; j < extraColumns; j++) {
              let index = columns - j - 1;
              val += solution[index] * row[index];
          }
          solution[i] = -val;
      }
      
      let div = gcd(solution);
      solution = solution.map(val => val / div);
      
      let final_reactants = [];
      let final_products = [];
      
      for (let sol = 0; sol < compounds.length; sol++) {
          let formula = compounds[sol].formula;
          if (this.reactant_formulas.includes(formula)) {
              final_reactants.push(...Array(solution[sol]).fill(compounds[sol]));
          }
          if (this.product_formulas.includes(formula)) {
              final_products.push(...Array(solution[sol]).fill(compounds[sol]));
          }
      }
      
      this.reinit(final_reactants, final_products);
  } else {
      return true;
  }
}


function gcd(numbers) {
  // Returns the greatest common divisor of a list of numbers
  // Input: numbers - an array of numbers
  // Returns: The greatest common divisor of the input numbers

  if (numbers.length === 0) {
      return null;
  }


  let denominator = 1;
  for (let i = 0; i < numbers.length; i++) {
      if (!Number.isInteger(numbers[i])) {
          let parts = numbers[i].toString().split('.');
          let fraction = parts[1] ? Number(parts[1]) : 0;
          let numerator = Number(parts[0]) * denominator + fraction;
          numbers[i] = numerator / denominator;
      }
      denominator *= numbers[i];
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = gcd2(result, numbers[i] * denominator);
  }
  return result / denominator;
}
function gcd2(a, b) {
  if (b === 0) {
      return a;
  }
  return gcd2(b, a % b);
}

function lcm(numbers) {
  // Returns the least common multiple of a list of numbers
  // Input: numbers - an array of numbers
  // Returns: The least common multiple of the input numbers

  if (numbers.length === 0) {
      return null;
  }

  function lcm2(a, b) {
      return (a * b) / gcd2(a, b);
  }

  let denominator = 1;
  for (let i = 0; i < numbers.length; i++) {
      if (!Number.isInteger(numbers[i])) {
          let parts = numbers[i].toString().split('.');
          let fraction = parts[1] ? Number(parts[1]) : 0;
          let numerator = Number(parts[0]) * denominator + fraction;
          numbers[i] = numerator / denominator;
      }
      denominator *= numbers[i];
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      result = lcm2(result, numbers[i] * denominator);
  }
  return result;
}

export default balanceChemicalEquation;