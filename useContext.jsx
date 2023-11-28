import { useContext, createContext, useState } from "react";

const UserContext = createContext()

const UserLayout = () => {
  const user = useContext(UserContext)

  return (
    <>
      <h1>Name is <b>{user.name}</b></h1>
      <p>{user.age} years old</p>
    </>
  )
}

const App = () => {
  return (
    <UserContext.Provider value={{ name: 'Abdulrahman', age: 15 }}>
      <UserLayout />
    </UserContext.Provider>
  );
}
 
export default App;