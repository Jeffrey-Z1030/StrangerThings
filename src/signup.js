
import { useState, useEffect} from 'react';

function SignUp(){
const [username,SetUsername] = useState('')
const [password,SetPassword] = useState('')  
const [token,setToken] = useState('');

const TOKEN_STORAGE_KEY = 'test_token';
const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
const COHORT_NAME = '2209-FTB-ET-WEB-PT';


//function SignUpButton(){
//  if(!token){
//    console.log('fail')
//  }else{
//    console.log('work')
//  }
// }





const signUpStyle = {
         width: '382px',
        overflow: 'hidden',  
        margin: 'auto',   
        padding: '80px',  
        background: '#23463f',  
        borderRadius: '15px', 
        textAlign:'center',
        display:'flex',
        flexDirection:'column'
        
}



useEffect(()=>{
    const tokenStorage = localStorage.getItem('TOKEN_STORAGE_KEY');
    setToken(tokenStorage)
  },[]);
  


const setTargetValue = (cb) => {
    return (event) => {
      cb(event.target.value)
    }
  }

return (
    <div 
    style={{
      margin:'0',
      padding:'0',
      backgroundColor:'#6abadeba'
    }}
    className="App">

      <h2
      style ={{
        fontFamily:'ariel'
      }}
      >SignUp Page</h2>
      <form
      style = {signUpStyle}
      onSubmit={
        async (event) => {
          event.preventDefault();
        
          try{
            const response = await fetch(
              `${BASE_URL}${COHORT_NAME}/users/register`,
              {
                method:"POST",
                headers: {
                  'Content-type' : 'application/json'
                },
                body:JSON.stringify({
                  user:{
                  username,
                  password,
                }
              }),
                
                
                
              }).then(response => response.json())
              .then(response => {
                console.log(response)
                console.log(response.data.token)
                const responseToken = response.data.token
                localStorage.setItem(TOKEN_STORAGE_KEY, responseToken)
                setToken(responseToken)
                console.log(localStorage.getItem(TOKEN_STORAGE_KEY));
                console.log("You have signed up.")
                
                
              })
          
              
            
            }
            catch(error){
              console.log("failed to register")
              console.log(error)
            }
            

         
      }
      
      
    }
    

    
    
      >
        <label>Username:
          <input
          placeholder='Enter username'
          onChange={setTargetValue(SetUsername)} 
          value={username}></input>
        </label>
        <label>Password:
          <input 
          placeholder='Enter password'
          onChange={setTargetValue(SetPassword)}
          value={password} type="password"></input>
        </label>
        <button>Sign Up</button>
      </form>
      </div>



)}

export default SignUp;