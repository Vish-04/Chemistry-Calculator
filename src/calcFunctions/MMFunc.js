
function calculateMolarMass(formula) {
    const atomicMasses = {
      H: 1.008,
      He: 4.003,
      Li: 6.941,
      Be: 9.012,
      B: 10.81,
      C: 12.01,
      N: 14.01,
      O: 16.00,
      F: 19.00,
      Ne: 20.18,
      Na: 22.99,
      Mg: 24.31,
      Al: 26.98,
      Si: 28.09,
      P: 30.97,
      S: 32.07,
      Cl: 35.45,
      Ar: 39.95,
      K: 39.10,
      Ca: 40.08,
      Sc: 44.96,
      Ti: 47.87,
      V: 50.94,
      Cr: 52.00,
      Mn: 54.94,
      Fe: 55.85,
      Ni: 58.69,
      Co: 58.93,
      Cu: 63.55,
      Zn: 65.38,
      Ga: 69.72,
      Ge: 72.63,
      As: 74.92,
      Se: 78.96,
      Br: 79.90,
      Kr: 83.80,
      Rb: 85.47,
      Sr: 87.62,
      Y: 88.91,
      Zr: 91.22,
      Nb: 92.91,
      Mo: 95.94,
      Tc: 98.00,
      Ru: 101.1,
      Rh: 102.9,
      Pd: 106.4,
      Ag: 107.9,
      Cd: 112.4,
      In: 114.8,
      Sn: 118.7,
      Sb: 121.8,
      Te: 127.6,
      I: 126.9,
      Xe: 131.3,
      Cs: 132.9,
      Ba: 137.3,
      La: 138.9,
      Ce: 140.1,
      Pr: 140.9,
      Nd: 144.2,
      Pm: 145.0,
      Sm: 150.4,
      Eu: 151.9,
      Gd: 157.3,
      Tb: 158.9,
      Dy: 162.5,
      Ho: 164.9,
      Er: 167.3,
      Tm: 168.9,
      Yb: 173.0,
      Lu: 175.0,
      Hf: 178.5,
      Ta: 180.9,
      W: 183.8,
      Re: 186.2,
      Os: 190.2,
      Ir: 192.2,
      Pt: 195.1,
      Au: 197.0,
      Hg: 200.6,
      Tl: 204.4,
      Pb: 207.2,
      Bi: 208.9,
      Th: 232.0,
      Pa: 231.0,
      U: 238.0,
      Np: 237.0,
      Pu: 244.0,
      Am: 243.0,
      Cm: 247.0,
      Bk: 247.0,
      Cf: 251.0,
      Es: 252.0,
      Fm: 257.0,
      Md: 258.0,
      No: 259.0,
      Lr: 262.0,
    };

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

    let elements = Object.keys(stack[0]);
    let elementCount = Object.values(stack[0]);
    console.log(elements);
    console.log(elementCount);

    let i = 1;
    let molarMass = 0;
    while(i < elements.length){
        const e = elements[i];
        molarMass = molarMass + atomicMasses[e]*elementCount[i];
        i = i+1;
    }
      return molarMass;
  }
  
  export default calculateMolarMass;