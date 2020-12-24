import React from 'react';
import Table from '../../Presentational/Table/Table';
import Form from '../../Presentational/Form/Form';
import Title from '../../Presentational/Title/Title';
import Input from '../../Presentational/Input/Input';
import Button from '../../Presentational/Button/Button';
import Student from '../../../models/Student';
import './StudentsList.css';

interface Props{
  students : any[][];
  deleteStudents : any;
  startIndex: number;
  endIndex: number;
  moveToNext : any;
  moveToBack: any;
  editStudent : any;
}

interface State{
  isPopupOn : boolean;
  checkedAll : boolean;
  checkedList : number[];
  disabled : boolean;
  student : Student[];
  studentArrayKeys : string[]
  studentInput : Student;
}

class  StudentsList extends React.Component<Props> {
  public state:State;
  constructor(props:Props) {
    super(props);
    this.state = { 
      isPopupOn : false, 
      checkedAll : false,
      checkedList : [], 
      disabled: false,
      student : [],
      studentArrayKeys: ["Id", 'Name', 'Age', 'Gender', 'School' , 'City'],
      studentInput : {
        id: -1,
        name: '',
        age: -1,
        gender: '',
        school: '',
        city: '',
      }
    };
 }

 deleteStudents = (event:any,id:number) =>{
  event.stopPropagation();
   const idArray = id*1 < 0 ? [...this.state.checkedList] : [id];
   this.props.deleteStudents(idArray);
   if(id*1 < 0){
    this.setState(prevState => ({
      ...prevState,   
      checkedAll : false,
      checkedList : []
    }));
   }
 }

  onChecked = (id:number) =>{
    let checkedList = [...this.state.checkedList]
    const checkedAll = id*1 > 0 ? this.state.checkedAll : !this.state.checkedAll;
    const studentIndex =  checkedList.findIndex(studentId=> studentId === id*1);
    if(id*1=== -1 && checkedAll) checkedList = [...this.props.students].map(arr=>arr[0]);
    else if(id*1=== -1 && !checkedAll) checkedList = [];
    else if(id*1 > 0 && studentIndex === -1) checkedList.push(id*1);
    else if(id*1 > 0 && studentIndex > -1) checkedList.splice(studentIndex, studentIndex +1)
    this.setState(prevState => ({
          ...prevState,   
          checkedAll,
          checkedList,
    }));
  }

  updateStudent = (key, value) =>{
    const studentInput = {...this.state.studentInput};
    studentInput[key.toLowerCase()] = value;
    this.setState({studentInput})
  }

  editStudent = (event:any) =>{
    event.preventDefault();
    const arrayChanges = [];
    for(let key in this.state.studentInput){
      if(key !== 'id'){
        if(typeof this.state.studentInput[key] === 'number' ){
          if(this.state.studentInput[key] > -1) arrayChanges.push({[key] :this.state.studentInput[key]})
        }
        else{
          if(this.state.studentInput[key] !== '' ) arrayChanges.push({[key] :this.state.studentInput[key]})
        }
      }
    }
    if(this.props.editStudent && arrayChanges.length > 0){
      this.props.editStudent(this.state.studentInput.id, arrayChanges, this.closePopUp);
    } 
  }
  pickStudent = (event:any,id:number) =>{
    event.stopPropagation();
    if(!(event.target.type === 'checkbox') 
        && !(event.target.querySelector('input')) 
        && !(event.target.querySelector('svg'))
        && !(event.target.nodeName === "path")){
           const studentArray = this.props.students.find(arr=>arr[0] === id*1 );
           const student = studentArray ? 
                           studentArray.map((value, index:number)=>{return {[this.state.studentArrayKeys[index]] : value}})
                           : [];
           student.splice(0,1)
           const studentInput = {...this.state.studentInput};
           studentInput.id = id;
           this.setState({isPopupOn : true, student, studentInput});
    } 
  }
  
  stopPropagation =(event:any)=>{
    event.stopPropagation();
  }

  closePopUp =() =>{
    this.setState({isPopupOn : false,
    studentInput : {
      id: -1,
      name: '',
      age: -1,
      gender: '',
      school: '',
      city: '',
    }})
  }
  
  render(){
    const {isPopupOn ,checkedAll, checkedList, disabled,student, studentArrayKeys} = this.state;
    const {startIndex, endIndex, moveToNext, moveToBack} =this.props;

    return (
      <div className="container">
        <div className={`modal-big second-bg`}>
          <Table 
              tableTittles={['Checkbox','Delete', ...studentArrayKeys ]}
              trAttributes={{className:"table-row"}}
              theadAttributes={{className:"primary-bg second-color Table-Title"}}
              rows={this.props.students.map(arr=>arr=['Checkbox', 'Delete',...arr])}
              onClickRow={this.pickStudent}
              checked={checkedAll}
              onChecked={this.onChecked}
              onDelete={this.deleteStudents}
              checkedList={checkedList}
            />
        </div>

        <div className="table-range">
            <span onClick={ moveToBack} id="previous">{`${`<`} Previous`}</span>
            <p id="range">{`From ${startIndex} - ${endIndex}`}</p>
            <span onClick={ moveToNext} id="next">{`Next ${`>`}`}</span>
        </div>

        {isPopupOn && 
          <div  onClick={this.closePopUp} className="popup">
            <Form onClick={this.stopPropagation} className="modal-small second-bg">
                <Title className="title-bg">Edit Student</Title>
                {student.map((obj:any, index:number)=>{
                  const type = obj.Age ? "number" : "text"
                  return (
                      <div className="input-container" key={index}>
                          <Input 
                          updateStudent={(key,value)=>this.updateStudent(key,value)}
                          inputId={`${Object.keys(obj)}`}
                          isSpecialCharactersAllowed={false}
                          label={{children : `Student ${Object.keys(obj)}`, className:"label", htmlFor:`${Object.keys(obj)}`}}
                          input={{className:"input", type:type ,name:`${Object.keys(obj)}`, placeholder:`Change user ${Object.keys(obj)} from ${Object.values(obj)}`}}
                          >
                          </Input>
                      </div>
                         )
                })}
                <Button onClick={this.editStudent} className={"button primary-bg"} disabled={disabled}>Edit</Button>
            </Form>
        </div> }
      </div>
    );
  }
}

export default StudentsList;
