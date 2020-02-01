const updateCalculation = (toReturn, moduleState, value) => {
  const { result, calculation } = moduleState;
  if (result !== 0) {
    toReturn.prevResult = result;
    toReturn.calculation = [...calculation, "£", value];
  } else {
    toReturn.calculation = [...calculation, value];
  }
};

export function onNumChange(value, moduleState) {
  const { calculation } = moduleState;
  if (calculation.length === 1 && calculation.indexOf(0) === 0) {
    return { calculation: [value] };
  } else {
    return { calculation: [...calculation, value] };
  }
}

export function spclHandle(value, moduleState) {
  const { calculation, result, prevResult } = moduleState;
  if (calculation.length === 1 && calculation[calculation.length - 1] === 0) {
    return;
  }

  const toReturn = {};
  switch (value) {
    case "C":
      toReturn.calculation = [0];
      toReturn.result = 0;
      toReturn.opera = null;
      break;
    case "%":
    case "/":
    case "+":
    case "-":
    case "*":
      updateCalculation(toReturn, moduleState, value);
      toReturn.opera = value;
      break;
    case "del":
      if (calculation.length === 1) {
        if (result === calculation[calculation.length - 1]) {
          toReturn.calculation = [0];
          toReturn.result = 0;
        }
      }
      const newCalculation = calculation.pop();
      if (newCalculation.length) {
        toReturn.result = prevResult;
        toReturn.calculation = [...calculation];
      } else {
        toReturn.calculation = [0];
        toReturn.result = 0;
      }
      break;
    case ".":
      toReturn.calculation = [...calculation, "."];
      break;
    case "=":
      toReturn.calculation = [result];
      toReturn.opera = null;
      break;
    default:
      break;
  }

  return toReturn;
}
