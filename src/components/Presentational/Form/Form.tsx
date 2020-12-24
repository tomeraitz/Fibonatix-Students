import './Form.css'

interface Props {
   children: any;
   className : string;
   onClick: any;
 }

const Form = (props:Props)=>{
   const { children, ...attributes} = props
   return <form {...attributes}>{children}</form>
}
          

export default Form;