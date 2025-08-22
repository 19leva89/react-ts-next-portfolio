'use client'

import { CSSProperties, ReactNode, useState } from 'react'

interface CodeBlockProps {
	inline: boolean
	className?: string
	children?: ReactNode
}

export const CodeBlock = ({ inline, className, children, ...props }: CodeBlockProps) => {
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
				<pre style={codeTagStyle} {...props}>
					<code>{children}</code>
				</pre>

				<button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={handleCopy}>
					{copied ? 'Copied!' : 'Copy code'}
				</button>
			</div>
		)
	}

	return <code {...props}>{children}</code>
}
