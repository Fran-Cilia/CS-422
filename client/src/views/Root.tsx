import { useState, createContext} from "react";


const userContext = createContext(null)

const Root = () => {
  
  const [user, setUser] = useState('');

  const handleSetUser = (userName) => {
    setUser(userName);
    
    // TODO switch to PDF viewer screen. User is now set.
  }

  return (
    <userContext.Provider value = {user} >
      <div className="flex flex-col items-center">
        <h1>Select User:</h1>
        <button onClick={() => handleSetUser("User 1")}>User 1</button>
        <button onClick={() => handleSetUser("User 2")}>User 2</button>
        <button onClick={() => handleSetUser("User 3")}>User 3</button>
      </div>
    </userContext.Provider>
  );
};

export { Root };
