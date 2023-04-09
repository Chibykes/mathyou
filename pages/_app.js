import '../styles/globals.css'
import { UserContext } from '../context/UserContext';
import { auth } from '../hooks/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {

  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authUser);
  }, [authUser])

  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} />
      <Toaster 
        containerClassName='text-xs'
      />
    </UserContext.Provider>
  )
}
