import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export const Preloader = ({ isLoading, children }) => {
	const svgRef = useRef(null)
	const svgTextRef = useRef(null)

	const startStrokeAnimation = () => {
		if (svgTextRef.current) {
			svgTextRef.current.classList.add('animate-stroke')
		}
	}

	useEffect(() => {
		if (!isLoading) {
			const tl = gsap.timeline({
				onComplete: startStrokeAnimation,
			})
			const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z'
			const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z'

			tl.to('.preloader-heading .load-text, .preloader-heading, .preloader-heading::before, .cont', {
				delay: 1.5,
				y: -100,
				opacity: 0,
			})

			tl.to(svgRef.current, {
				duration: 0.5,
				attr: { d: curve },
				ease: 'power2.easeIn',
			}).to(svgRef.current, {
				duration: 0.5,
				attr: { d: flat },
				ease: 'power2.easeOut',
			})

			tl.to('.preloader', {
				y: -1500,
			})

			tl.to('.preloader', {
				zIndex: -1,
				display: 'none',
			})
		}
	}, [isLoading])

	return isLoading ? (
		<div className={`preloader ${isLoading ? '' : 'hidden'}`} aria-hidden={!isLoading}>
			<svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
				<path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
			</svg>

			<div className="preloader-heading">
				<div className="load-text" ref={svgTextRef}>
					{['S', 'O', 'B', 'O', 'L', 'E', 'V'].map((letter, index) => (
						<span key={index} style={{ '--i': index }}>
							{letter}
						</span>
					))}
				</div>
			</div>
		</div>
	) : (
		<div className="main-content">{children}</div>
	)
}
