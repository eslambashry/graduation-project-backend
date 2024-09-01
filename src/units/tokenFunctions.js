import jwt from 'jsonwebtoken'

// ========================= generation ==============================
export const generateToken = ({
  payload = {},
  signature = "defualtSignature",
  expiresIn = '1d',
} = {}) => {
  // check if the payload is empty object
  if (!Object.keys(payload).length) {
    return false
  }
  const token = jwt.sign(payload, signature, { expiresIn })
  return token
}

// =========================  Verify ==============================
export const verifyToken = ({
  token = '',
  signature = "defualtSignature",
} = {}) => {
  // check if the payload is empty object
  if (!token) {
    return false
  }
  const data = jwt.verify(token, signature)
  return data
}