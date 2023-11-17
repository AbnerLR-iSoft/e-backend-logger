'use strinct';
const { Application, Authorization } = require('../models')
class MainController {

	all = async (req, res, next) => {
		res.json({ message: 'Example request.' });
	}

	createApplication = async (req, res) => {
		try {
			const { name } = req.body

			const newApplication = new Application({ name })
			const application = await newApplication.save()

			if (!application) {
				return res.status(400).json({
					ok: false,
					msg: 'Error creating application'
				})
			}

			const newAuthorization = new Authorization({
				application_id: application._id,
				token: new Date().toString() 
			})

			await newAuthorization.save()

			res.status(200).json({
				ok: true,
				application
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({
				ok: false,
				msg: 'Error creating application'
			})
		}
	}

	create = (req, res, next) => {
		console.log('CREATE TEST')
		console.log(req.body)
		res.json({ message: 'Example request.' });
	}

	info(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	update(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	delete(req, res, next) {
		res.json({ message: 'Example request.' });
	}
}

module.exports = new MainController();
