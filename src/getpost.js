import { findByLabelText } from '@testing-library/react';
import React, { useState } from 'react';


function Post(){

    const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
    const COHORT_NAME = '2209-FTB-ET-WEB-PT';
    const TOKEN_STORAGE_KEY = localStorage.getItem("TOKEN_STORAGE_KEY")
    

    const [message , setMessage] = useState('')


    function sendMessage(e){
        const postID = e.target.getAttribute('postID');
        

        const response = fetch(`${BASE_URL}${COHORT_NAME}/posts/${postID}/messages`,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${TOKEN_STORAGE_KEY}`
            },
            body: JSON.stringify({
                message:{
                    content:`${message}`,
                }
            })
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            console.log(message)
            console.log(postID)
        })
        .catch(console.error)
        
    }

    const handleMessage = (event) => {
        setMessage(event.target.value)
    }



  




    function getPosts(){
        try{
            const response = fetch(`${BASE_URL}${COHORT_NAME}/posts`, {           
            method:'GET',
            headers:{
                'Content-Type' :  'application/json',
                'Authorization' : `Bearer ${TOKEN_STORAGE_KEY}`        
             }})
            
            .then(response => response.json())
            .then(response => {
                console.log(response.data.posts);
                setPosts(response.data.posts)
                console.log(response)
            })
            
        }catch{
            console.log(console.error);
        }
    }



   function deletePost(e){
    const postID = e.target.getAttribute('postID');
    



    try{
        const response = fetch(`${BASE_URL}${COHORT_NAME}/posts/${postID}`,{
            method:'DELETE',
            headers:{
                'Content-Type' :  'application/json',
                'Authorization' : `Bearer ${TOKEN_STORAGE_KEY}`        
             }
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            console.log(postID)
            alert('Deleted post, Please refresh')
            
        })
    }catch{
        console.log(console.error)
        alert('Failed to delete')
    }
   }



  const [posts,setPosts] = useState([]);


  const postCardStyle= {
    display:'flex',
    width:'50%',
    height:'25%',
    flexDirection:'column',
    justifyContent:'space-around',
    alignSelf:'center',
    textAlign:'center',
    border:'solid',
    padding:'5px',
    margin:'auto'
  }


    return (
        <div>
        <button onClick={getPosts}>Get Posts</button>
        <div>
            {
                posts.map((post) => {
                        const isAuthor = post.isAuthor;

                    return (
                        <div style={postCardStyle} key={post._id}>
                            <li
                            style={{
                                listStyleType:'none'
                            }}
                            >
                            <h3>Title:{post.title}</h3>
                            <ul>Description:{post.description}</ul>
                            <ul>Price:{post.price}</ul>
                            <ul>Location:{post.location}</ul>
                            <ul>Post from {post.author.username}</ul>
                            </li>
                            <form
                            onSubmit={(e)=>{
                                setMessage('')
                                e.preventDefault();
                            }}
                            >
                            <input
                            placeholder='Type message here'
                            onChange={handleMessage}
                            value={message}
                            ></input>
                            <button
                            postID={post._id}
                            onClick={sendMessage}
                            >Send</button>
                            </form>
                            
                           { 
                           (isAuthor)? <button onClick={deletePost}
                            postID={post._id}
                            >Delete</button>:null
                           }
                        </div>
                    )

                })
            }
            
        </div>
        
        </div>
        
    )
}

export default Post