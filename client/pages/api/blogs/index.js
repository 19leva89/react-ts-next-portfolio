import { Blog } from "@/models/blog";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'GET') {
		// fetch a single blog by id
		if (req.query?.id) {
			const blog = await Blog.findById(req.query.id)
			res.json(blog)

			// fetch blog by tags
		} else if (req.query?.tags) {
			const blogTags = await Blog.find({ tags: req.query.tags })
			res.json(blogTags)

			// fetch blog by category
		} else if (req.query?.blogCategory) {
			const blogCat = await Blog.find({ blogCategory: req.query.blogCategory })
			res.json(blogCat)

			// fetch blog by slug
		} else if (req.query?.slug) {
			const blogSlug = await Blog.find({ slug: req.query.slug })
			res.json(blogSlug.reverse())

			// fetch all blogs
		} else {
			const blogs = await Blog.find()
			res.json(blogs.reverse())
		}
	} else {
		res.this.status(405).json({ message: 'Method not allowed' })
	}
}