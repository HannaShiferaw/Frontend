
import { useEffect,useContext } from 'react'
import './App.css'
import Router from './Router'
import { DataContext } from './Components/DataProvider/DataProvider'
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'

function App() {
    const [{user}, dispatch] = useContext(DataContext);

    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // console.log(authUser)
          dispatch({
            type: Type.SET_USER,
            user: authUser,
          });
        } else {
          // You will write other codes
          dispatch({
            type: Type.SET_USER,
            user: null,
          });
        }
      });
    }, []);


  return (
    <>
      <Router />
      
    </>
  )
}

export default App