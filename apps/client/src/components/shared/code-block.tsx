'use client'

import { CSSProperties, ReactNode, useState } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
	inline: boolean
	className: string
	children: ReactNode
}

export const CodeBlock = ({ inline, className, children, ...props }: Props) => {
	const match = /language-(\w+)/.exec(className || '')

	const [copied, setCopied] = useState<boolean>(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(String(children))
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 3000)
	}

	if (inline) {
		return (
			<code className={className} {...props}>
				{children}
			</code>
		)
	}

	if (match) {
		const codeTagStyle: CSSProperties = {
			padding: '0',
			borderRadius: '5px',
			overflow: 'auto',
			whiteSpace: 'pre-wrap',
		}

		return (
			<div style={{ position: 'relative' }}>
				<SyntaxHighlighter
					style={a11yDark}
					language={match[1]}
					PreTag='pre'
					{...props}
					codeTagProps={{
						style: codeTagStyle,
					}}
				>
					{String(children).replace(/\n$/, '')}
				</SyntaxHighlighter>

				<button
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						zIndex: '1',
						background: `#3d3d3d`,
						color: '#fff',
						padding: '10px',
					}}
					onClick={handleCopy}
				>
					{copied ? 'Copied!' : 'Copy code'}
				</button>
			</div>
		)
	}

	return (
		<code className='md-post-code' {...props}>
			{children}
		</code>
	)
}
