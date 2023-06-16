import React, { ReactNode } from 'react';
import './Table.css';
import parse from 'html-react-parser';

/* eslint-disable */
type THeadData = Array<string>;
type THeadData2 = Array<THeadData>;
export type TBody = Array<Array<string|number|null>>

export type THeadTotal = [
	object,
	THeadData2,
	Array <Array<Array<number>>>,
	Array <Array<number>>,
];

type TTableHead = Array<React.ReactElement> | null;
/* eslint-enable */

const Table = ({children, head, rotate} : { children?: React.ReactElement, head: THeadTotal, rotate?: boolean }) => {

	console.log(rotate);

	// eslint-disable-next-line
	const [fields, headData, headMerge, headDelete] = head;

	let tableHead: TTableHead;

	// console.log(headData);
	if (rotate) {
		const p: Array<Array<React.ReactElement>> = [];
		for (const headLine in headData) {
			// console.log(headData[headLine]);
			for (const headCell in headData[headLine]) {
				if (!((headLine in headDelete) && (headCell in headDelete[headLine]) && headDelete[headLine][headCell])) {
					const colSpan = (headLine in headMerge) && (headCell in headMerge[headLine]) && (0 in headMerge[headLine][headCell]) ? headMerge[headLine][headCell][0] : 1;
					const rowSpan = (headLine in headMerge) && (headCell in headMerge[headLine]) && (1 in headMerge[headLine][headCell]) ? headMerge[headLine][headCell][1] : 1;
					if (!p[headCell]) {
						p[headCell] = [];
					}
					const id = `head${headLine}-${headCell}`;
					p[headCell].push(<td
						key={id}
						id={id}
						colSpan={colSpan}
						rowSpan={rowSpan}
					>{parse(headData[headLine][headCell])}</td>);
				}
			}
		}
		tableHead = p.map((x, i) =>
			<tr className='head' key={`head${i}`} id={`head${i}`}>
				{x.map((y) => y)}
			</tr>);
	} else {
		tableHead = null;

	}

	return (
      <table className="MainTable">
		<thead>
			{tableHead}
		</thead>
		<tbody>
			{children}
		</tbody>
      </table>
    );
};

export default Table;
