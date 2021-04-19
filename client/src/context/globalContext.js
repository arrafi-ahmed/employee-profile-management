import { useState, createContext } from 'react'

const GlobalContext = createContext()
const GlobalContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: null, message: null })
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()
  return (
    <GlobalContext.Provider
      value={{ alert, setAlert, loading, setLoading, user, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export { GlobalContext, GlobalContextProvider }
