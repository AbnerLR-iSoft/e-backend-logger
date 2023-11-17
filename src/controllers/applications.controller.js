'use strinct';

const { Application, Authorization } = require('../models')
const { generateJWT } = require('../middlewares/jwt')

class ApplicationController {
    create = async (req, res) => {
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

            const token = await generateJWT({
                application_id: application._id
            })

			const newAuthorization = new Authorization({
				application_id: application._id,
				token
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
}

module.exports = new ApplicationController()