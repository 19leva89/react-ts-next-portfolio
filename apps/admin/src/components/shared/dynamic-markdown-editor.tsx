'use client'

import dynamic from 'next/dynamic'

import { CodeBlock } from '@/components/shared'

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), {
	ssr: false,
})

interface Props {
	value: string
	visible?: boolean
	onChange: (value: string) => void
}

export const DynamicMarkdownEditor = ({ value, visible = true, onChange, ...props }: Props) => {
	return (
		<MarkdownEditor
			value={value}
			visible={visible}
			onChange={onChange}
			previewProps={{
				components: {
					code: (props) => <CodeBlock {...props} inline={false} />,
				},
			}}
			{...props}
		/>
	)
}
