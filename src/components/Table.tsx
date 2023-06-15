import React from 'react';
import './Table.css';

/* eslint-disable */
type THeadData = Array<string>;
type THeadData2 = Array<THeadData>;

export type THeadTotal = [
	object,
	THeadData2,
	Array <Array<Array<number>>>,
	Array <Array<number>>,
];
/* eslint-enable */

const Table = ({children, head} : { children: React.ReactElement, head: THeadTotal }) => {

	// eslint-disable-next-line
	const [fields, headData, headMerge, headDelete] = head;

	// console.log(headData);
	const p: Array<React.ReactElement> = [];
	for (const headLine in headData) {
		for (const headCell in headData[headLine]) {
			if (!((headLine in headDelete) && (headCell in headDelete[headLine]) && headDelete[headLine][headCell])) {
				const colSpan = (headLine in headMerge) && (headCell in headMerge[headLine]) && (0 in headMerge[headLine][headCell]) ? headMerge[headLine][headCell][0] : 1;
				const rowSpan = (headLine in headMerge) && (headCell in headMerge[headLine]) && (1 in headMerge[headLine][headCell]) ? headMerge[headLine][headCell][1] : 1;
				p[headCell] = <td colSpan={colSpan} rowSpan={rowSpan}>{headData[headLine][headCell]}</td>;
			}
		}
	}

	return (
      <table className="MainTable">
		<thead>
			{p.map((x) => <tr className='head'>{x}</tr>)}
		</thead>
        {children}
      </table>
    );
};

export default Table;

/*

list($fields,$head_data,$head_merge,$head_delete)=$data[23];

$p=array();
foreach($head_data AS $hk=>$hl){ // Перевёрнутый заголовок по таблице распихиваем
	foreach($hl AS $k=>$v){
		if(!isset($head_delete[$hk][$k])){
			@$p[$k].="<td class='head' ".(isset($head_merge[$hk][$k])?' rowspan='.$head_merge[$hk][$k][1].' colspan='.$head_merge[$hk][$k][0].' ':'').">".$v."</td>";
		}
	}
}

$line=0;
foreach($fields AS $k=>$v){
	$t.="<tr>".$p[$line];
	$val='';
	if($v[0]=='+'){
		foreach(explode(',',substr($v,1,100)) as $vv){
			@$val+=@$x[$vv];
		}
		$t.="<td id='".$k."' class='auto'>".$val."</td>";
	}elseif($v[0]=='~'){
		$val=@$x[substr($v,1,100)];
		$t.="<td id='".$k."' class='auto'>".$val."</td>";
	}else{
		if(isset($x[$k])){
			$val=@$x[$k];
			if($v==1 and strlen($val)){
				$val=$val==1?'Да':'Нет';
			}
		}
		if($flag){
			$t.="<th id='".$k."' class='".$v."'>".$val."</th>";
		}else{
			$t.="<td id='".$k."' class='".$v."' style='background:#EEE;text-align:center;' onclick='alert(\"Заблокировано\")'>".$val."</td>";
		}
	}
	$t.="</tr>";
	$line++;
}

*/
