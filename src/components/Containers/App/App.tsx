import React from 'react';
import StudentsList from '../StudentsList/StudentsList';
import getStudents from '../../../services/httpRequest.service';
import Student from '../../../models/Student';
import './App.css';

interface State{
  students : Student[];
  studentsFilterArray : any[];
  startIndex : number;
  endIndex : number
}

class  App extends React.Component {
  public state:State;
  constructor(props:any) {
    super(props);
    this.state = {
      students :  [], 
      studentsFilterArray: [],
      startIndex : 0,
      endIndex : 0};
 }

 editStudent = (id:number, arrayChanges: any[], closePopUp:any=null, isInTest:boolean=false) =>{
   const student = this.state.students.find(obj=>obj.id === id);
   arrayChanges.forEach(obj=>{
    student[`${Object.keys(obj)}`] = Object.values(obj)[0]
   })
   const students = [...this.state.students];
   this.arrangeStudents(this.state.startIndex, students, true);
   this.setState({students},()=>closePopUp && closePopUp());
   !isInTest && localStorage.setItem("students", JSON.stringify(students));
 }

 arrangeStudents = (startIndex:number, students:Student[], isDelete:boolean=false)=>{
   const copyStudents = [...students];
   const start = this.state.startIndex;
   const end = this.state.endIndex
   const endIndex = !isDelete ? 
                    startIndex >=  start? 
                    (end + 8 <= copyStudents.length -1) ? end + 8 : copyStudents.length 
                    : (end - this.state.studentsFilterArray.length < 8 && this.state.students.length > 7) ? 8 :end - this.state.studentsFilterArray.length
                    : end;
   const studentsFilterArray = copyStudents.slice(startIndex, endIndex).map(obj=>Object.values(obj));
   this.setState(prevState => ({
    ...prevState,   
    studentsFilterArray,
    endIndex,
    startIndex
  }));
 }

 moveToBack = () =>{
  const startIndex = (this.state.startIndex - 8 > 0) ? this.state.startIndex - 8 : 0;
  this.arrangeStudents(startIndex, this.state.students);
}

 moveToNext = () =>{
   if(this.state.startIndex + 8 >  this.state.students.length) return;
   const startIndex = (this.state.startIndex + 8 <= this.state.students.length -1) ? this.state.startIndex + 8 : this.state.students.length -1;
   this.arrangeStudents(startIndex, this.state.students);
 }

 deleteStudents = (idArray : number[], isInTest:boolean=false)=>{
  const copyStudents = [...this.state.students];
  function deleteArray(idArray, copyStudents, i=0){
      if(i === idArray.length) return copyStudents;
      else{
        const index = copyStudents.findIndex(obj=>obj.id === idArray[i]);
        if(index > -1) copyStudents.splice(index, 1)
        deleteArray(idArray, copyStudents, i+1)
      }
  }

  deleteArray(idArray, copyStudents);
    this.arrangeStudents(this.state.startIndex, copyStudents, true);
    this.setState({students:copyStudents});
    !isInTest && localStorage.setItem("students", JSON.stringify(copyStudents));
 }

 async componentDidMount(){
   const localStudent = localStorage.getItem("students")
   if(!localStudent){
    const data =await getStudents();
    const tenMore = [...data].map(value=>value={...value, id:value.id+10})
    const students = [...data, ...tenMore]
    localStorage.setItem("students", JSON.stringify(students));
    this.arrangeStudents(0, students);
    this.setState({students})
   }
   else{
    this.arrangeStudents(0, JSON.parse(localStudent));
    this.setState({students: JSON.parse(localStudent)})
   }
  }

  render(){
    const {studentsFilterArray, startIndex, endIndex} = this.state
    return (
      <div className="App third-bg">
       {studentsFilterArray && <StudentsList 
                                  students={studentsFilterArray}
                                  deleteStudents={this.deleteStudents}
                                  startIndex={startIndex}
                                  endIndex={endIndex}
                                  moveToNext={this.moveToNext}
                                  moveToBack={this.moveToBack}
                                  editStudent={this.editStudent}/>} 
      </div>
    );
  }
}

export default App;
