import React, { ReactNode } from 'react';
import './Table.css';
import parse from 'html-react-parser';

/* eslint-disable */
type THeadData = Array<string>;
type THeadData2 = Array<THeadData>;
export type TBody = Array<object>; // Array<string|number|null>

export type THeadTotal = [
	object,
	THeadData2,
	Array <Array<Array<number>>>,
	Array <Array<number>>,
];

type TTableHead = Array<React.ReactElement> | null;
/* eslint-enable */

const Table = ({children, head, rotate, body} : { children?: React.ReactElement, head: THeadTotal, rotate?: boolean, body: TBody }) => {

	// eslint-disable-next-line
	const [fields, headData, headMerge, headDelete] = head;
	let tableHead: TTableHead;

	const toDelete = (headLine: number, headCell: number) =>
		(headLine in headDelete) && (headCell in headDelete[headLine]) && (headDelete[headLine][headCell] === 1);
	const toMerge = (headLine: number, headCell: number, index : number) =>
		(headLine in headMerge) && (headCell in headMerge[headLine]) && (0 in headMerge[headLine][headCell]) ? headMerge[headLine][headCell][index] : undefined;

	const p: Array<Array<React.ReactElement>> = [];
	if (rotate) {
		headData.forEach((_, headLine) => {
			headData[headLine].forEach((_, headCell) => {
				if (!toDelete(headLine, headCell)) {
					if (!p[headCell]) {
						p[headCell] = [];
					}
					const id = `head${headLine}-${headCell}`;
					p[headCell].push(<td
						key={id}
						id={id}
						colSpan={toMerge(headLine, headCell, 0)}
						rowSpan={toMerge(headLine, headCell, 1)}
					>{parse(headData[headLine][headCell])}</td>);
				}
			});
		});
		tableHead = p.map((x, i) =>
			<tr className='head' key={`head${i}`} id={`head${i}`}>
				{x.map((y) => y)}
			</tr>);
	} else {
		tableHead = headData.map((_, headLine) =>
			<tr className='head' key={`head${headLine}`} id={`head${headLine}`}>
				{headData[headLine].map((_, headCell) => {
					return toDelete(headLine, headCell) ?
						null
					:
						<td id={`head${headLine}-${headCell}`} key={`head${headLine}-${headCell}`}
							rowSpan={toMerge(headLine, headCell, 0)}
							colSpan={toMerge(headLine, headCell, 1)}
						><b>{headLine}-{headCell}.{}</b> {parse(headData[headLine][headCell])}</td>;
				})}
			</tr>);
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
