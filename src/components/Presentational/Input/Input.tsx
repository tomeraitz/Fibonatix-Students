import React from 'react';
import './Input.css';

interface Props{
   inputId : string;
   isSpecialCharactersAllowed : boolean,
   updateStudent: any;
   label : {children : any; className:string; htmlFor:string}
   input : {className : any; type: string; name:string; placeholder:string}
}

interface State{
   value: string;
   error: string;
}
class Input extends React.Component<Props>{
   public state:State;
   constructor(props:Props) {
      super(props);
      this.state = { value: '' , error: ''};
   }

   checkValue = (e:any)=>{ // This general input validation for reuse it in different places
      const userValue = e.target.value;
      const {isSpecialCharactersAllowed} = this.props; 
      const {type} = this.props.input;
      const checkIfNumber = userValue[userValue.length -1] % 1 === 0;
      if(type === "text" && checkIfNumber && userValue[userValue.length -1] !== ' '){
         this.setState({error : 'Numbers not allowed'})
         return;
      } 
      if(!isSpecialCharactersAllowed && type === "text"){
         const format = /[!@#$%^&*~`()_+\-=[\]{};':"\\|,.<>/?]+/;
         if(format.test(userValue)){
            this.setState({error : 'Special characters not allowed'})
            return;
         }
      }
      this.setState({value : e.target.value, error : ''});
      this.props.updateStudent && this.props.updateStudent(this.props.inputId,e.target.value )
   }

   render(){
      const { children, ...labelAttributes} = this.props.label
      const { ...InputAttributes} =  this.props.input;
      return (
         <>
            <label {...labelAttributes}>{children}</label>
            <input 
               onChange={this.checkValue} 
               value={this.state.value} 
               {...InputAttributes}
               onKeyPress={(event)=>{
                  event.stopPropagation();
                  if(event.key === 'Enter'){
                     event.preventDefault();
                  }
               }} 
            />
            <span className="input-error">{this.state.error}</span>
         </>
       )
   }
}
export default Input;