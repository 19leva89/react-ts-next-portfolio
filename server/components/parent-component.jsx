import { Header, Aside } from '@/components'

export const ParentComponent = (props) => {
	return (
		<>
			<Header handleAsideOpen={props.appAsideOpen} />

			<Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen} />
		</>
	)
}
