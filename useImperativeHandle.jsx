import { useImperativeHandle, forwardRef, useRef } from "react";

const CustomInput = forwardRef(({ ...props }, ref) => {

  useImperativeHandle(ref, () => {
    return {
      alertSomething: () => alert('Say something'),
      doSomething: () => console.log('Doing something...')
    }
  }, [props.value])


  return (
    <input 
      {...props}
    />

  );
})
 
const Test = () => {

  const inRef = useRef()

  return (
    <div>
      <CustomInput ref={inRef} />
      <button onClick={ () => inRef.current.alertSomething() }>Alert</button>
      <button onClick={ () => inRef.current.alertSomething() }>Console</button>
    </div>
  );
}
 
export default Test;