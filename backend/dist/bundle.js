/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\r\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/api/index.ts\");\r\nclass App {\r\n    constructor() {\r\n        this.app = express();\r\n        this.parserSetup();\r\n        this.RouterSetup();\r\n    }\r\n    parserSetup() {\r\n        this.app.use(bodyParser.json());\r\n        this.app.use(bodyParser.urlencoded({ extended: false }));\r\n        this.app.use(cookieParser());\r\n    }\r\n    RouterSetup() {\r\n        this.app.use('/api', (req, res, next) => {\r\n            // const authorization : string | undefined = req.headers['authorization']\r\n            // if(!authorization){ return console.log('헤더미존재')}\r\n            // console.log(authorization.split(' ')[1])\r\n            // res.sendFile(path.resolve(path.join(global.__rootDir, '../../frontend/dist/index.html')))\r\n            next();\r\n        }, api_1.default);\r\n        this.app.use('/dist', express.static(path.join(global.__rootDir, '../../frontend/dist')));\r\n        this.app.use('/public', express.static(path.join(global.__rootDir, '/public')));\r\n        this.app.get('*', (req, res) => {\r\n            res.sendFile(path.resolve(path.join(global.__rootDir, '../../frontend/dist/index.html')));\r\n        });\r\n    }\r\n}\r\nexports.default = App;\r\n\n\n//# sourceURL=webpack:///./src/App.ts?");

/***/ }),

/***/ "./src/api/admin/adminValidationMiddleware.ts":
/*!****************************************************!*\
  !*** ./src/api/admin/adminValidationMiddleware.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst adminValidationMiddleware = (req, res, next) => {\r\n    const { user } = req;\r\n    if (!user.isAdmin) {\r\n        return res.status(403).json(JSON.stringify({}));\r\n    }\r\n    next();\r\n};\r\nexports.default = adminValidationMiddleware;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/adminValidationMiddleware.ts?");

/***/ }),

/***/ "./src/api/admin/index.ts":
/*!********************************!*\
  !*** ./src/api/admin/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst postCtrls = __webpack_require__(/*! ./postCtrls */ \"./src/api/admin/postCtrls/index.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst fileToBufferMiddleware_1 = __webpack_require__(/*! ~middlewares/fileToBufferMiddleware */ \"./src/middlewares/fileToBufferMiddleware.ts\");\r\nconst adminValidationMiddleware_1 = __webpack_require__(/*! ./adminValidationMiddleware */ \"./src/api/admin/adminValidationMiddleware.ts\");\r\nconst admin = express_1.Router();\r\nadmin.use('*', tokenValidationMiddleware_1.default);\r\nadmin.use('*', adminValidationMiddleware_1.default);\r\nadmin.get('/post/:_id', postCtrls.getPostCtrl);\r\nadmin.post('/postImgFile', fileToBufferMiddleware_1.default.single('imgFile'), postCtrls.preUploadPostImgFileCtrl);\r\nadmin.post('/post', fileToBufferMiddleware_1.default.single('coverImgFile'), postCtrls.writePostCtrl);\r\nadmin.patch('/post/:_id', fileToBufferMiddleware_1.default.single('coverImgFile'), postCtrls.editPostCtrl);\r\nexports.default = admin;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/index.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/editPostCtrl.ts":
/*!*************************************************!*\
  !*** ./src/api/admin/postCtrls/editPostCtrl.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst redisClient = redis.createClient();\r\nconst editPostCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const post_id = req.params._id;\r\n                const post = yield post_1.default.findOne({ _id: post_id });\r\n                if (!post) {\r\n                    return res.status(500).json(JSON.stringify({}));\r\n                }\r\n                const author = req.user._id;\r\n                const isPublished = req.body.isPublished;\r\n                const category = req.body.category;\r\n                const title = req.body.title;\r\n                const intro = req.body.intro;\r\n                const tags = JSON.parse(req.body.tags);\r\n                const uploadPath = path.join(global.__rootDir, `/public/postImgs/${post._id}`);\r\n                const coverFileUploadPath = path.join(uploadPath, '/cover');\r\n                const coverImgFile = req.file;\r\n                let coverImgSrc;\r\n                if (coverImgFile) {\r\n                    const originalname = coverImgFile.originalname;\r\n                    const timeStamp = Date.now();\r\n                    const fileName = timeStamp + '-' + originalname;\r\n                    fs.writeFileSync(`${coverFileUploadPath}/${fileName}`, coverImgFile.buffer, \"binary\");\r\n                    coverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`;\r\n                    if (post.coverImgSrc) {\r\n                        fs.unlinkSync(path.join(global.__rootDir, post.coverImgSrc));\r\n                    }\r\n                }\r\n                else {\r\n                    coverImgSrc = null;\r\n                    if (post.coverImgSrc) {\r\n                        const isExistCoverImg = JSON.parse(req.body.isExistCoverImg);\r\n                        if (isExistCoverImg) {\r\n                            coverImgSrc = post.coverImgSrc;\r\n                        }\r\n                        else {\r\n                            fs.unlinkSync(path.join(global.__rootDir, post.coverImgSrc));\r\n                        }\r\n                    }\r\n                }\r\n                let contentState = JSON.parse(req.body.contentState);\r\n                let { entityMap } = contentState;\r\n                const postTempJsonImgs = yield getPostTempJsonImgsFromRedis();\r\n                yield post.update({ $set: {\r\n                        isEdited: true,\r\n                        author,\r\n                        isPublished,\r\n                        coverImgSrc,\r\n                        category,\r\n                        title,\r\n                        intro,\r\n                        tags\r\n                    } });\r\n                return res.status(200).json(JSON.stringify({}));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = editPostCtrl;\r\nfunction getPostTempJsonImgsFromRedis() {\r\n    return new Promise((resolve, reject) => {\r\n        redisClient.lrange('postTempJsonImgs', 0, -1, (err, arr) => {\r\n            if (err) {\r\n                return reject(new Error('getPostTempJsonImgsFromRedis : 에러발생'));\r\n            }\r\n            const postTempJsonImgs = arr;\r\n            return resolve(postTempJsonImgs);\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/editPostCtrl.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/getPostCtrl.ts":
/*!************************************************!*\
  !*** ./src/api/admin/postCtrls/getPostCtrl.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst getPostCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const post_id = req.params._id;\r\n                const post = yield post_1.default.findOne({ _id: post_id }).lean();\r\n                return res.status(200).json(JSON.stringify({ post }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = getPostCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/getPostCtrl.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/index.ts":
/*!******************************************!*\
  !*** ./src/api/admin/postCtrls/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar getPostCtrl_1 = __webpack_require__(/*! ./getPostCtrl */ \"./src/api/admin/postCtrls/getPostCtrl.ts\");\r\nexports.getPostCtrl = getPostCtrl_1.default;\r\nvar editPostCtrl_1 = __webpack_require__(/*! ./editPostCtrl */ \"./src/api/admin/postCtrls/editPostCtrl.ts\");\r\nexports.editPostCtrl = editPostCtrl_1.default;\r\nvar writePostCtrl_1 = __webpack_require__(/*! ./writePostCtrl */ \"./src/api/admin/postCtrls/writePostCtrl.ts\");\r\nexports.writePostCtrl = writePostCtrl_1.default;\r\nvar preUploadPostImgFileCtrl_1 = __webpack_require__(/*! ./preUploadPostImgFileCtrl */ \"./src/api/admin/postCtrls/preUploadPostImgFileCtrl.ts\");\r\nexports.preUploadPostImgFileCtrl = preUploadPostImgFileCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/index.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/preUploadPostImgFileCtrl.ts":
/*!*************************************************************!*\
  !*** ./src/api/admin/postCtrls/preUploadPostImgFileCtrl.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst redisClient = redis.createClient();\r\nconst preUploadPostImgFileCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { file } = req;\r\n                const { imgDataUrl } = req.body;\r\n                const postTempJsonImg = {\r\n                    file,\r\n                    dataUrl: imgDataUrl\r\n                };\r\n                redisClient.lpush('postTempJsonImgs', JSON.stringify(postTempJsonImg));\r\n                res.status(200).json(JSON.stringify({}));\r\n                return res;\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = preUploadPostImgFileCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/preUploadPostImgFileCtrl.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/writePostCtrl.ts":
/*!**************************************************!*\
  !*** ./src/api/admin/postCtrls/writePostCtrl.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst redisClient = redis.createClient();\r\nconst writePostCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const author = 123;\r\n                const isPublished = req.body.isPublished;\r\n                const category = req.body.category;\r\n                const title = req.body.title;\r\n                const intro = req.body.intro;\r\n                const tags = JSON.parse(req.body.tags);\r\n                const post = yield new post_1.default({\r\n                    author: req.user._id,\r\n                    isPublished,\r\n                    category,\r\n                    title,\r\n                    intro,\r\n                    tags\r\n                }).save();\r\n                const uploadPath = path.join(global.__rootDir, `/public/postImgs/${post._id}`);\r\n                fs.mkdirSync(uploadPath);\r\n                const coverImgFileUploadPath = path.join(uploadPath + '/cover');\r\n                fs.mkdirSync(coverImgFileUploadPath);\r\n                const coverImgFile = req.file;\r\n                let coverImgSrc = null;\r\n                if (coverImgFile) {\r\n                    const timeStamp = Date.now();\r\n                    const originalname = coverImgFile.originalname;\r\n                    const fileName = timeStamp + '-' + originalname;\r\n                    coverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`;\r\n                    fs.writeFileSync(`${coverImgFileUploadPath}/${fileName}`, coverImgFile.buffer, \"binary\");\r\n                }\r\n                let contentState = JSON.parse(req.body.contentState);\r\n                let { entityMap } = contentState;\r\n                const postTempJsonImgs = yield getPostTempJsonImgsFromRedis();\r\n                for (let key in entityMap) {\r\n                    const postImgDataUrl = entityMap[key].data.src;\r\n                    postTempJsonImgs.forEach((postTempJsonImg) => {\r\n                        const postTempImg = JSON.parse(postTempJsonImg);\r\n                        if (postImgDataUrl === postTempImg.dataUrl) {\r\n                            const originalname = postTempImg.file.originalname;\r\n                            const timeStamp = Date.now();\r\n                            const fileName = timeStamp + '-' + originalname;\r\n                            const imgSrc = `/public/postImgs/${post._id}/${fileName}`;\r\n                            entityMap[key].data.src = imgSrc;\r\n                            fs.writeFileSync(`${uploadPath}/${fileName}`, Buffer.from(postTempImg.file.buffer), \"binary\");\r\n                        }\r\n                    });\r\n                }\r\n                contentState.entityMap = entityMap;\r\n                yield post.update({ $set: {\r\n                        contentState,\r\n                        coverImgSrc\r\n                    } });\r\n                redisClient.del('postTempJsonImg');\r\n                return res.status(200).json(JSON.stringify({}));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = writePostCtrl;\r\nfunction getPostTempJsonImgsFromRedis() {\r\n    return new Promise((resolve, reject) => {\r\n        redisClient.lrange('postTempJsonImgs', 0, -1, (err, arr) => {\r\n            if (err) {\r\n                return reject(new Error('getPostTempJsonImgsFromRedis : 에러발생'));\r\n            }\r\n            const postTempJsonImgs = arr;\r\n            return resolve(postTempJsonImgs);\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/writePostCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts":
/*!*********************************************************!*\
  !*** ./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst doubleCheckNickCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { nick } = req.body;\r\n                const isBadRequset = (!nick ||\r\n                    !textValidator_1.default.validateBlank(String(nick)) ||\r\n                    !textValidator_1.default.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||\r\n                    !textValidator_1.default.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX));\r\n                if (isBadRequset) {\r\n                    return res.status(400).json({\r\n                        isSuccess: false,\r\n                        errMsg: '잘못된 요청입니다.'\r\n                    });\r\n                }\r\n                const condition = { nick: String(nick) };\r\n                const userByNick = yield user_1.default.findOne(condition).lean();\r\n                const isAvailable = userByNick === null ? true : false;\r\n                return res.json(JSON.stringify({\r\n                    isSuccess: true,\r\n                    isAvailable\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json({\r\n                    isSuccess: false,\r\n                    errMsg: '서버오류입니다.'\r\n                });\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = doubleCheckNickCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/commonCtrls/index.ts":
/*!*******************************************!*\
  !*** ./src/api/auth/commonCtrls/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar doubleCheckNickCtrl_1 = __webpack_require__(/*! ./doubleCheckNickCtrl */ \"./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts\");\r\nexports.doubleCheckNickCtrl = doubleCheckNickCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/commonCtrls/index.ts?");

/***/ }),

/***/ "./src/api/auth/index.ts":
/*!*******************************!*\
  !*** ./src/api/auth/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst commonCtrls = __webpack_require__(/*! ./commonCtrls */ \"./src/api/auth/commonCtrls/index.ts\");\r\nconst localCtrls = __webpack_require__(/*! ./localCtrls */ \"./src/api/auth/localCtrls/index.ts\");\r\nconst socialCtrls = __webpack_require__(/*! ./socialCtrls */ \"./src/api/auth/socialCtrls/index.ts\");\r\nconst auth = express_1.Router();\r\n// common\r\nauth.post('/doubleCheckNick', commonCtrls.doubleCheckNickCtrl);\r\n// local\r\nauth.post('/local/join', localCtrls.joinCtrl);\r\nauth.post('/local/login', localCtrls.loginCtrl);\r\nauth.post('/local/doubleCheckEmail', localCtrls.doubleCheckEmailCtrl);\r\n// social\r\nauth.get('/social/kakao', socialCtrls.kakaoCtrl);\r\nauth.get('/social/kakao/callback', socialCtrls.kakaoCallbackCtrl);\r\nauth.get('/social/naver', socialCtrls.naverCtrl);\r\nauth.get('/social/naver/callback', socialCtrls.naverCallbackCtrl);\r\n// auth.get('/social/google', socialCtrls.googleCtrl)\r\nauth.get('/social/preUser', socialCtrls.getPreUserCtrl);\r\nauth.post('/social/join', socialCtrls.joinCtrl);\r\nexports.default = auth;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/index.ts?");

/***/ }),

/***/ "./src/api/auth/localCtrls/doubleCheckEmailCtrl.ts":
/*!*********************************************************!*\
  !*** ./src/api/auth/localCtrls/doubleCheckEmailCtrl.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst doubleCheckEmail = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const { email } = req.body;\r\n            const isBadRequest = (!email ||\r\n                !textValidator_1.default.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||\r\n                !textValidator_1.default.validateBlank(String(email)));\r\n            if (isBadRequest) {\r\n                return res.status(400).json(JSON.stringify({\r\n                    isSuccess: false,\r\n                    errMsg: '잘못된 요청입니다.'\r\n                }));\r\n            }\r\n            const condition = {\r\n                email: String(email),\r\n                memberType: memberTypes.LOCAL\r\n            };\r\n            const userByEmail = yield user_1.default.findOne(condition).lean();\r\n            const isAvailable = userByEmail === null ? true : false;\r\n            return res.json(JSON.stringify({\r\n                isSuccess: true,\r\n                isAvailable\r\n            }));\r\n        });\r\n    })();\r\n};\r\nexports.default = doubleCheckEmail;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/localCtrls/doubleCheckEmailCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/localCtrls/index.ts":
/*!******************************************!*\
  !*** ./src/api/auth/localCtrls/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar doubleCheckEmailCtrl_1 = __webpack_require__(/*! ./doubleCheckEmailCtrl */ \"./src/api/auth/localCtrls/doubleCheckEmailCtrl.ts\");\r\nexports.doubleCheckEmailCtrl = doubleCheckEmailCtrl_1.default;\r\nvar joinCtrl_1 = __webpack_require__(/*! ./joinCtrl */ \"./src/api/auth/localCtrls/joinCtrl.ts\");\r\nexports.joinCtrl = joinCtrl_1.default;\r\nvar loginCtrl_1 = __webpack_require__(/*! ./loginCtrl */ \"./src/api/auth/localCtrls/loginCtrl.ts\");\r\nexports.loginCtrl = loginCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/localCtrls/index.ts?");

/***/ }),

/***/ "./src/api/auth/localCtrls/joinCtrl.ts":
/*!*********************************************!*\
  !*** ./src/api/auth/localCtrls/joinCtrl.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst TokenManager_1 = __webpack_require__(/*! ~modules/TokenManager */ \"./src/modules/TokenManager.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst sexTypes = __webpack_require__(/*! ~constants/sexTypes */ \"./src/constants/sexTypes.ts\");\r\nconst joinCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { email, nick, sex, password } = req.body;\r\n                const isBadRequest = (!email ||\r\n                    !textValidator_1.default.validateBlank(String(email)) ||\r\n                    !textValidator_1.default.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||\r\n                    !nick ||\r\n                    !textValidator_1.default.validateBlank(String(nick)) ||\r\n                    !textValidator_1.default.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||\r\n                    !textValidator_1.default.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX) ||\r\n                    !password ||\r\n                    !textValidator_1.default.validateBlank(String(password)) ||\r\n                    !textValidator_1.default.validateMaxLength(String(password), userConfig.PASSWORD_CHAR_MAX) ||\r\n                    !textValidator_1.default.validateMinLength(String(password), userConfig.PASSWORD_CHAR_MIN) ||\r\n                    !sex ||\r\n                    !(String(sex) === sexTypes.M || String(sex) === sexTypes.W));\r\n                if (isBadRequest) {\r\n                    return res.status(400).json(JSON.stringify({ isSuccess: false, errMsg: '잘못된 요청입니다.' }));\r\n                }\r\n                const userByEmail = yield user_1.default.findOne({ memberType: memberTypes.LOCAL, email: String(email) }).lean();\r\n                if (userByEmail !== null) {\r\n                    return res.status(400).json(JSON.stringify({ isSuccess: false, errMsg: '이미 존재하는 이메일입니다.' }));\r\n                }\r\n                const userByNick = yield user_1.default.findOne({ nick: String(nick) }).lean();\r\n                if (userByNick !== null) {\r\n                    return res.status(400).json(JSON.stringify({ isSuccess: false, errMsg: '이미 존재하는 이메일입니다.' }));\r\n                }\r\n                const isAdmin = (yield user_1.default.findOne().lean()) === null;\r\n                const { hash, salt } = Encryption_1.default.getPwSet(String(password));\r\n                const user = (yield new user_1.default({\r\n                    unique_id: String(Number(new Date())),\r\n                    isAdmin,\r\n                    memberType: memberTypes.LOCAL,\r\n                    nick: String(nick),\r\n                    sex: String(sex),\r\n                    email: String(email),\r\n                    key: {\r\n                        hash,\r\n                        salt\r\n                    }\r\n                }).save()).toObject();\r\n                const token = TokenManager_1.default.issue(user.unique_id);\r\n                res.cookie('token', token, { httpOnly: true });\r\n                return res.status(201).json(JSON.stringify({\r\n                    isSuccess: true,\r\n                    user: {\r\n                        unique_id: user.unique_id,\r\n                        nick: user.nick,\r\n                        profileImgSrc: user.profileImgSrc,\r\n                        isAdmin: user.isAdmin\r\n                    }\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({ isSuccess: false, errMsg: '서버 오류입니다.' }));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = joinCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/localCtrls/joinCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/localCtrls/loginCtrl.ts":
/*!**********************************************!*\
  !*** ./src/api/auth/localCtrls/loginCtrl.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst TokenManager_1 = __webpack_require__(/*! ~modules/TokenManager */ \"./src/modules/TokenManager.ts\");\r\nconst loginCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { email, password } = req.body;\r\n                const isBadRequest = (!email ||\r\n                    !password);\r\n                if (isBadRequest) {\r\n                    return res.status(400).json(JSON.stringify({}));\r\n                }\r\n                const user = yield user_1.default.findOne({\r\n                    email: String(email),\r\n                    memberType: memberTypes.LOCAL\r\n                }).lean();\r\n                if (user === null) {\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: false,\r\n                        errMsg: '이메일 또는 비밀번호를 잘못 입력하셨습니다. 등록되지 않은 이메일이거나 비밀번호가 다릅니다.'\r\n                    }));\r\n                }\r\n                const currentHash = Encryption_1.default.getHash(String(password), user.key.salt);\r\n                const dbHash = user.key.hash;\r\n                if (currentHash === dbHash) {\r\n                    const token = TokenManager_1.default.issue(user.unique_id);\r\n                    res.cookie('token', token, { httpOnly: true });\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: true,\r\n                        user: {\r\n                            unique_id: user.unique_id,\r\n                            nick: user.nick,\r\n                            profileImgSrc: user.profileImgSrc\r\n                        }\r\n                    }));\r\n                }\r\n                else {\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: false,\r\n                        errMsg: '이메일 또는 비밀번호를 잘못 입력하셨습니다. 등록되지 않은 이메일이거나 비밀번호가 다릅니다.'\r\n                    }));\r\n                }\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = loginCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/localCtrls/loginCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/getPreUserCtrl.ts":
/*!****************************************************!*\
  !*** ./src/api/auth/socialCtrls/getPreUserCtrl.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst redisClient = redis.createClient();\r\nconst getPreUserCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const preSocialUser_key = req.cookies.preSocialUser_key;\r\n                const preUser = yield getPreUserFromRedis(preSocialUser_key);\r\n                return res.status(200).json(JSON.stringify({ preUser }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nfunction getPreUserFromRedis(preSocialUser_key) {\r\n    return new Promise((resolve, reject) => {\r\n        redisClient.get(preSocialUser_key, (err, reply) => {\r\n            if (err) {\r\n                return reject();\r\n            }\r\n            const preUser = JSON.parse(reply);\r\n            resolve(preUser);\r\n        });\r\n    });\r\n}\r\nexports.default = getPreUserCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/getPreUserCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/googleCtrl.ts":
/*!************************************************!*\
  !*** ./src/api/auth/socialCtrls/googleCtrl.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst node_fetch_1 = __webpack_require__(/*! node-fetch */ \"node-fetch\");\r\nconst googleCtrl = (req, res) => {\r\n    const { code } = req.query;\r\n    // var postVal = \"grant_type=authorization_code\"+\"&code=\"+req.query.code+\"&client_id=\"+CLIENT_ID+\"&client_secret=\"+CLIENT_SECRET+\"&redirect_uri=\"+REDIRECT_URI;\r\n    node_fetch_1.default('https://www.googleapis.com/auth/plus.login', {\r\n        headers: { 'content-type': 'application/x-www-form-urlencoded' },\r\n        method: \"POST\"\r\n    })\r\n        .then(data => data.json())\r\n        .then(json => console.log(json));\r\n};\r\nexports.default = googleCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/googleCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/index.ts":
/*!*******************************************!*\
  !*** ./src/api/auth/socialCtrls/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar kakaoCtrl_1 = __webpack_require__(/*! ./kakaoCtrl */ \"./src/api/auth/socialCtrls/kakaoCtrl.ts\");\r\nexports.kakaoCtrl = kakaoCtrl_1.default;\r\nvar kakaoCallbackCtrl_1 = __webpack_require__(/*! ./kakaoCallbackCtrl */ \"./src/api/auth/socialCtrls/kakaoCallbackCtrl.ts\");\r\nexports.kakaoCallbackCtrl = kakaoCallbackCtrl_1.default;\r\nvar naverCtrl_1 = __webpack_require__(/*! ./naverCtrl */ \"./src/api/auth/socialCtrls/naverCtrl.ts\");\r\nexports.naverCtrl = naverCtrl_1.default;\r\nvar naverCallbackCtrl_1 = __webpack_require__(/*! ./naverCallbackCtrl */ \"./src/api/auth/socialCtrls/naverCallbackCtrl.ts\");\r\nexports.naverCallbackCtrl = naverCallbackCtrl_1.default;\r\nvar googleCtrl_1 = __webpack_require__(/*! ./googleCtrl */ \"./src/api/auth/socialCtrls/googleCtrl.ts\");\r\nexports.googleCtrl = googleCtrl_1.default;\r\nvar getPreUserCtrl_1 = __webpack_require__(/*! ./getPreUserCtrl */ \"./src/api/auth/socialCtrls/getPreUserCtrl.ts\");\r\nexports.getPreUserCtrl = getPreUserCtrl_1.default;\r\nvar joinCtrl_1 = __webpack_require__(/*! ./joinCtrl */ \"./src/api/auth/socialCtrls/joinCtrl.ts\");\r\nexports.joinCtrl = joinCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/index.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/joinCtrl.ts":
/*!**********************************************!*\
  !*** ./src/api/auth/socialCtrls/joinCtrl.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst node_fetch_1 = __webpack_require__(/*! node-fetch */ \"node-fetch\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst redisClient = redis.createClient();\r\nconst joinCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const nick = req.body.nick;\r\n                const isBadRequest = (!nick ||\r\n                    !textValidator_1.default.validateBlank(String(nick)) ||\r\n                    !textValidator_1.default.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||\r\n                    !textValidator_1.default.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX));\r\n                if (isBadRequest) {\r\n                    return res.status(400).json(JSON.stringify({}));\r\n                }\r\n                const preSocialUser_key = req.cookies.preSocialUser_key;\r\n                const preUser = yield getPreSocialUser(preSocialUser_key);\r\n                if (!preUser) {\r\n                    return res.status(500).json(JSON.stringify({}));\r\n                }\r\n                console.log(preUser.social_id, '로가입시크너아님?');\r\n                const user = (yield new user_1.default({\r\n                    unique_id: String(Number(new Date())),\r\n                    isAdmin: false,\r\n                    memberType: preUser.memberType,\r\n                    social_id: preUser.social_id,\r\n                    nick,\r\n                    sex: \"M\"\r\n                }).save());\r\n                const userPath = path.join(global.__rootDir, `/public/users/${user.unique_id}`);\r\n                fs.mkdirSync(userPath);\r\n                if (preUser.profileImgSrc) {\r\n                    const bufferImg = yield node_fetch_1.default(preUser.profileImgSrc).then(data => data.buffer());\r\n                    const extName = path.extname(preUser.profileImgSrc);\r\n                    const fileName = 'profile' + extName;\r\n                    fs.writeFileSync(`${userPath}/${fileName}`, bufferImg, 'binary');\r\n                    const imgSrc = `/public/users/${user.unique_id}/${fileName}`;\r\n                    const update = { $set: { profileImgSrc: imgSrc } };\r\n                    yield user.update(update);\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: true,\r\n                        user: {\r\n                            unique_id: user.unique_id,\r\n                            nick: user.nick,\r\n                            profileImgSrc: imgSrc,\r\n                            isAdmin: user.isAdmin\r\n                        }\r\n                    }));\r\n                }\r\n                else {\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: true,\r\n                        user: {\r\n                            unique_id: user.unique_id,\r\n                            nick: user.nick,\r\n                            profileImgSrc: user.profileImgSrc,\r\n                            isAdmin: user.isAdmin\r\n                        }\r\n                    }));\r\n                }\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nfunction getPreSocialUser(preSocialUser_key) {\r\n    return new Promise(resolve => {\r\n        redisClient.get(preSocialUser_key, (err, reply) => {\r\n            const preUser = JSON.parse(reply);\r\n            resolve(preUser);\r\n        });\r\n    });\r\n}\r\nexports.default = joinCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/joinCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/kakaoCallbackCtrl.ts":
/*!*******************************************************!*\
  !*** ./src/api/auth/socialCtrls/kakaoCallbackCtrl.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst kakao_config_1 = __webpack_require__(/*! ~configs/secret/kakao.config */ \"./src/configs/secret/kakao.config.ts\");\r\nconst node_fetch_1 = __webpack_require__(/*! node-fetch */ \"node-fetch\");\r\nconst uniqueStringMaker_1 = __webpack_require__(/*! ~modules/uniqueStringMaker */ \"./src/modules/uniqueStringMaker.ts\");\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst redisClient = redis.createClient();\r\nconst kakaoCallbackCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { code } = req.query; // user kakao login 후 발급된 인증코드\r\n                const client_id = kakao_config_1.default.client_id;\r\n                const redirect_uri = kakao_config_1.default.redirect_uri;\r\n                const responseWithAccessToken = yield node_fetch_1.default(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`, {\r\n                    method: \"POST\"\r\n                })\r\n                    .then(data => data.json());\r\n                const { access_token } = responseWithAccessToken;\r\n                const response = yield node_fetch_1.default(`https://kapi.kakao.com/v2/user/me`, {\r\n                    method: \"POST\",\r\n                    headers: {\r\n                        Authorization: `Bearer ${access_token}`,\r\n                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'\r\n                    },\r\n                })\r\n                    .then(data => data.json());\r\n                console.log(response);\r\n                const social_id = response.id;\r\n                const preSocialUser_key = uniqueStringMaker_1.default();\r\n                res.cookie('preSocialUser_key', preSocialUser_key, { httpOnly: true });\r\n                const conditions = { social_id, memberType: memberTypes.KAKAO };\r\n                const userBySocialId = yield user_1.default.findOne(conditions);\r\n                console.log(userBySocialId, '이거널이야?');\r\n                const preUser = (function () {\r\n                    if (userBySocialId) {\r\n                        return ({\r\n                            isMember: true,\r\n                            social_id,\r\n                            unique_id: userBySocialId.unique_id,\r\n                            nick: userBySocialId.nick,\r\n                            profileImgSrc: userBySocialId.profileImgSrc\r\n                        });\r\n                    }\r\n                    else {\r\n                        return ({\r\n                            isMember: false,\r\n                            social_id,\r\n                            nick: response.properties.nickname,\r\n                            memberType: memberTypes.KAKAO,\r\n                            profileImgSrc: response.properties.profile_image\r\n                        });\r\n                    }\r\n                })();\r\n                redisClient.set(preSocialUser_key, JSON.stringify(preUser));\r\n                res.redirect('/preSocialLogin');\r\n                setTimeout(() => {\r\n                    redisClient.del(preSocialUser_key);\r\n                }, 1000 * 60 * 3 + 1000 * 3);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                //미완\r\n                res.redirect('/error');\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = kakaoCallbackCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/kakaoCallbackCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/kakaoCtrl.ts":
/*!***********************************************!*\
  !*** ./src/api/auth/socialCtrls/kakaoCtrl.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst kakao_config_1 = __webpack_require__(/*! ~configs/secret/kakao.config */ \"./src/configs/secret/kakao.config.ts\");\r\nconst kakaoCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const url = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_config_1.default.client_id}&redirect_uri=${kakao_config_1.default.redirect_uri}&response_type=code`;\r\n                res.redirect(url);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = kakaoCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/kakaoCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/naverCallbackCtrl.ts":
/*!*******************************************************!*\
  !*** ./src/api/auth/socialCtrls/naverCallbackCtrl.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst node_fetch_1 = __webpack_require__(/*! node-fetch */ \"node-fetch\");\r\nconst naver_config_1 = __webpack_require__(/*! ~configs/secret/naver.config */ \"./src/configs/secret/naver.config.ts\");\r\nconst uniqueStringMaker_1 = __webpack_require__(/*! ~modules/uniqueStringMaker */ \"./src/modules/uniqueStringMaker.ts\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst redisClient = redis.createClient();\r\nconst naverCallbackCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { code } = req.query;\r\n                const client_id = naver_config_1.default.client_id;\r\n                const client_secret = naver_config_1.default.client_secret;\r\n                const responseWithToken = yield node_fetch_1.default(`https://nid.naver.com/oauth2.0/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&state=123&code=${code}`, {\r\n                    method: \"POST\"\r\n                })\r\n                    .then(data => data.json());\r\n                const { access_token } = responseWithToken;\r\n                const response = yield node_fetch_1.default('https://openapi.naver.com/v1/nid/me', {\r\n                    method: \"POST\",\r\n                    headers: {\r\n                        Authorization: `Bearer ${access_token}`,\r\n                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'\r\n                    }\r\n                })\r\n                    .then(data => data.json());\r\n                if (response.message !== 'success') {\r\n                    return res.redirect('/SocialErrorPage');\r\n                }\r\n                const social_id = response.response.id;\r\n                const nick = response.response.name;\r\n                const gender = response.response.gender;\r\n                const profileImgSrc = response.response.profile_image;\r\n                const userBySocialId = yield user_1.default.findOne({ social_id });\r\n                const preUser = (function () {\r\n                    if (userBySocialId) {\r\n                        return ({\r\n                            isMember: true,\r\n                            unique_id: userBySocialId.unique_id,\r\n                            nick: userBySocialId.nick,\r\n                            isAdmin: userBySocialId.isAdmin,\r\n                            profileImgSrc: userBySocialId.profileImgSrc\r\n                        });\r\n                    }\r\n                    else {\r\n                        return ({\r\n                            isMember: false,\r\n                            social_id,\r\n                            nick,\r\n                            isAdmin: false,\r\n                            profileImgSrc\r\n                        });\r\n                    }\r\n                })();\r\n                const preSocialUser_key = uniqueStringMaker_1.default();\r\n                res.cookie('preSocialUser_key', preSocialUser_key, { httpOnly: true });\r\n                redisClient.set(preSocialUser_key, JSON.stringify(preUser));\r\n                setTimeout(() => {\r\n                    redisClient.del(preSocialUser_key);\r\n                }, 1000 * 60 * 3 + 1000 * 3);\r\n                return res.redirect('/preSocialLogin');\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res;\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = naverCallbackCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/naverCallbackCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/socialCtrls/naverCtrl.ts":
/*!***********************************************!*\
  !*** ./src/api/auth/socialCtrls/naverCtrl.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst naver_config_1 = __webpack_require__(/*! ~configs/secret/naver.config */ \"./src/configs/secret/naver.config.ts\");\r\nconst naverCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const client_id = naver_config_1.default.client_id;\r\n                const redirect_uri = naver_config_1.default.redirect_uri;\r\n                const url = `https://nid.naver.com/oauth2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=123`;\r\n                res.redirect(url);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = naverCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/socialCtrls/naverCtrl.ts?");

/***/ }),

/***/ "./src/api/index.ts":
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst auth_1 = __webpack_require__(/*! ./auth */ \"./src/api/auth/index.ts\");\r\nconst posts_1 = __webpack_require__(/*! ./posts */ \"./src/api/posts/index.ts\");\r\nconst visitorCards_1 = __webpack_require__(/*! ./visitorCards */ \"./src/api/visitorCards/index.ts\");\r\nconst users_1 = __webpack_require__(/*! ./users */ \"./src/api/users/index.ts\");\r\nconst admin_1 = __webpack_require__(/*! ./admin */ \"./src/api/admin/index.ts\");\r\nconst api = express_1.Router();\r\napi.use('/auth', auth_1.default);\r\napi.use('/posts', posts_1.default);\r\napi.use('/visitorCards', visitorCards_1.default);\r\napi.use('/users', users_1.default);\r\napi.use('/admin', admin_1.default);\r\nexports.default = api;\r\n\n\n//# sourceURL=webpack:///./src/api/index.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/getAllPostsCtrl.ts":
/*!************************************************!*\
  !*** ./src/api/posts/ctrls/getAllPostsCtrl.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst getAllpostsCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const populationOption = { path: 'author', select: '-_id nick profileImgSrc' };\r\n                const conditions = { isPublished: true };\r\n                const sortOption = { createdDate: -1 };\r\n                const posts = yield post_1.default.find(conditions)\r\n                    .sort(sortOption)\r\n                    .populate(populationOption);\r\n                return res.status(200).json(JSON.stringify({ posts }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = getAllpostsCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/getAllPostsCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/index.ts":
/*!**************************************!*\
  !*** ./src/api/posts/ctrls/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar getAllPostsCtrl_1 = __webpack_require__(/*! ./getAllPostsCtrl */ \"./src/api/posts/ctrls/getAllPostsCtrl.ts\");\r\nexports.getAllPostsCtrl = getAllPostsCtrl_1.default;\r\nvar viewUpPostCtrl_1 = __webpack_require__(/*! ./viewUpPostCtrl */ \"./src/api/posts/ctrls/viewUpPostCtrl.ts\");\r\nexports.viewUpPostCtrl = viewUpPostCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/index.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/viewUpPostCtrl.ts":
/*!***********************************************!*\
  !*** ./src/api/posts/ctrls/viewUpPostCtrl.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst viewUpPost = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const _id = req.params._id;\r\n                const conditions = { _id };\r\n                const post = yield post_1.default.findOne(conditions);\r\n                if (!post) {\r\n                    return res.json(410).json(JSON.stringify({}));\r\n                }\r\n                post.views += 1;\r\n                yield post.save();\r\n                return res.json(204);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.json(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = viewUpPost;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/viewUpPostCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/index.ts":
/*!********************************!*\
  !*** ./src/api/posts/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst ctrls = __webpack_require__(/*! ./ctrls */ \"./src/api/posts/ctrls/index.ts\");\r\nconst posts = express_1.Router();\r\nposts.get('/', ctrls.getAllPostsCtrl);\r\nposts.patch('/post/:_id/view', ctrls.viewUpPostCtrl);\r\nexports.default = posts;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/index.ts?");

/***/ }),

/***/ "./src/api/users/index.ts":
/*!********************************!*\
  !*** ./src/api/users/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst users = express_1.Router();\r\nusers.patch('/user/password', tokenValidationMiddleware_1.default, (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { password } = req.body;\r\n                const isBadRequest = ((!password) ||\r\n                    (password.constructor !== String) ||\r\n                    (!textValidator_1.default.validateBlank(password)) ||\r\n                    (!textValidator_1.default.validateMinLength(password, userConfig.PASSWORD_CHAR_MIN)) ||\r\n                    (!textValidator_1.default.validateMaxLength(password, userConfig.PASSWORD_CHAR_MAX)));\r\n                if (isBadRequest) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                const user_oid = req.user._id;\r\n                const pwSet = Encryption_1.default.getPwSet(password);\r\n                const user = user_1.default.findOne({ _id: user_oid });\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n});\r\nusers.patch('/user/details', (req, res) => {\r\n});\r\nexports.default = users;\r\n\n\n//# sourceURL=webpack:///./src/api/users/index.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/getAllVisitorCardsCtrl.ts":
/*!**************************************************************!*\
  !*** ./src/api/visitorCards/ctrls/getAllVisitorCardsCtrl.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst visitorCard_1 = __webpack_require__(/*! ~db/models/visitorCard */ \"./src/db/models/visitorCard.ts\");\r\nconst getAllVisitorCardsCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const sortOption = { createdDate: -1 };\r\n                const populateOption = { path: 'memberAuthor', select: '-_id nick profileImgSrc' };\r\n                const visitorCards = yield visitorCard_1.default.find()\r\n                    .sort(sortOption)\r\n                    .populate(populateOption);\r\n                return res.status(200).json(JSON.stringify({ visitorCards }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = getAllVisitorCardsCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/getAllVisitorCardsCtrl.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/index.ts":
/*!*********************************************!*\
  !*** ./src/api/visitorCards/ctrls/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar getAllVisitorCardsCtrl_1 = __webpack_require__(/*! ./getAllVisitorCardsCtrl */ \"./src/api/visitorCards/ctrls/getAllVisitorCardsCtrl.ts\");\r\nexports.getAllVisitorCardsCtrl = getAllVisitorCardsCtrl_1.default;\r\nvar writeMemberVisitorCardCtrl_1 = __webpack_require__(/*! ./writeMemberVisitorCardCtrl */ \"./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts\");\r\nexports.writeMemberVisitorCardCtrl = writeMemberVisitorCardCtrl_1.default;\r\nvar writeNonMemberVisitorCardCtrl_1 = __webpack_require__(/*! ./writeNonMemberVisitorCardCtrl */ \"./src/api/visitorCards/ctrls/writeNonMemberVisitorCardCtrl.ts\");\r\nexports.writeNonMemberVisitorCardCtrl = writeNonMemberVisitorCardCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/index.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts":
/*!******************************************************************!*\
  !*** ./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst visitorCard_1 = __webpack_require__(/*! ~db/models/visitorCard */ \"./src/db/models/visitorCard.ts\");\r\nconst visitorCardConfig = __webpack_require__(/*! ~configs/visitorCard.config.json */ \"./src/configs/visitorCard.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst writeMemberVisitorCardCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { user } = req;\r\n                const { description } = req.body;\r\n                const isBadRequest = ((!description) ||\r\n                    (description.constructor !== String) ||\r\n                    (!textValidator_1.default.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX)));\r\n                if (isBadRequest) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                const visitorCard = (yield new visitorCard_1.default({\r\n                    isMember: true,\r\n                    isAdmin: user.isAdmin,\r\n                    description,\r\n                    memberAuthor: user._id\r\n                }).save())\r\n                    .toObject();\r\n                return res.status(201).json(JSON.stringify({\r\n                    visitorCard: {\r\n                        isMember: visitorCard.isMember,\r\n                        isAdmin: visitorCard.isAdmin,\r\n                        description: visitorCard.description,\r\n                        memberAuthor: {\r\n                            nick: user.nick,\r\n                            profileImgSrc: user.profileImgSrc\r\n                        }\r\n                    }\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = writeMemberVisitorCardCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/writeNonMemberVisitorCardCtrl.ts":
/*!*********************************************************************!*\
  !*** ./src/api/visitorCards/ctrls/writeNonMemberVisitorCardCtrl.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst visitorCard_1 = __webpack_require__(/*! ~db/models/visitorCard */ \"./src/db/models/visitorCard.ts\");\r\nconst visitorCardConfig = __webpack_require__(/*! ~configs/visitorCard.config.json */ \"./src/configs/visitorCard.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst writeNonMemberVisitorCardCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { description, nick } = req.body;\r\n                const isBadRequest = ((!description) ||\r\n                    (description.constructor !== String) ||\r\n                    (!textValidator_1.default.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX)) ||\r\n                    (!nick) ||\r\n                    (nick.constructor !== String) ||\r\n                    (!textValidator_1.default.validateBlank(nick)) ||\r\n                    (!textValidator_1.default.validateMinLength(nick, visitorCardConfig.NICK_CHAR_MIN)) ||\r\n                    (!textValidator_1.default.validateMaxLength(nick, visitorCardConfig.NICK_CHAR_MAX)));\r\n                if (isBadRequest) {\r\n                    return res.status(400).json(JSON.stringify({}));\r\n                }\r\n                const visitorCard = (yield new visitorCard_1.default({\r\n                    isMember: false,\r\n                    isAdmin: false,\r\n                    description,\r\n                    nonMemberAuthor: { nick }\r\n                }).save())\r\n                    .toObject();\r\n                return res.status(201).json(JSON.stringify({\r\n                    visitorCard: {\r\n                        _id: visitorCard._id,\r\n                        isMember: visitorCard.isMember,\r\n                        isAdmin: visitorCard.isAdmin,\r\n                        description: visitorCard.description,\r\n                        nonMemberAuthor: { nick: visitorCard.nonMemberAuthor.nick },\r\n                        createdDate: visitorCard.createdDate\r\n                    }\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = writeNonMemberVisitorCardCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/writeNonMemberVisitorCardCtrl.ts?");

/***/ }),

/***/ "./src/api/visitorCards/index.ts":
/*!***************************************!*\
  !*** ./src/api/visitorCards/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst ctrls = __webpack_require__(/*! ./ctrls */ \"./src/api/visitorCards/ctrls/index.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst visitorCards = express_1.Router();\r\nvisitorCards.get('/', ctrls.getAllVisitorCardsCtrl);\r\nvisitorCards.post('/forMember', tokenValidationMiddleware_1.default, ctrls.writeMemberVisitorCardCtrl);\r\nvisitorCards.post('/forNonMember', ctrls.writeNonMemberVisitorCardCtrl);\r\nexports.default = visitorCards;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/index.ts?");

/***/ }),

/***/ "./src/configs/secret/db.config.ts":
/*!*****************************************!*\
  !*** ./src/configs/secret/db.config.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst DB_PORT = 27017;\r\nconst DB_NAME = 'test';\r\nconst DB_URL = `mongodb://localhost:${DB_PORT}/${DB_NAME}`;\r\nexports.default = {\r\n    url: DB_URL,\r\n    option: { useNewUrlParser: true }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/configs/secret/db.config.ts?");

/***/ }),

/***/ "./src/configs/secret/encryption.config.ts":
/*!*************************************************!*\
  !*** ./src/configs/secret/encryption.config.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    byteSize: 64,\r\n    iiterations: 99998,\r\n    keyLen: 64,\r\n};\r\n\n\n//# sourceURL=webpack:///./src/configs/secret/encryption.config.ts?");

/***/ }),

/***/ "./src/configs/secret/jwt.config.ts":
/*!******************************************!*\
  !*** ./src/configs/secret/jwt.config.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst secret = \"ASLDASE(#FG(ETGJOEGK#IR(F)GPR\";\r\nconst options = {\r\n    expiresIn: '7d',\r\n    issuer: 'www.bpeakBlog.com',\r\n    subject: 'userInfo'\r\n};\r\nexports.default = {\r\n    secret,\r\n    options\r\n};\r\n\n\n//# sourceURL=webpack:///./src/configs/secret/jwt.config.ts?");

/***/ }),

/***/ "./src/configs/secret/kakao.config.ts":
/*!********************************************!*\
  !*** ./src/configs/secret/kakao.config.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    client_id: \"d66763cb3d1e62995bc0b50312a5f564\",\r\n    redirect_uri: \"http://localhost/api/auth/social/kakao/callback\"\r\n};\r\n\n\n//# sourceURL=webpack:///./src/configs/secret/kakao.config.ts?");

/***/ }),

/***/ "./src/configs/secret/naver.config.ts":
/*!********************************************!*\
  !*** ./src/configs/secret/naver.config.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    client_id: \"SrVRVgQ8XyzQqVLj9kec\",\r\n    client_secret: \"JKFL6IM3WG\",\r\n    redirect_uri: \"http://127.0.0.1/api/auth/social/naver/callback\"\r\n};\r\n\n\n//# sourceURL=webpack:///./src/configs/secret/naver.config.ts?");

/***/ }),

/***/ "./src/configs/user.config.json":
/*!**************************************!*\
  !*** ./src/configs/user.config.json ***!
  \**************************************/
/*! exports provided: NICK_CHAR_MIN, NICK_CHAR_MAX, EMAIL_CHAR_MAX, PASSWORD_CHAR_MIN, PASSWORD_CHAR_MAX, default */
/***/ (function(module) {

eval("module.exports = {\"NICK_CHAR_MIN\":2,\"NICK_CHAR_MAX\":10,\"EMAIL_CHAR_MAX\":254,\"PASSWORD_CHAR_MIN\":8,\"PASSWORD_CHAR_MAX\":16};\n\n//# sourceURL=webpack:///./src/configs/user.config.json?");

/***/ }),

/***/ "./src/configs/visitorCard.config.json":
/*!*********************************************!*\
  !*** ./src/configs/visitorCard.config.json ***!
  \*********************************************/
/*! exports provided: NICK_CHAR_MIN, NICK_CHAR_MAX, DESCRIPTION_CHAR_MAX, default */
/***/ (function(module) {

eval("module.exports = {\"NICK_CHAR_MIN\":2,\"NICK_CHAR_MAX\":10,\"DESCRIPTION_CHAR_MAX\":1000};\n\n//# sourceURL=webpack:///./src/configs/visitorCard.config.json?");

/***/ }),

/***/ "./src/constants/memberTypes.ts":
/*!**************************************!*\
  !*** ./src/constants/memberTypes.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.LOCAL = \"LOCAL\";\r\nexports.NAVER = \"NAVER\";\r\nexports.FACEBOOK = \"FACEBOOK\";\r\nexports.GOOGLE = \"GOOGLE\";\r\nexports.KAKAO = \"KAKAO\";\r\n\n\n//# sourceURL=webpack:///./src/constants/memberTypes.ts?");

/***/ }),

/***/ "./src/constants/sexTypes.ts":
/*!***********************************!*\
  !*** ./src/constants/sexTypes.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.M = \"M\";\r\nexports.W = \"W\";\r\n\n\n//# sourceURL=webpack:///./src/constants/sexTypes.ts?");

/***/ }),

/***/ "./src/db/dbLauncher.ts":
/*!******************************!*\
  !*** ./src/db/dbLauncher.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst db_config_1 = __webpack_require__(/*! ~configs/secret/db.config */ \"./src/configs/secret/db.config.ts\");\r\nconst dbLauncher = () => {\r\n    const db = mongoose.connection;\r\n    db.on('error', console.error.bind(console, 'connection error : '));\r\n    db.once('open', () => {\r\n        console.log('MONGODB CONNECTED SUCCESS BY MONGOOSE');\r\n    });\r\n    mongoose.connect(db_config_1.default.url, db_config_1.default.option);\r\n};\r\nexports.default = dbLauncher;\r\n\n\n//# sourceURL=webpack:///./src/db/dbLauncher.ts?");

/***/ }),

/***/ "./src/db/models/post.ts":
/*!*******************************!*\
  !*** ./src/db/models/post.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst autoIncrement = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\r\nconst Schema = mongoose.Schema;\r\nconst postSchema = new Schema({\r\n    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },\r\n    isPublished: { type: Boolean, required: true },\r\n    category: { type: String, required: true },\r\n    coverImgSrc: { type: String },\r\n    title: { type: String, required: true },\r\n    intro: { type: String, required: true },\r\n    tags: { type: Array, required: true },\r\n    contentState: { type: Object },\r\n    createdDate: { type: Date, default: Date.now },\r\n    editedDate: { type: Date, default: Date.now },\r\n    isEdited: { type: Boolean, default: false },\r\n    views: { type: Number, default: 0 },\r\n});\r\nconst Post = mongoose.model('post', postSchema);\r\nexports.default = Post;\r\nautoIncrement.initialize(mongoose.connection);\r\npostSchema.plugin(autoIncrement.plugin, 'post');\r\n\n\n//# sourceURL=webpack:///./src/db/models/post.ts?");

/***/ }),

/***/ "./src/db/models/user.ts":
/*!*******************************!*\
  !*** ./src/db/models/user.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst Schema = mongoose.Schema;\r\nconst userSchema = new Schema({\r\n    // common\r\n    unique_id: { type: String, required: true },\r\n    memberType: {\r\n        type: String,\r\n        required: true,\r\n        validate: {\r\n            validator: (v) => {\r\n                return (v === memberTypes.FACEBOOK ||\r\n                    v === memberTypes.GOOGLE ||\r\n                    v === memberTypes.LOCAL ||\r\n                    v === memberTypes.NAVER ||\r\n                    v === memberTypes.KAKAO);\r\n            },\r\n            message: \"user schema / memberType 알수없는 유형\"\r\n        }\r\n    },\r\n    isAdmin: { type: Boolean, required: true },\r\n    nick: {\r\n        type: String,\r\n        required: true,\r\n        validate: {\r\n            validator: (v) => {\r\n                return (v.length <= userConfig.NICK_CHAR_MAX);\r\n            },\r\n            message: `user schema / nick 의 맥스길이 ${userConfig.NICK_CHAR_MAX}`\r\n        }\r\n    },\r\n    sex: {\r\n        type: String,\r\n        required: true,\r\n        validate: {\r\n            validator: (v) => {\r\n                return (v === 'M' || v === 'W');\r\n            },\r\n            message: \"user schema / sex 알수없는 유형\"\r\n        }\r\n    },\r\n    profileImgSrc: { type: String, default: null },\r\n    joinDate: { type: Date, default: Date.now },\r\n    // local\r\n    key: {\r\n        hash: { type: String },\r\n        salt: { type: String }\r\n    },\r\n    email: {\r\n        type: String,\r\n        validate: {\r\n            validator: (v) => {\r\n                return v.length <= userConfig.EMAIL_CHAR_MAX;\r\n            },\r\n            message: `user schema / email 맥스길이 ${userConfig.EMAIL_CHAR_MAX}`\r\n        }\r\n    },\r\n    //social\r\n    social_id: { type: String }\r\n});\r\nconst User = mongoose.model('user', userSchema);\r\nexports.default = User;\r\n\n\n//# sourceURL=webpack:///./src/db/models/user.ts?");

/***/ }),

/***/ "./src/db/models/visitorCard.ts":
/*!**************************************!*\
  !*** ./src/db/models/visitorCard.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst autoIncrement = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\r\nconst Schema = mongoose.Schema;\r\nconst visitorCardSchema = new Schema({\r\n    isMember: { type: Boolean, required: true },\r\n    isAdmin: { type: Boolean, required: true },\r\n    memberAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },\r\n    nonMemberAuthor: {\r\n        nick: { type: String }\r\n    },\r\n    description: { type: String, required: true, },\r\n    createdDate: { type: Date, default: Date.now }\r\n});\r\nconst VisitorCard = mongoose.model('visitorCard', visitorCardSchema);\r\nexports.default = VisitorCard;\r\nautoIncrement.initialize(mongoose.connection);\r\nvisitorCardSchema.plugin(autoIncrement.plugin, 'visitorCard');\r\n\n\n//# sourceURL=webpack:///./src/db/models/visitorCard.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconsole.log('SERVER STARTING.....');\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nglobal.__rootDir = path.resolve(__dirname);\r\nconst App_1 = __webpack_require__(/*! ./App */ \"./src/App.ts\");\r\nconst dbLauncher_1 = __webpack_require__(/*! ./db/dbLauncher */ \"./src/db/dbLauncher.ts\");\r\ndbLauncher_1.default();\r\nconst app = new App_1.default().app;\r\nconst PORT = Number(process.env.PORT) || 80;\r\napp.listen(PORT, () => { console.log(`PORT ${PORT} CONNECTED SUCCESS`); });\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/middlewares/fileToBufferMiddleware.ts":
/*!***************************************************!*\
  !*** ./src/middlewares/fileToBufferMiddleware.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst multer = __webpack_require__(/*! multer */ \"multer\");\r\nconst storage = multer.memoryStorage();\r\nconst fileToBufferMiddleware = multer({ storage });\r\nexports.default = fileToBufferMiddleware;\r\n\n\n//# sourceURL=webpack:///./src/middlewares/fileToBufferMiddleware.ts?");

/***/ }),

/***/ "./src/middlewares/tokenValidationMiddleware.ts":
/*!******************************************************!*\
  !*** ./src/middlewares/tokenValidationMiddleware.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst jwt_config_1 = __webpack_require__(/*! ~configs/secret/jwt.config */ \"./src/configs/secret/jwt.config.ts\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\n//인증부분 수정 필요함...\r\nconst tokenValidationMiddleware = (req, res, next) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const token = req.cookies.token;\r\n                //토큰 미존재\r\n                if (!token) {\r\n                    return res.status(401).json(JSON.stringify({}));\r\n                }\r\n                const decoded = jwt.verify(token, jwt_config_1.default.secret);\r\n                const unique_id = decoded.user.unique_id;\r\n                const user = yield user_1.default.findOne({ unique_id }).lean();\r\n                //존재하지 않는 유저\r\n                if (!user) {\r\n                    res.clearCookie(\"token\");\r\n                    res.status(401).json(JSON.stringify({}));\r\n                }\r\n                req.user = user;\r\n                return next();\r\n            }\r\n            catch (err) {\r\n                //검증에러\r\n                console.log(err, '에러한번보자');\r\n                res.clearCookie(\"token\");\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = tokenValidationMiddleware;\r\n\n\n//# sourceURL=webpack:///./src/middlewares/tokenValidationMiddleware.ts?");

/***/ }),

/***/ "./src/modules/Encryption.ts":
/*!***********************************!*\
  !*** ./src/modules/Encryption.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\nconst encryption_config_1 = __webpack_require__(/*! ~configs/secret/encryption.config */ \"./src/configs/secret/encryption.config.ts\");\r\nclass Encryption {\r\n    static getPwSet(password) {\r\n        const salt = this.getSalt();\r\n        const hash = this.getHash(password, salt);\r\n        return { salt, hash };\r\n    }\r\n}\r\nEncryption.getSalt = () => {\r\n    return crypto.randomBytes(encryption_config_1.default.byteSize).toString('base64');\r\n};\r\nEncryption.getHash = (password, salt) => {\r\n    return crypto.pbkdf2Sync(password, salt, encryption_config_1.default.iiterations, encryption_config_1.default.keyLen, 'sha512').toString('base64');\r\n};\r\nexports.default = Encryption;\r\n\n\n//# sourceURL=webpack:///./src/modules/Encryption.ts?");

/***/ }),

/***/ "./src/modules/TokenManager.ts":
/*!*************************************!*\
  !*** ./src/modules/TokenManager.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst jwt_config_1 = __webpack_require__(/*! ~configs/secret/jwt.config */ \"./src/configs/secret/jwt.config.ts\");\r\nclass TokenManager {\r\n    static issue(unique_id) {\r\n        const token = jwt.sign({\r\n            user: {\r\n                unique_id\r\n            }\r\n        }, jwt_config_1.default.secret, jwt_config_1.default.options);\r\n        return token;\r\n    }\r\n}\r\nexports.default = TokenManager;\r\n\n\n//# sourceURL=webpack:///./src/modules/TokenManager.ts?");

/***/ }),

/***/ "./src/modules/textValidator.ts":
/*!**************************************!*\
  !*** ./src/modules/textValidator.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst textValidator = {\r\n    validateMinLength: (text, min) => {\r\n        return text.length >= min;\r\n    },\r\n    validateMaxLength: (text, max) => {\r\n        return text.length <= max;\r\n    },\r\n    validateBlank: (text) => {\r\n        return text.indexOf(' ') === -1;\r\n    }\r\n};\r\nexports.default = textValidator;\r\n\n\n//# sourceURL=webpack:///./src/modules/textValidator.ts?");

/***/ }),

/***/ "./src/modules/uniqueStringMaker.ts":
/*!******************************************!*\
  !*** ./src/modules/uniqueStringMaker.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = () => {\r\n    const uniqueString = Math.random().toString(36) + String(Number(new Date()));\r\n    return uniqueString;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/modules/uniqueStringMaker.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-auto-increment":
/*!******************************************!*\
  !*** external "mongoose-auto-increment" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-auto-increment\");\n\n//# sourceURL=webpack:///external_%22mongoose-auto-increment%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-fetch\");\n\n//# sourceURL=webpack:///external_%22node-fetch%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ })

/******/ });