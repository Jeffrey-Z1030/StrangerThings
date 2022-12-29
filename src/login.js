import React, { useState, useEffect} from "react";
import Post from "./getpost";


//const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
//const COHORT_NAME = '2209-FTB-ET-WEB-PT';
//const TOKEN_STORAGE_KEY = ''




function Login(){


 
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


    const changePage = () => {
    Post()
    }
    
    
    



  
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
                localStorage.setItem('TOKEN_STORAGE_KEY',responseToken)
                
                setToken(responseToken);
                
              
                
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
  


    function LogOut(){

      return(
        <button onClick={
          () => {
            localStorage.clear(TOKEN_STORAGE_KEY)
            alert('You have been logged off')
          }
        }>Log Out</button>
      )
      
     // localStorage.clear(TOKEN_STORAGE_KEY)
      
    //  alert('you have been logged out')
      
    }

    function MakeHeaders(){
      const currentUser = localStorage.getItem(TOKEN_STORAGE_KEY)
      
      
      return(
        <div>
          <p>{currentUser}</p>
          <LogOut/>
        </div>
      )
    }

  
      
    
 
  
}

export default Login;