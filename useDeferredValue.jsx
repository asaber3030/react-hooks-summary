import { useDeferredValue, useMemo, useState } from "react";

const Test = () => {

  const [input, setInput] = useState()
  const deferredInput = useDeferredValue(input)
  const list = useMemo(() => {
    const l = []
    for (let i = 0; i <= 10000; i++) {
      l.push(<li key={i}>{deferredInput}</li>)
    }
    return l;
  }, [deferredInput])

  return (
    <div>
      <input value={input} onChange={ e => setInput(e.target.value) } />
      <ul>
        {list.map(i => i)}
      </ul>
    </div>
  );
}
 
export default Test;