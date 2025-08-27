import Image from 'next/image'
import { useTheme } from 'next-themes'

import { SKILLS } from '@/constants/skills'

export const SkillsGrid = () => {
	const { theme } = useTheme()

	return (
		<section className='my-skills'>
			<div className='container m-auto'>
				<div className='my-skills-title'>
					<h2 data-aos='fade-up'>My Skills</h2>
					<p data-aos='fade-up'>
						I put your ideas and thus your wishes in the form of a unique web project that inspires you and
						your customers
					</p>
				</div>

				<div className='mt-12 flex w-full flex-wrap items-center justify-center gap-4 md:gap-8'>
					{SKILLS.map((skill, index) => {
						const skillSrc = theme === 'light' ? skill.darkSrc : skill.lightSrc

						return (
							<div
								key={skill.name}
								className='flex flex-col items-center justify-center gap-2 text-[#9500ff] dark:text-[#f6f3fc]'
								data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
							>
								<div className='group flex flex-col items-center justify-center gap-2 rounded-3xl border border-transparent bg-[#f6f3fc] px-10 py-6 transition duration-300 ease-in-out hover:border-[#905ff1] sm:px-14 sm:py-8 dark:bg-[#140c1c] dark:hover:bg-[#19195c]'>
									<Image
										src={skillSrc}
										alt={skill.name ? `${skill.name.toLowerCase()} image` : 'Skill image'}
										width={70}
										height={70}
										className='transform duration-300 ease-in-out group-hover:scale-110'
									/>

									<h3>{skill.level}</h3>
								</div>

								<p className='text-center'>{skill.name}</p>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
