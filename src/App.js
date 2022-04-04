import React, { useEffect, useState } from 'react'
import Form from './Form'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState({})
  

  const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((result) => {
        setUsers(result)
        setIsLoading(false)
      })
      .catch((error) => {
        setHasError(true)
        setIsLoading(false)
        setErrorMessage(error.message)
      })
  }

  const handleEdit = (id, title, body) => {
    setIsEditing(true)
    setData({
      id,
      title,
      body
    })
  }

  const deleteUsers = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='App'>
      <h1>Random Users</h1>
      <Form userId={1} isEditing={isEditing} data={data} />
      <br />
      <br />
      {hasError ? <p>{errorMessage}</p> : null}
      {!isLoading ? (
        <ul>
          {users.map(({ id, title, body }) => (
            <>
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleEdit(id, title, body)}>Edit</button>
                <button onClick={() => deleteUsers(id)}>Delete</button>
              </li>
              <hr />
            </>
          ))}
        </ul>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  )
}

export default App
