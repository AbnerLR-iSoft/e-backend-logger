'use strinct';
const { Application, Authorization, Log } = require('../models')
class MainController {

	all = async (req, res, next) => {
		try {
			const logs = await Log.find()
            res.status(200).json({
				ok: true,
				logs
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({
				ok: false,
				msg: 'Error getting logs'
			})
		}
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

	create = async (req, res, next) => {
		try {
			const { 
				application_id, type, priority, 
				path, message, request, response 
		    } = req.body
            
			const application = await this.findApplicationById(application_id)

			if (!application) {
				res.status(400).json({
					ok: false,
					msg: 'Application not found'
				})
			}
            
	        const newLog = new Log({
				application_id: application._id,
				type,
				priority,
				path, 
				message,
				request,
				response
			})
			
			const log = await newLog.save()

			res.status(200).json({ 
				ok: true, 
				log 
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({
				ok: false,
				msg: 'Error creating Log'
			})
		}
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

	findApplicationById = async (id) => {
		try {
		   const application = await Application.findById(id)
           return application
		} catch (error) {
			console.error(error)
			return null
		}
	}
}

module.exports = new MainController();
