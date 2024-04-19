// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

  
function MyApp() {
    const [characters, setCharacters] = useState([]);
    // function removeOneCharacter(index) {
    //     const updated = characters.filter((character, i) => {
    //       return i !== index;
    //     });
    //     setCharacters(updated);
    // }
    function removeOneCharacter(index) {
        const characterId = characters[index].id; // Get the ID of the character to be deleted
        fetch(`http://localhost:8000/users/${characterId}`, { method: 'DELETE' }) // Make DELETE request to backend
            .then((res) => {
                if (res.status === 204) {
                    const updated = characters.filter((character, i) => {
                              return i !== index;
                            });
                            setCharacters(updated);
                } else if (res.status === 404) {
                    // If resource not found, log an error message
                    console.error('Resource not found. User not deleted.');
                } else {
                    // For other status codes, log an error message
                    console.error('Error deleting user.');
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    }
    function updateList(person) { 
        postUser(person)
            .then((response) => response.json())
            .then((data) => {
                setCharacters([...characters, { ...person, id: data.id }]); // Include the returned ID in the new user object
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    }
    
    // function updateList(person) { 
    //     postUser(person)
    //         .then(() => setCharacters([...characters, person]))
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
    // function updateList(person) { 
    //     postUser(person)
    //       .then((response) => {
    //         if (response.status === 201) {
    //           setCharacters([...characters, person]);
    //         } else {
    //           console.error("Failed to add user:", response.statusText);
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error adding user:", error);
    //       });
    //   }
    // function updateList(person) { 
    //     postUser(person)
    //         .then(() => {
    //             setCharacters([...characters, person]);
    //             // Fetch updated user list after adding a new user
    //             fetchUsers()
    //                 .then((res) => res.json())
    //                 .then((json) => setCharacters(json["users_list"]))
    //                 .catch((error) => { console.error(error); });
    //         })
    //         .catch((error) => {
    //             console.error("Error adding user:", error);
    //         });
    // }
    
    
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

    useEffect(() => {
    fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
        <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter} 
        />
        <h1>Submit Form</h1>
        <Form handleSubmit={updateList} />
        </div>
    );
    
}


export default MyApp;