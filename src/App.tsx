import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Table, {THeadTotal, TBody} from './components/Table';
import headTotal from './mocks/head1.json';

const tbody = {
  1: {'a': 5, 'b': 10},
  5: {'a': 3},
};
// body={tbody as TBody}

const App: FC = () => {
  return (
    <div className="App">
      <Table head={headTotal as THeadTotal} rotate>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
      </Table>
    </div>
  );
};

export default App;
