import React, { useState, useEffect} from "react";
import Post from "./getpost";
import { useHistory } from "react-router-dom";

//const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
//const COHORT_NAME = '2209-FTB-ET-WEB-PT';
//const TOKEN_STORAGE_KEY = ''




function Login(props){

const navigate = useHistory()
 
 // useEffect(()=>{
 //   localStorage.setItem('tokenKey',JSON.stringify(token));
 // }
 // )

 const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
 const COHORT_NAME = '2209-FTB-ET-WEB-PT';
 const TOKEN_STORAGE_KEY = ''
 


  const setTargetValue = (cb) => {
    return (event) => {
      cb(event.target.value)
    }
  }
    const [token,setToken] = useState('');
    const [username,SetUsername] = useState('');
    const [password,SetPassword] = useState('')


    
    
    
    



  
    return (


        
        <div>
            <form 
            onSubmit={
        async (event) => {
          event.preventDefault();
        
          try{
            const response = await fetch(
              `${BASE_URL}${COHORT_NAME}/users/login`,
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
                console.log(response.data.token)
                console.log("You have been logged in.")
                const responseToken = response.data.token;
                console.log(responseToken)
                console.log(response)
                localStorage.setItem('TOKEN_STORAGE_KEY',responseToken)
                setToken(responseToken);
                props.setToken(responseToken)
                
                  navigate.push('/post')
                
              
                
              })
              
            }
            catch(error){
              console.log("failed to login")
              console.log(error)
            }

      }
    }
      >
            
            
            



            <label>Username:
                <input
                placeholder="Enter Username"
                onChange={setTargetValue(SetUsername)}
                value={username}>
                </input>
            </label>
            <label>Password
                <input
                placeholder="Enter password"
                onChange={setTargetValue(SetPassword)}
                value={password} type='password'>
                </input>
            </label>
            <button>Login</button>
            
            </form>

            
            <MakeHeaders/>
            
            
            
            

        </div>

    )
  




    function MakeHeaders(){
      const currentUser = localStorage.getItem(TOKEN_STORAGE_KEY)
      
      
      return(
        <div>
          <p>{currentUser}</p>
          
        </div>
      )
    }

  
      
    
 
  
}

export default Login;