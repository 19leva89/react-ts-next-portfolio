import { useState } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const CodeBlock = ({ node, inline, className, children, ...props }) => {
	const match = /language-(\w+)/.exec(className || '')

	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(children)
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
	} else if (match) {
		return (
			<div style={{ position: 'relative' }}>
				<SyntaxHighlighter
					style={a11yDark}
					language={match[1]}
					PreTag="pre"
					{...props}
					codeTagProps={{
						style: {
							padding: '0',
							borderRadius: '5px',
							overflow: 'auto',
							whiteSpace: 'pre-wrap',
						},
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
					onClick={() => handleCopy()}
				>
					{copied ? 'Copied!' : 'Copy code'}
				</button>
			</div>
		)
	} else {
		return (
			<code className="md-post-code" {...props}>
				{children}
			</code>
		)
	}
}