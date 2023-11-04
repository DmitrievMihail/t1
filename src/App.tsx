import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Table, {THeadTotal, TBody} from './components/Table';
import tableHead from './mocks/head1.json';
// import tableBody from './mocks/table1.json';

// import { useLocalStorage } from "@uidotdev/usehooks";

const tbody: TBody = {
  '5': {a: '1', b: '2', c: '3', d: '4'},
  '8': {a: '3'},
};
// body={tbody as TBody}

const App: FC = () => {
  // const [drawing, saveDrawing] = useLocalStorage("drawing", null);
  return (
    <div className="App">
      <Table head={tableHead as THeadTotal} body={tbody as TBody}>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
      </Table>
    </div>
  );
};

export default App;
