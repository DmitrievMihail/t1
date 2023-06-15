import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Table, {THeadTotal} from './components/Table';
import headTotal from './mocks/head1.json';

const App: FC = () => {
  return (
    <div className="App">
      <Table head={headTotal as THeadTotal}>
        <tr>
          <td>Ячейка</td>
        </tr>
      </Table>
    </div>
  );
};

export default App;
