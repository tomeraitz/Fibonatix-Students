import './Button.css'

interface Props {
   children: any;
   className : string;
   disabled : boolean;
   onClick : any;
 }

const Button = (props:Props)=>{
   const { children, ...attributes} = props
   return <button {...attributes}>{children}</button>
}
          

export default Button;