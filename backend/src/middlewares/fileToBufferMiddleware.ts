import * as multer from 'multer'

const storage : multer.StorageEngine = multer.memoryStorage()
const fileToBufferMiddleware : multer.Instance = multer({ storage })

export default fileToBufferMiddleware