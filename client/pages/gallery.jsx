import Head from 'next/head'
import Link from 'next/link'

import { Spinner } from '@/components'
import { useFetchData } from '@/hooks/use-fetch-data'

const Gallery = () => {
	const { allData, loading } = useFetchData('/api/photos')

	return (
		<>
			<Head>
				<title>Sobolev: Gallery Photos</title>
			</Head>

			<div className="gallery-page">
				<div className="container">
					<div className="gallery-top-sec">
						<div className="top-phone-sec">
							<div className="left-title-sec">
								<h4 data-aos="fade-right">Sobolev Gallery Photos</h4>

								<h1 data-aos="fade-right">
									Vaibhav <br /> Photographers
								</h1>

								<Link href="/gallery#gallery-images">
									<button>View more</button>
								</Link>
							</div>

							<div className="right-img-sec">
								<img
									src="/img/gallery-1.jpg"
									alt="gallery"
									data-aos="flip-left"
									data-aos-ease="ease-in-cubic"
									data-aos-duration="2000"
								/>

								<div className="r-img-top">
									<img
										src="/img/gallery-2.jpg"
										alt="gallery"
										data-aos="flip-right"
										data-aos-ease="ease-in-cubic"
										data-aos-duration="2000"
									/>

									<img
										src="/img/gallery-3.jpg"
										alt="gallery"
										data-aos="flip-right"
										data-aos-ease="ease-in-cubic"
										data-aos-duration="2000"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="gallery-btm-photos" id="gallery-images">
					<div className="container">
						<div className="g-btm-title text-center">
							<h3>
								<span>01:</span> Our portfolio
							</h3>
							<h2>
								Sobolev capture <span>All of your</span> <br /> beautiful moments
							</h2>
						</div>

						{loading ? (
							<div className="flex flex-center">
								<Spinner />
							</div>
						) : (
							<div className="gallery-image-grid">
								{allData.map((photo) => (
									<div
										className="image-item"
										key={photo._id}
										data-aos="flip-left"
										data-aos-ease="ease-in-cubic"
										data-aos-duration="2000"
									>
										<img src={photo.images[0] || '/img/no-image.png'} alt="gallery" />

										<div className="gallery-img-item-info">
											<h2>{photo.title}</h2>
											<p>by Sobolev</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Gallery
