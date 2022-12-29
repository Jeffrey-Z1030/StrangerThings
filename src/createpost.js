import { useState } from "react";


function CreatePost(){

    const [ title, setTitle] = useState('')
    const [ description, setDescription] = useState('')
    const [ price, setPrice] = useState('')
    const [ location, setLocation] = useState('')



    const BASE_URL= 'https://strangers-things.herokuapp.com/api/';
    const COHORT_NAME = '2209-FTB-ET-WEB-PT';
    const TOKEN_STORAGE_KEY = localStorage.getItem("TOKEN_STORAGE_KEY")
    
 function sendPost(props){
    const response = fetch(`${BASE_URL}${COHORT_NAME}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN_STORAGE_KEY}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver: true
          }
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result);
        })
        .catch(console.error);
 }

 const handleLocation = (event) => {
  setLocation(event.target.value)
 }

 const handleTitle = (event) => {
  setTitle(event.target.value)
 }

 const handlePrice = (event) => {
  setPrice(event.target.value)
 }

 const handleDescription = (event) => {
  setDescription(event.target.value)
 }
    




    return (
        <div style={{
            display:'flex',
            flexDirection:'column'
        }}>
            <form onSubmit={(e)=>{
              setTitle('')
              setDescription('')
              setPrice('')
              setLocation('')
              e.preventDefault();
            }}>


                <label>Title:
                    <input
                    placeholder="Enter Title"
                    onChange={handleTitle}
                    value={title}
                    ></input>
                 </label>

                 
                <label>Description:
                    <input
                    placeholder="Enter Description"
                    onChange={handleDescription}
                    value = {description}
                    ></input>
                </label>


                <label>Price:
                    <input
                    placeholder="Enter Price"
                    onChange={handlePrice}
                    value={price}
                    ></input>
                </label>


                <label>Location:
                    <input
                    placeholder="Enter Location"
                    onChange={handleLocation}
                    value={location}
                    ></input>
                </label>
                <button onClick={sendPost}>Submit</button>
            </form>
        </div>
    )

}

export default CreatePost