import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Desafio-node ${Date.now()}`,
      url: "http://github.com/ahenrique97/repositories/desafio-node",
      techs: ["React, React-native"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const liList = document.getElementById(id);
    const ulList = document.getElementById("ulList");

    ulList.removeChild(liList);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul id="ulList" data-testid="repository-list">
        {repositories.map((repository) => (
          <li id={repository.id} key={repository.title}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
