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

const Test2 = () => {

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

function slowComputation2(num) {
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2
}

const Test3 = () => {

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
