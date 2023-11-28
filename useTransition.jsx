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