'use strinct';
const mongoose = require('mongoose')
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
				return res.status(404).json({
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
				res.status(404).json({
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

	info = async (req, res, next) => {
		try {
			const { id } = req.params
        
			const log = await this.findLogById(id)
            
            if (!log) {
				return res.status(404).json({
					ok: false,
					msg: 'Log not found'
				})
			}

			res.status(200).json({
 				ok: true,
				log
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({
				ok: false,
				msg: 'Error getting Log'
			})
		}
	}

	update = async (req, res, next) => {
		try {
			const { id } = req.params
			const { 
				application_id, type, priority, 
				path, message, request, response 
		    } = req.body

            const log = await this.findLogById(id)
            
            if (!log) {
				return res.status(404).json({
					ok: false,
					msg: 'Log not found'
				})
			}

			const newLog = new Log({
				_id: log._id,
				application_id, type,
				priority, path, message, 
				request, response
			})

			const updateData = newLog.toObject()

			await Log.updateOne({
			  _id: log._id 
			}, updateData)

			res.status(200).json({
				ok: true,
				log
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({
				ok: false,
				msg: 'Error updating Log'
			})
		}
	}

	delete = async (req, res, next) => {
		try {
			const { id } = req.params

			const log = await this.findLogById(id)

			if (!log) {
				return res.status(404).json({
					ok: false,
					msg: 'Log not found'
				})
			}

			await Log.deleteOne({ _id: log._id })

			res.status(200).json({
				ok: true,
				log
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({
				ok: false,
				msg: 'Error Deleting Log'
			})
		}
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

	findLogById = async (id) => {
       try {
		 const objectIdToFind = new mongoose.Types.ObjectId(id)
		 const log = await Log.findById({ _id: objectIdToFind })

		 return log
	   } catch (error) {
		 console.error(error)
		 return null
	   }
	}
}

module.exports = new MainController();
