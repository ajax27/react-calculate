/**@typedef {typeof import('./model/state').default} State*/
/**@typedef {import('concent').ReducerType<typeof import('./model/reducer')>} Reducer*/
/**@typedef {import('concent').ComputeValType<typeof import('./model/computed')>} Computed*/
import React from "react";
import "./styles.css";
import { useConcent } from "concent";
import ButtonComponent from "./components/button.components";

const btnVals = [
  { label: "C", type: "spcl" },
  { label: "≠", type: "spcl" },
  { label: "%", type: "spcl" },
  { label: "/", type: "spcl" },
  { label: "7", type: "num" },
  { label: "8", type: "num" },
  { label: "9", type: "num" },
  { label: "*", type: "spcl" },
  { label: "4", type: "num" },
  { label: "5", type: "num" },
  { label: "6", type: "num" },
  { label: "-", type: "spcl" },
  { label: "1", type: "num" },
  { label: "2", type: "num" },
  { label: "3", type: "num" },
  { label: "+", type: "spcl" },
  { label: ".", type: "spcl" },
  { label: "0", type: "num" },
  { label: "del", type: "spcl" },
  { label: "=", type: "spcl" }
];

export default React.memo(function App() {
  /**@type {import('concent').ICtx<{}, State, Reducer, Computed>}*/
  const ctx = useConcent("calc");
  const { moduleReducer, state, moduleComputed } = ctx;
  const { spclHandle, onNumChange } = moduleReducer;
  const { result } = state;

  return (
    <div className="App">
      <div className="show-calculation">
        <span className="result-calculation">{moduleComputed.calculation}</span>
        <span className="dashed-line" />
        <span className="final-result">
          {result === 0 ? "Calculate with Concent" : result}
        </span>
        <h3 style={{ margin: 0 }}>bigup fantasticsoul</h3>
      </div>
      <div className="button-layout">
        {btnVals.map(({ label, type }, idx) => (
          <ButtonComponent
            key={idx}
            handleClick={type === "num" ? onNumChange : spclHandle}
          >
            {label}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
});
