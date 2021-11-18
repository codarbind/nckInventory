const jwt = require('jsonwebtoken')


let verifyToken = (req, res, next)=>{
let {token} = req.body
if(!token) res.status(400).json()

	try{

		let userEmail = jwt.verify(token,process.env.AUTH_KEY).userEmail
		

		if(userEmail){
			req.body.userEmail = userEmail
		}

	}catch(e){

		console.log('error',e)

	return	res.status(403).json({message:'you need to authenticate'})

	}


	return next()


}

module.exports = verifyToken