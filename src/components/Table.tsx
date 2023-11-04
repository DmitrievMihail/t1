import React, { ReactElement } from 'react';
import './Table.css';
import parse from 'html-react-parser';
import { objMap } from '../libs/objmap';

/* eslint-disable */
type THeadData = Array<string>;
type THeadData2 = Array<THeadData>;
export type TBody = {[index: string]: {[index: string]: string}}; // Array<string|number|null>

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
	// console.log(fields);
	let tableHead: TTableHead;
	const tableBody: Array<React.ReactElement> = [];

	const toDelete = (headLine: number, headCell: number) =>
		(headLine in headDelete) && (headCell in headDelete[headLine]) && (headDelete[headLine][headCell] === 1);
	const toMerge = (headLine: number, headCell: number, index : number) =>
		(headLine in headMerge) && (headCell in headMerge[headLine]) && (0 in headMerge[headLine][headCell]) ? headMerge[headLine][headCell][index] : undefined;

	const p: Array<Array<React.ReactElement>> = [];
	if (rotate) { // ======================== Если таблица развёрнута ==========================
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
	} else { // ======================== Если таблица не развёрнута ===========================
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
			/*
			tableBody = objMap(body, (line) =>
				<tr className='body' key={`l${line}`}><td>{line}</td></tr>
			);
			*/
			for (const line in body) {
				const tds: Array<React.ReactElement> = [];
				for (const field in fields) {
					tds.push(<td key={field + line} id={field + line}>{body[line][field]}</td>);
				}
				tableBody.push(<tr className='body' key={`li${line}`} id={`li${line}`}>{tds}</tr>);
			}
	} // ============================ Конец неразвёрнутой таблицы ==========================

	return (
      <table className="MainTable">
		<thead>
			{tableHead}
		</thead>
		<tbody>
			{tableBody}
			{/* {children} */}
		</tbody>
      </table>
    );
};

export default Table;
