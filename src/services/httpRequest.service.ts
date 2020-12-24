import axios from 'axios';


export default async  function getStudents():Promise<any>{
 const res = await axios.get(`https://run.mocky.io/v3/a94ec39c-910c-4a21-bf8a-332e84fe559e`);
 try{
     return res.data
 }
 catch(e:any){
     console.error(e)
     return [];
 }
}