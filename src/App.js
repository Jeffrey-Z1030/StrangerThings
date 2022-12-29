import logo from './logo.svg';
import './App.css';
import React, { useState , useEffect } from 'react';
import Login from './login';
import Post from './getpost';
import SignUp from './signup';
import CreatePost from './createpost';
import { BrowserRouter,Route,Link } from 'react-router-dom';





const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
const COHORT_NAME = '2209-FTB-ET-WEB-PT';
const TOKEN_STORAGE_KEY = 'test_token';


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

function App() {

  const [username,SetUsername] = useState('')
  const [password,SetPassword] = useState('')  
  const [token,setToken] = useState('');
  const [posts,setPosts] = useState([]);

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
    <BrowserRouter>
    <div 
    style={{
      margin:'0',
      padding:'0',
      backgroundColor:'#6abadeba'
    }}
    className="App">

      <div
      style ={{
        display:'flex',
        justifyContent:'space-evenly'
      }}>
        <Link to='/signup'>SignUp</Link>
        <Link to='/login'>Login</Link>
        <Link to='/post'>See All Post</Link>
        <Link to='/createpost'>Create Post</Link>
        <p>Hello {username}</p>
      </div>
      
      <h1>Stranger Things</h1>


    <Route path='/signup'>
    <SignUp/>
    </Route>

    <Route exact path='/login'>
    <Login/>
    </Route>

    <Route path='/post'>
    <Post/>
    </Route>
    
    <Route path='/createpost'>
    <CreatePost/>
    </Route>
 
    </div>
    </BrowserRouter>
  );
  
}

export default App;
