import React from "react";
import { useState } from "react";


function ProfilePage(){


    const[posts,setPosts] = useState([]);
    const[messages,setMessages] = useState([]);

    const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
    const COHORT_NAME = '2209-FTB-ET-WEB-PT';
    const TOKEN_STORAGE_KEY = localStorage.getItem('TOKEN_STORAGE_KEY');

function getMyPosts(){
    const response = fetch(`${BASE_URL}${COHORT_NAME}/users/me`,{
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${TOKEN_STORAGE_KEY}`
        },
    }).then(response => response.json())
    .then(response => {
        console.log(response.data.posts)
     //   console.log(response.data.messages)
     //   setMessages(response.data.messages)
        setPosts(response.data.posts)
    }).catch(console.error)
    
}


function getMessages(){
    const response = fetch(`${BASE_URL}${COHORT_NAME}/users/me`,{
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${TOKEN_STORAGE_KEY}`
        },
    }).then(response => response.json())
    .then(response => {
        
        console.log(response.data.messages)
        setMessages(response.data.messages)
        console.log(response)
        
        
    }).catch(console.error)
    
}


const postCardStyle= {
    display:'flex',
    width:'50%',
    height:'25%',
    flexDirection:'column',
    justifyContent:'space-around',
    alignSelf:'center',
    textAlign:'center',
    border:'solid',
    padding:'5px'
  }

return (
    <div>
        <h1>My Profile</h1>
        <button
        onClick={getMyPosts}>Get my Posts</button>
        <button onClick={getMessages}>Show My messages</button>


        
            {
                messages.map((message)=>
                {
                    return<div>
                        <div>
                            <p>{message.content}   ||  From: {message.fromUser.username}</p>
                        </div>
                    </div>
                    
                }
                )
            }
        
        
      

        <div>
            
            {
                posts.map((post) => {
                    const isActive = post.active

                    if(isActive){
                        return (    
                            <div style={postCardStyle} key={post._id}>
                                <li 
                                 style={{
                                    listStyleType:'none'
                                    }}>
                                        <ul>{post.title}</ul>
                                        <ul>{post.description}</ul>
                                        <ul>{post.price}</ul>
                                        <ul>{post.location}</ul>
                                </li>
                            </div>
                            
                                )       
                            }
                            
                }
            )}
            
            
        </div>
    </div>
    
    


    
)



}

export default ProfilePage