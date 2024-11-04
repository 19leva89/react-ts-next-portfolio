import { Header, Aside } from '@/components'

interface ParentComponentProps {
	appOpen: boolean
	appAsideOpen: () => void
}

export const ParentComponent = ({ appOpen, appAsideOpen }: ParentComponentProps) => {
	return (
		<>
			<Header handleAsideOpen={appAsideOpen} />

			<Aside asideOpen={appOpen} handleAsideOpen={appAsideOpen} />
		</>
	)
}
