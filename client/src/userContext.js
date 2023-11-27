import React from 'react'

const UserContext = React.createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext