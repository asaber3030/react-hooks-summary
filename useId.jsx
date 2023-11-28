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