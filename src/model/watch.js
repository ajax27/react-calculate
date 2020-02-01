import { defWatch } from "concent";

export const ocChange = defWatch(
  (newState, oldState, fnCtx) => {
    console.log("trigger watch ocChange");
    const { opera, calculation, result, prevResult } = newState;
    if (opera != null) {
      let itemBeforeOperator = 0;
      let itemAfterOperator = 0;
      let operatorFound = false;
      const length = calculation.length;
      for (let i = length - 1; i >= 0; i--) {
        if (calculation[i] !== "£") {
          if (opera === calculation[i]) {
            operatorFound = true;
            continue;
          }
          if (operatorFound) {
            if (result !== 0) {
              itemBeforeOperator = result;
            } else {
              itemBeforeOperator =
                itemBeforeOperator === 0
                  ? calculation[i]
                  : calculation[i] + itemBeforeOperator;
            }
          } else {
            itemAfterOperator =
              itemAfterOperator === 0
                ? calculation[i]
                : calculation[i] + itemAfterOperator;
          }
        } else {
          if (result !== 0) {
            itemBeforeOperator = result;
          }
          break;
        }
      }

      const lastItem = calculation[calculation.length - 1];
      if (lastItem !== opera) {
        const toCommit = { prevResult };
        switch (opera) {
          case "%":
            toCommit.result = itemBeforeOperator % itemAfterOperator;
            break;
          case "/":
            toCommit.result = itemBeforeOperator / itemAfterOperator;
            break;
          case "*":
            toCommit.result = itemBeforeOperator * itemAfterOperator;
            break;
          case "+":
            toCommit.result =
              parseInt(itemBeforeOperator, 10) +
              parseInt(itemAfterOperator, 10);
            break;
          case "-":
            toCommit.result = itemBeforeOperator - itemAfterOperator;
            break;
          default:
            break;
        }
        fnCtx.commit(toCommit);
      }
    } else {
      return;
    }
  },
  ["opera", "calculation"],
  true
);
