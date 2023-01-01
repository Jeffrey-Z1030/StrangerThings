
import './App.css';
import React, { useState , useEffect } from 'react';
import Login from './login';
import Post from './getpost';
import SignUp from './signup';
import CreatePost from './createpost';
import ProfilePage from './Profile';
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
  const [token,setToken] = useState(localStorage.getItem('TOKEN_STORAGE_KEY'));
  const [posts,setPosts] = useState([]);

 // useEffect(()=>{
 //   const tokenStorage = localStorage.getItem('TOKEN_STORAGE_KEY');
 //   setToken(tokenStorage)
    
 // },[]);
  


  const setTargetValue = (cb) => {
    return (event) => {
      cb(event.target.value)
    }
  }

  function LogOut(){

    return(
      <button onClick={
        () => {
          localStorage.clear(TOKEN_STORAGE_KEY)
          setToken('');
          alert('You have been logged off')
        }
      }>Log Out</button>
    )
  }

 //const tokenStorage1 = localStorage.getItem('TOKEN_STORAGE_KEY')
 
  return (
    <BrowserRouter>
    <div 
    style={{
      backgroundColor:'#6abadeba'
    }}
    className="App">

      <div>
        <ul className="links">
      <li><Link to='/signup'>SignUp</Link></li>
      <li> <Link to='/login'>Login</Link></li>
      <li> <Link to='/post'>See All Post</Link></li>
     {(token) ?<li> <Link to='/createpost'>Create Post</Link></li> :null}
      {(token) ?<li> <Link to='/profilepage'>My Profile</Link></li> :null}
      {(token) ? <LogOut /> :null}
        </ul>
      </div>
      
      <h1>Welcome to Stranger Things</h1>


    <Route path='/signup'>
    <SignUp/>
    </Route>

    <Route exact path='/login'>
    <Login setToken={setToken}/>
    </Route>

    <Route path='/post'>
    <Post/>
    </Route>
    
    <Route path='/createpost'>
    <CreatePost/>
    </Route>

    <Route path='/profilepage'>
      <ProfilePage/>
    </Route>
 
    </div>
    </BrowserRouter>
  );
  
}

export default App;
