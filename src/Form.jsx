import React, { useEffect, useState } from 'react'

const Form = ({ userId, isEditing, data }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = { userId, title, body }
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      alert('Form Submitted')
      return response.json()
    })
  }

  const updateUsers = (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...data,
        title,
        body,
        userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  useEffect(() => {
    setTitle(data.title)
    setBody(data.body)
  }, [isEditing])

  return (
    <div>
      <form onSubmit={isEditing ? updateUsers : handleSubmit}>
        <h3>Create Post</h3>
        <div>userId {userId}</div>
        <div>
          <input
            type='text'
            name='title'
            placeholder='Input Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <input
            type='text'
            name='body'
            onChange={(e) => setBody(e.target.value)}
            placeholder='Input Body'
            value={body}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Form
