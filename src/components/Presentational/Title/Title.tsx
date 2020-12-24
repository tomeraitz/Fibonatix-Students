import './Title.css'

interface Props {
   children: any;
   className : string;
 }

const Title = (props:Props)=>{
   const { children, ...attributes} = props
   return <h1 {...attributes}>{children}</h1>
}
          

export default Title;