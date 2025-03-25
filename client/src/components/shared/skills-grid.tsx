import Image from 'next/image'

import { SKILLS } from '@/constants/skills'
import { useDarkMode } from '@/hooks/use-dark-mode'

export const SkillsGrid = () => {
	const { darkMode } = useDarkMode()

	return (
		<section className="my-skills">
			<div className="container m-auto">
				<div className="my-skills-title">
					<h2 data-aos="fade-up">My Skills</h2>
					<p data-aos="fade-up">
						I put your ideas and thus your wishes in the form of a unique web project that inspires you and
						your customers
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-4 mt-12 w-full md:gap-8">
					{SKILLS.map((skill, index) => {
						const skillSrc = darkMode ? skill.darkSrc : skill.lightSrc

						return (
							<div
								key={skill.name}
								className="my-s-card flex flex-col items-center justify-center gap-2"
								data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
							>
								<div className="group my-s-inner flex flex-col items-center justify-center gap-2 px-10 py-6 sm:px-14 sm:py-8 border border-transparent rounded-3xl bg-[#140c1c] hover:bg-[#19195c] hover:border-[#905ff1] transition ease-in-out duration-300">
									<Image
										src={skillSrc}
										alt={skill.name.toLowerCase()}
										width={70}
										height={70}
										className="transform group-hover:scale-110 ease-in-out duration-300"
									/>

									<h3>{skill.level}</h3>
								</div>

								<p className="text-center">{skill.name}</p>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
