# React Hooks

## Table of contents
1. useTransition()
2. used()
3. useCallback()
4. useMemo()
5. useOptimistic()
6. useImperativeHandle()

## 1. useTransition()
**Usage**: If you have many states in the app and some of them have high priority and some have low priority we can use `useTransition` hook to handle the low-priority states that may have high computations <br />

**Code**:
```jsx
import { useTransition, useState } from react

const App = () => {
  const [input, setInput] = useState()
  const [list, setList] = useState([])

  const [isPending, startTransition] = useTransition()

  const handleInput = (e) => {
    setInput(e.target.value) // Happens first

    // Start computing this and you can use isPending to show some loading staff
    startTransition(() => {
      const d = [];
      for (let i = 0; i <= 10000; i++) {
        d.push(e.target.value)
      }
      setList(d)
    })
  }

  return (
    <>
      <input value={input} onChange={handleInput} />
      { isPending ? "Loading" : list.map(i => <p>{i}</p>) }
    </>
  )

}
```

## 2. useId()
**Usage**: Generates unique identifiers that can be passed to accessibility attributes. <br />

**Code**: 
```jsx
import { useId } from react

const PasswordComponent = () => {
  const id = useId()

  return (
    <>
      <label for={`password-${id}`}></label>
      <input value={input} onChange={handleInput} id={`password-${id}`} />
    </>
  )

}

const App = () => {

  return (
    <>
      <PasswordComponent />
      <PasswordComponent />
    </>
  )

}
```

## 3. useCallback()
**Usage**: Suppose we have a page that has many states and you have some high-computation function that runs every single time you change another state. So you have to execute this function only when something happens called *"dependencies"* <br />

**Explaining Of Code**: 
1. `ListItems` component takes the `getItems` function that gets the items values <br />
2. `Test` Component has two states `dark` and `input`
3. `dark` state for toggling the theme after clicking the HTML button.
4. `input` state changing the list items values to `[input, input + 1, input + 2]`
5. The `getItems` function that we have used `useCallback` on will only be executed when the `input` state changes so this `getItems` function will never be executed if the `dark` state changes.
6. Try to remove the `useCallback` and run the code then use the `console` to notice the difference. 

**Return**: The whole function inside the `useCallback` <br/>

**Code**: 
```jsx
'use client';

import { useEffect, useCallback, useState } from "react";

const ListItems = ({ getItems }) => {

  const [items, setItems] = useState([])

  useEffect(() => {
    console.log('Updating:')
    setItems(getItems())
  }, [getItems])

  return (
    <div>
      {items.map(item => <div>{item}</div>)}
    </div>
  );
}
 

const Test = () => {

  const [input, setInput] = useState(1)
  const [dark, setDark] = useState(false)

  const theme = {
    backgroundColor: dark ? '#000' : '#FFf',
    color: dark ? '#fff' : '#000'
  }

  const getItems = useCallback(() => {
    return [input, input + 1, input + 2]
  }, [input])

  return (
    <div className='theme' style={theme}>
      <input value={input} onChange={ e => setInput(parseInt(e.target.value)) } />
      <button className='block bg-teal-500 text-white' onClick={ () => setDark(!dark) }>Toggle theme</button>
      <ListItems getItems={getItems} />
    </div>
  );
}
 
export default Test;
```

## 4. useMemo()
**Usage**: Memo stands for memoization which means caching a value so the application doesn't have to compute it every single render of the app. Its usage is similar to `useCallback` <br/>

**Returns**: The value of the function inside `useMemo` <br/>

**Code**:
```jsx
import { useEffect, useMemo, useState } from "react";

const Test = () => {

  const [num, setNum] = useState(0)
  const [dark, setDark] = useState(false)

  const doubleNum = useMemo(() => slowComputation(num), [num])

  const theme = {
    backgroundColor: dark ? '#000' : '#FFF',
    color: dark ? '#fff' : '#000'
  }

  return (
    <div style={theme}>
      <input value={num} type='number' onChange={ e => setNum(parseInt(e.target.value)) } />
      <button onClick={ () => setDark(!dark) }>Toggle</button>
      <h1 className='font-bold text-4xl'>{doubleNum}</h1>
    </div>
  );
}

function slowComputation(num) {
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2
}
 
export default Test;
```
There's another usage of `useMemo` something called ***Referential Equality*** suppose you `theme` object and `num` state and you have `useEffect` the printing out "Theme changed" after the `theme` object updated... So what's the scenario? If you changed the `num` state as well you will have "Theme changed" in the console that's because of ***Referential Equality*** in JS. <br />

Here's how to solve the problem try with your self
```jsx
import { useEffect, useMemo, useState } from "react";

const Test = () => {

  const [num, setNum] = useState(0)
  const [dark, setDark] = useState(false)

  const theme = useMemo(() => {
    return {
      backgroundColor: dark ? '#000' : '#FFF',
      color: dark ? '#fff' : '#000'
    }
  }, [dark])

  useEffect(() => {
    console.log('Theme changed')
  }, [theme])

  return (
    <div style={theme}>
      <input value={num} type='number' onChange={ e => setNum(parseInt(e.target.value)) } />
      <button onClick={ () => setDark(!dark) }>Toggle</button>
    </div>
  );
}
 
export default Test;
```

## 5. useOptimistic()
**Usage**: The `useOptimistic` Hook provides a way to optimistically update the user interface before a background operation, like a network request, completes. In the context of forms, this technique helps to make apps feel more responsive. When a user submits a form, instead of waiting for the server’s response to reflect the changes, the interface is immediately updated with the expected outcome. <br />

**Explain**: We have a list of todos we can add a new todo using the simple button and input HTML elements. Using a promise to wait for the response we can see that we wait 2500 milliseconds to get the actual response to simulate a server request or something. <br/>
After we `createTodo` we can see immediately the expected result shows up and there are no 2.5 secs to wait. As I mentioned in the usage above!

**Code**:
```jsx
'use client';

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
```
