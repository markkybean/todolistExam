import { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import Login from './Login';
import { auth, signOut } from './firebase'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  return (
    <>
      {isLoggedIn ? (
        <div>
          <Todo />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
