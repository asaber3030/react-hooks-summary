import { useOptimistic, useRef, useState } from "react";

const InitialTodos = ({ initialTodos }) => {

  const [todos, setTodos] = useState(initialTodos)
  const [opTodos, setOpTodos] = useOptimistic(todos)

  const inputRef = useRef(null)

  async function onSubmit(event) {
    event.preventDefault()

    if (inputRef.current == null) return 

    setOpTodos(prev => [
      ...prev,
      { id: Math.random(), title: inputRef.current.value, }
    ])
    const newTodo = await createTodo(inputRef.current.value) 
    setTodos(prev => [...prev, newTodo])
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} required />
      <button type='submit'>Create</button>
      <ul>
        {opTodos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </form>
  )

}


function createTodo(title) {
  return new Promise(resolve => {
    setTimeout(() => {
      return { id: Math.random(), title: title }
    }, 2500)
  })
}


export default InitialTodos;