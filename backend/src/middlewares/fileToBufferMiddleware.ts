import * as multer from 'multer'

const storage = multer.memoryStorage()
const fileToBufferMiddleware = multer({ storage })

export default fileToBufferMiddleware