import Head from 'next/head'

import { ProjectsSection } from '@/components/shared'

const ProjectsPage = () => {
	return (
		<>
			<Head>
				<title>Project</title>
			</Head>

			<div className='project-page'>
				<ProjectsSection showAllProjects={true} />
			</div>
		</>
	)
}

export default ProjectsPage
