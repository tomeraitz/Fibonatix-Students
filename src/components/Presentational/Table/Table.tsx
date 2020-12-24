import './Table.css'
import { FaTrashRestoreAlt } from "react-icons/fa";
interface Props{
   tableTittles : string[];
   trAttributes : {className:string};
   theadAttributes: {className:string};
   rows: string[][];
   onClickRow : any;
   checked : boolean;
   onChecked: any;
   checkedList: number[];
   onDelete : any;
}
const Table = (props: Props)=>{
   const { tableTittles, trAttributes, rows, theadAttributes, onClickRow=null, checked, onChecked,checkedList, onDelete} = props
   const findIfChecked =(id:any):boolean=>{
      const idNumber = id*1;
      if(idNumber > -1) return !!checkedList.find(studentId=>studentId===idNumber);
      else if(idNumber === -1 && checked) return true;
      else if(idNumber === -1 && !checked) return false;
      else return true;
   }
   const checkDisplay = (id:any):string=>{
      const idNumber = id*1;
      if(idNumber > -1) return "inline-block";
      else if((idNumber === -1 && checked) || checkedList.length > 0)return "inline-block";
      else return "none";
   }
   const findChildRow = (nameType : string, id : any="-1"): any=>{
      if(nameType === "Checkbox") {
         return <input type="checkBox" checked={findIfChecked(id)} id={id} onChange={(event)=>onChecked(event.currentTarget.id)}/>;
      }
      else if(nameType === "Delete") return <FaTrashRestoreAlt onClick={(e)=>onDelete(e,id)} display={checkDisplay(id)}/>;
      else return nameType;
   }
   return (
      <table>
         <thead {...theadAttributes}>
            <tr {...trAttributes}>
                  {tableTittles && tableTittles.map((name:string)=>{
                     return <th key={name}>{findChildRow(name)}</th>
                  })}
            </tr>
         </thead>
         <tbody>
            {rows && rows.map((row:any,indexRow:number)=>{
               return (
               <tr key={row[2]}  {...trAttributes} onClick={(e)=>onClickRow(e, row[2])}>
                  {row.map((item:string,index:number)=>{
                    return <td key={`${indexRow}${index}`}>{findChildRow(item, row[2])}</td>
                  }
         
                  )}
               </tr>)
            })}
         </tbody>
    </table>
   )
}
          

export default Table;

