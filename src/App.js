import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then( res => {      
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const result = await api.post('repositories', {
      "title": "teste",
      "url": "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      "techs": [
        "react",
        "express"
      ]
    })
    setRepositories([...repositories, result.data])
    
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`repositories/${id}`)
    const rest = repositories.filter(element => element.id !== id)
    setRepositories(rest)
  }

  return (
    <div>
      <ul data-testid="repository-list">  
      {
          repositories.map(element => <li 
            key={element.id}>{element.title}
           <button onClick={() => handleRemoveRepository(element.id)}>
            Remover
          </button>
          </li>)
        }
  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
