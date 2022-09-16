import './App.css';
import Output from './Output';
import Button from './Button';
import React, { useState } from 'react';
import {StateHook} from './stateHook';

function App() {
  document.title = "Calculator";
  const data = [
    {
      displayValue: "1",
      equationValue: "1",
      class: "number"
    },
    {
      displayValue: "2",
      equationValue: "2",
      class: "number"
    },
    {
      displayValue: "3",
      equationValue: "3",
      class: "number"
    },
    {
      displayValue: "+",
      equationValue: "+",
      class: "operator"
    },
    {
      displayValue: "4",
      equationValue: "4",
      class: "number"
    },{
      displayValue: "5",
      equationValue: "5",
      class: "number"
    },{
      displayValue: "6",
      equationValue: "6",
      class: "number"
    },
    {
      displayValue: "-",
      equationValue: "-",
      class: "operator"
    },
    {
      displayValue: "7",
      equationValue: "7",
      class: "number"
    },{
      displayValue: "8",
      equationValue: "8",
      class: "number"
    },{
      displayValue: "9",
      equationValue: "9",
      class: "number"
    },
    {
      displayValue: "x",
      equationValue: "*",
      class: "operator"
    },
    {
      displayValue: "c",
      equationValue: "",
      class: "clear"
    },
    {
      displayValue: "0",
      equationValue: "0",
      class: "number"
    },
    {
      displayValue: "=",
      equationValue: "",
      class: "eq"
    },
    {
      displayValue: "/",
      equationValue: "/",
      class: "operator"
    },
  ];
  const BtnList = data.map((element) => 
    <Button values={element} />
    );
  const [state, setState] = StateHook({data: ""});

  return (
    <div className="App">
      <h1>Fancy Calculator</h1>
      <form name="calc">
        <table>
          <Output value={state.data} /> 
          <tr>
            <td>
              {BtnList}
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default App;
