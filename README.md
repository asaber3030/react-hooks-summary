# React Hooks

## Table of contents
1. useTransition()
2. used()
3. useCallback()
4. useMemo()
5. useEffectLayout()
6. useSyncExternalResource()
7. useOptimistic()
8. useImperativeHandle()

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
**Usage**: <br/>

**Code**: 
```jsx
```
