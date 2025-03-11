import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface DarkModeProviderProps {
	children: ReactNode
}

// create context for darkMode
const DarkModeContext = createContext({
	darkMode: false,
	toggleDarkMode: () => {},
})

// Context Provider Component
export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
	const [darkMode, setDarkMode] = useState<boolean>(false)

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev)
	}

	useEffect(() => {
		const isDarkMode = localStorage.getItem('darkMode')

		if (isDarkMode === 'true') {
			setDarkMode(true)
		}
	}, [])

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark')
			localStorage.setItem('darkMode', 'true')
		} else {
			document.body.classList.remove('dark')
			localStorage.setItem('darkMode', 'false')
		}
	}, [darkMode])

	return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

export const useDarkMode = () => useContext(DarkModeContext)
