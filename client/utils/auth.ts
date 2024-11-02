import jwt, { JwtPayload } from 'jsonwebtoken'

const secret = 'absdvjabvahgeuabsekjvaioeauio4894644sevakpveiasbvauiegbuiabsvakb46516865as4d' // Replace with your actual secret key

interface Payload {
	userId: string
}

export const generateToken = (payload: Payload): string => {
	return jwt.sign(payload, secret, { expiresIn: '1h' }) // Adjust expiration as needed
}

export const verifyToken = (token: string): JwtPayload | null => {
	try {
		const decoded = jwt.verify(token, secret) as JwtPayload

		return decoded
	} catch (err) {
		return null
	}
}
