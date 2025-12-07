import { createContext, useContext, useState } from "react"



const MainNavContext = createContext<any | null>(null)

export const useMainNav = () => {
    const mainnav = useContext(MainNavContext)
    if (mainnav) {
        return mainnav
    }
    return null
}

export const MainNavProvider = ({ children }: any) => {

    const [clickSearch, setClickSearch] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const showMenu = () => setIsOpen(true)
    const closeMenu = () => setIsOpen(false)

    const data = {
        isOpen,
        showMenu,
        closeMenu
    }

    return (
        <MainNavContext.Provider value={data}>
            {children}
        </MainNavContext.Provider>
    )
}

export default MainNavContext