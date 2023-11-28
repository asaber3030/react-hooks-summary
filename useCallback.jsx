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