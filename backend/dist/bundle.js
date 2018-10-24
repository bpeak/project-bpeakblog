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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\r\nconst api_1 = __webpack_require__(/*! ./api */ \"./src/api/index.ts\");\r\nclass App {\r\n    constructor() {\r\n        this.app = express();\r\n        this.parserSetup();\r\n        this.RouterSetup();\r\n    }\r\n    parserSetup() {\r\n        this.app.use(bodyParser.json());\r\n        this.app.use(bodyParser.urlencoded({ extended: false }));\r\n        this.app.use(cookieParser());\r\n    }\r\n    RouterSetup() {\r\n        this.app.use('/api', api_1.default);\r\n        this.app.use('/dist', express.static(path.join(global.__rootDir, '../../frontend/dist')));\r\n        this.app.use('/public', express.static(path.join(global.__rootDir, '/public')));\r\n        this.app.get('*', (req, res) => {\r\n            res.sendFile(path.resolve(global.__rootDir, '../../frontend/dist/index.html'));\r\n        });\r\n    }\r\n}\r\nexports.default = App;\r\n\n\n//# sourceURL=webpack:///./src/App.ts?");

/***/ }),

/***/ "./src/api/admin/adminValidationMiddleware.ts":
/*!****************************************************!*\
  !*** ./src/api/admin/adminValidationMiddleware.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst adminValidationMiddleware = (req, res, next) => {\r\n    const { user } = req;\r\n    if (!user.isAdmin) {\r\n        return res.sendStatus(403);\r\n    }\r\n    next();\r\n};\r\nexports.default = adminValidationMiddleware;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/adminValidationMiddleware.ts?");

/***/ }),

/***/ "./src/api/admin/index.ts":
/*!********************************!*\
  !*** ./src/api/admin/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst postCtrls = __webpack_require__(/*! ./postCtrls */ \"./src/api/admin/postCtrls/index.ts\");\r\nconst visitorCardCtrls = __webpack_require__(/*! ./visitorCardCtrls */ \"./src/api/admin/visitorCardCtrls/index.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst fileToBufferMiddleware_1 = __webpack_require__(/*! ~middlewares/fileToBufferMiddleware */ \"./src/middlewares/fileToBufferMiddleware.ts\");\r\nconst adminValidationMiddleware_1 = __webpack_require__(/*! ./adminValidationMiddleware */ \"./src/api/admin/adminValidationMiddleware.ts\");\r\nconst admin = express_1.Router();\r\nadmin.use('*', tokenValidationMiddleware_1.default);\r\nadmin.use('*', adminValidationMiddleware_1.default);\r\n// posts\r\nadmin.get('/posts', postCtrls.readPosts);\r\nadmin.post('/posts', fileToBufferMiddleware_1.default.single('coverImgFile'), postCtrls.createPost);\r\nadmin.get('/posts/:_id', postCtrls.readPost);\r\nadmin.delete('/posts/:_id', postCtrls.deletePost);\r\nadmin.patch('/posts/:_id', fileToBufferMiddleware_1.default.single('coverImgFile'), postCtrls.updatePost);\r\nadmin.post('/postImgFile', fileToBufferMiddleware_1.default.single('imgFile'), postCtrls.preUploadPostImgFile);\r\n// visitorCards\r\nadmin.delete('/visitorCards/:_id', visitorCardCtrls.deleteVisitorCard);\r\nexports.default = admin;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/index.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/createPost.ts":
/*!***********************************************!*\
  !*** ./src/api/admin/postCtrls/createPost.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const { isPublished, category, title, intro, } = req.body;\r\n        const tags = JSON.parse(req.body.tags);\r\n        const contentState = JSON.parse(req.body.contentState);\r\n        const { user } = req;\r\n        // save post\r\n        const post = yield new post_1.default({\r\n            author: user._id,\r\n            isPublished,\r\n            category,\r\n            title,\r\n            intro,\r\n            tags\r\n        }).save();\r\n        // create post img directory\r\n        fs.mkdirSync(path.join(global.__rootDir, `/public/postImgs/${post._id}`));\r\n        fs.mkdirSync(path.join(global.__rootDir, `/public/postImgs/${post._id}/cover`));\r\n        // coverImgSrc\r\n        // exist O => writeFile and define coverImgSrc\r\n        // exist X => null\r\n        const coverImgFile = req.file;\r\n        const coverImgSrc = !coverImgFile\r\n            ? null\r\n            : (function () {\r\n                const fileName = Date.now() + '-' + coverImgFile.originalname;\r\n                const coverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`;\r\n                fs.writeFileSync(path.join(global.__rootDir, coverImgSrc), coverImgFile.buffer, \"binary\");\r\n                return coverImgSrc;\r\n            })();\r\n        // contentState ( entitymap img src update ( temp => rea ) )\r\n        const tempImgFileNames = fs.readdirSync(path.join(global.__rootDir, '/public/temporary/postImgs'));\r\n        const { entityMap } = contentState;\r\n        for (let key in entityMap) {\r\n            if (entityMap[key].type === 'IMAGE') {\r\n                const tempImgSrc = entityMap[key].data.src;\r\n                const pieces = tempImgSrc.split('/');\r\n                const imgFileName = pieces[pieces.length - 1];\r\n                // is img not exist in tempFolder ?\r\n                if (tempImgFileNames.indexOf(imgFileName) === -1) {\r\n                    return res.sendStatus(410);\r\n                }\r\n                // move imgFile ( temporary foldoer => real foloder )\r\n                const imgSrc = `/public/postImgs/${post._id}/${imgFileName}`;\r\n                const oldPath = path.join(global.__rootDir, tempImgSrc);\r\n                const newPath = path.join(global.__rootDir, imgSrc);\r\n                fs.renameSync(oldPath, newPath);\r\n                entityMap[key].data.src = imgSrc;\r\n            }\r\n        }\r\n        contentState.entityMap = entityMap;\r\n        // delete remaining temp imgs\r\n        const remainingTempImgFiles = fs.readdirSync(path.join(global.__rootDir, '/public/temporary/postImgs'));\r\n        remainingTempImgFiles.forEach((tempImgFileName) => {\r\n            fs.unlinkSync(path.join(global.__rootDir, '/public/temporary/postImgs', tempImgFileName));\r\n        });\r\n        // update contentState, coverImgSrc\r\n        yield post.update({ $set: {\r\n                contentState,\r\n                coverImgSrc\r\n            } });\r\n        return res.status(201).json(JSON.stringify({\r\n            post: { _id: post._id }\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = createPost;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/createPost.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/deletePost.ts":
/*!***********************************************!*\
  !*** ./src/api/admin/postCtrls/deletePost.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const post_id = Number(req.params._id);\r\n        yield post_1.default.findOneAndDelete({ _id: post_id });\r\n        return res.status(200).json(JSON.stringify({ isSuccess: true }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = deletePost;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/deletePost.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/index.ts":
/*!******************************************!*\
  !*** ./src/api/admin/postCtrls/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar readPosts_1 = __webpack_require__(/*! ./readPosts */ \"./src/api/admin/postCtrls/readPosts.ts\");\r\nexports.readPosts = readPosts_1.default;\r\nvar createPost_1 = __webpack_require__(/*! ./createPost */ \"./src/api/admin/postCtrls/createPost.ts\");\r\nexports.createPost = createPost_1.default;\r\nvar readPost_1 = __webpack_require__(/*! ./readPost */ \"./src/api/admin/postCtrls/readPost.ts\");\r\nexports.readPost = readPost_1.default;\r\nvar updatePost_1 = __webpack_require__(/*! ./updatePost */ \"./src/api/admin/postCtrls/updatePost.ts\");\r\nexports.updatePost = updatePost_1.default;\r\nvar deletePost_1 = __webpack_require__(/*! ./deletePost */ \"./src/api/admin/postCtrls/deletePost.ts\");\r\nexports.deletePost = deletePost_1.default;\r\nvar preUploadPostImgFile_1 = __webpack_require__(/*! ./preUploadPostImgFile */ \"./src/api/admin/postCtrls/preUploadPostImgFile.ts\");\r\nexports.preUploadPostImgFile = preUploadPostImgFile_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/index.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/preUploadPostImgFile.ts":
/*!*********************************************************!*\
  !*** ./src/api/admin/postCtrls/preUploadPostImgFile.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst preUploadPostImgFile = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const { file } = req;\r\n        if (!file) {\r\n            return res.sendStatus(500);\r\n        }\r\n        const fileName = Date.now() + '-' + file.originalname;\r\n        const imgTempSrc = `/public/temporary/postImgs/${fileName}`;\r\n        const uploadPath = path.join(global.__rootDir, imgTempSrc);\r\n        fs.writeFileSync(uploadPath, file.buffer, \"binary\");\r\n        return res.status(201).json(JSON.stringify({ imgTempSrc }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = preUploadPostImgFile;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/preUploadPostImgFile.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/readPost.ts":
/*!*********************************************!*\
  !*** ./src/api/admin/postCtrls/readPost.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst readPost = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const post_id = req.params._id;\r\n        const post = yield post_1.default.findOne({ _id: post_id }).lean();\r\n        return res.status(200).json(JSON.stringify({ post }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = readPost;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/readPost.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/readPosts.ts":
/*!**********************************************!*\
  !*** ./src/api/admin/postCtrls/readPosts.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst reply_1 = __webpack_require__(/*! ~db/models/reply */ \"./src/db/models/reply.ts\");\r\nconst readPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const kinds = req.query.kinds;\r\n        const postsQueryOptions = {\r\n            filter: {},\r\n            populate: { path: 'author', select: '-_id nick profileImgSrc' },\r\n            sort: { createdDate: -1 },\r\n        };\r\n        switch (kinds) {\r\n            case undefined:\r\n                postsQueryOptions.filter = {};\r\n                break;\r\n            case 'inWriting':\r\n                postsQueryOptions.filter = {\r\n                    isPublished: false\r\n                };\r\n                break;\r\n        }\r\n        const posts = yield post_1.default\r\n            .find(postsQueryOptions.filter)\r\n            .sort(postsQueryOptions.sort)\r\n            .populate(postsQueryOptions.populate);\r\n        const commentsQueryOptions = {\r\n            populate: { path: 'memberAuthor', select: '-_id nick profileImgSrc unique_id' }\r\n        };\r\n        const comments = yield comment_1.default\r\n            .find()\r\n            .populate(commentsQueryOptions.populate);\r\n        const repliesQueryOptions = {\r\n            populate: { path: 'memberAuthor', select: '-_id nick profileImgSrc unique_id' }\r\n        };\r\n        const replies = yield reply_1.default\r\n            .find()\r\n            .populate(repliesQueryOptions.populate);\r\n        return res.status(200).json(JSON.stringify({\r\n            posts,\r\n            comments,\r\n            replies,\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = readPosts;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/readPosts.ts?");

/***/ }),

/***/ "./src/api/admin/postCtrls/updatePost.ts":
/*!***********************************************!*\
  !*** ./src/api/admin/postCtrls/updatePost.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const post_id = req.params._id;\r\n        const post = yield post_1.default.findOne({ _id: post_id });\r\n        if (!post) {\r\n            return res.sendStatus(410);\r\n        }\r\n        const author = req.user._id;\r\n        const isPublished = JSON.parse(req.body.isPublished);\r\n        const category = req.body.category;\r\n        const title = req.body.title;\r\n        const intro = req.body.intro;\r\n        const tags = JSON.parse(req.body.tags);\r\n        const coverImgFile = req.file;\r\n        let coverImgSrc = post.coverImgSrc;\r\n        if (post.coverImgSrc) {\r\n            // prev coverImgSrc 존재\r\n            if (coverImgFile) {\r\n                // 기존커버삭제\r\n                const prevCoverImgSrc = post.coverImgSrc;\r\n                fs.unlinkSync(path.join(global.__rootDir, prevCoverImgSrc));\r\n                // 새로운커버추가\r\n                const fileName = Date.now() + '-' + coverImgFile.originalname;\r\n                const nextCoverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`;\r\n                fs.writeFileSync(path.join(global.__rootDir, nextCoverImgSrc), coverImgFile.buffer, 'binary');\r\n                coverImgSrc = nextCoverImgSrc;\r\n            }\r\n            else {\r\n                const isMaintainingCover = JSON.parse(req.body.isMaintainingCover);\r\n                if (isMaintainingCover) {\r\n                    // 기존커버유지 \r\n                    // done\r\n                }\r\n                else {\r\n                    //기존커버삭제\r\n                    const prevCoverImgSrc = post.coverImgSrc;\r\n                    fs.unlinkSync(path.join(global.__rootDir, prevCoverImgSrc));\r\n                    coverImgSrc = null;\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            // prev coverImgSrc 미존재\r\n            if (coverImgFile) {\r\n                // 커버추가\r\n                const fileName = Date.now() + '-' + coverImgFile.originalname;\r\n                const nextCoverImgSrc = `/public/postImgs/${post._id}/cover/${fileName}`;\r\n                fs.writeFileSync(path.join(global.__rootDir, nextCoverImgSrc), coverImgFile.buffer, 'binary');\r\n                coverImgSrc = nextCoverImgSrc;\r\n            }\r\n        }\r\n        const contentState = JSON.parse(req.body.contentState);\r\n        const nextEntityMap = contentState.entityMap;\r\n        const prevEntityMap = post.contentState.entityMap;\r\n        const tempImgFileNames = fs.readdirSync(path.join(global.__rootDir, '/public/temporary/postImgs'));\r\n        for (let key in nextEntityMap) {\r\n            if (nextEntityMap[key].type === \"IMAGE\") {\r\n                const entityImgSrc = nextEntityMap[key].data.src;\r\n                const pieces = entityImgSrc.split('/');\r\n                const middleFolderName = pieces[2];\r\n                if (middleFolderName === 'public') {\r\n                    // 기존 사용중이던 이미지 => done\r\n                }\r\n                else if (middleFolderName === 'temporary') {\r\n                    // 새로 추가된 이미지 => 추가\r\n                    const imgFileName = pieces[pieces.length - 1];\r\n                    if (tempImgFileNames.indexOf(imgFileName) === -1) {\r\n                        return res.sendStatus(410);\r\n                    }\r\n                    // move imgFile ( temporary foldoer => real foloder )\r\n                    const imgSrc = `/public/postImgs/${post._id}/${imgFileName}`;\r\n                    const oldPath = path.join(global.__rootDir, entityImgSrc);\r\n                    const newPath = path.join(global.__rootDir, imgSrc);\r\n                    fs.renameSync(oldPath, newPath);\r\n                    nextEntityMap[key].data.src = imgSrc;\r\n                }\r\n            }\r\n        }\r\n        const prevImgSrcs = [];\r\n        for (let key in prevEntityMap) {\r\n            if (prevEntityMap[key].type === \"IMAGE\") {\r\n                prevImgSrcs.push(prevEntityMap[key].data.src);\r\n            }\r\n        }\r\n        const nextImgSrcs = [];\r\n        for (let key in nextEntityMap) {\r\n            if (nextEntityMap[key].type === \"IMAGE\") {\r\n                nextImgSrcs.push(nextEntityMap[key].data.src);\r\n            }\r\n        }\r\n        prevImgSrcs.forEach((prevImgSrc) => {\r\n            if (nextImgSrcs.indexOf(prevImgSrc) === -1) {\r\n                //해당이미지 삭제\r\n                const imgPath = path.join(global.__rootDir, prevImgSrc);\r\n                fs.unlinkSync(imgPath);\r\n            }\r\n        });\r\n        contentState.entityMap = nextEntityMap;\r\n        yield post.update({ $set: {\r\n                isEdited: true,\r\n                author,\r\n                isPublished,\r\n                coverImgSrc,\r\n                contentState,\r\n                category,\r\n                title,\r\n                intro,\r\n                tags\r\n            } });\r\n        return res.status(200).json(JSON.stringify({ isSuccess: true }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.status(500).json(JSON.stringify({}));\r\n    }\r\n});\r\nexports.default = updatePost;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/postCtrls/updatePost.ts?");

/***/ }),

/***/ "./src/api/admin/visitorCardCtrls/deleteVisitorCard.ts":
/*!*************************************************************!*\
  !*** ./src/api/admin/visitorCardCtrls/deleteVisitorCard.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst visitorCard_1 = __webpack_require__(/*! ~db/models/visitorCard */ \"./src/db/models/visitorCard.ts\");\r\nconst deleteVisitorCard = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const visitorCard_id = req.params._id;\r\n        const filterOptions = { _id: visitorCard_id };\r\n        const result = yield visitorCard_1.default.findOneAndDelete(filterOptions);\r\n        if (!result) {\r\n            return res.sendStatus(410);\r\n        }\r\n        return res.status(200).json(JSON.stringify({ isSuccess: true }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = deleteVisitorCard;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/visitorCardCtrls/deleteVisitorCard.ts?");

/***/ }),

/***/ "./src/api/admin/visitorCardCtrls/index.ts":
/*!*************************************************!*\
  !*** ./src/api/admin/visitorCardCtrls/index.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar deleteVisitorCard_1 = __webpack_require__(/*! ./deleteVisitorCard */ \"./src/api/admin/visitorCardCtrls/deleteVisitorCard.ts\");\r\nexports.deleteVisitorCard = deleteVisitorCard_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/admin/visitorCardCtrls/index.ts?");

/***/ }),

/***/ "./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts":
/*!*********************************************************!*\
  !*** ./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst doubleCheckNickCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { nick } = req.body;\r\n                const isBadRequset = (!nick ||\r\n                    nick.constructor !== String ||\r\n                    !textValidator_1.default.validateBlank(String(nick)) ||\r\n                    !textValidator_1.default.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||\r\n                    !textValidator_1.default.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX));\r\n                if (isBadRequset) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                const condition = { nick };\r\n                const userByNick = yield user_1.default.findOne(condition).lean();\r\n                const isAvailable = userByNick === null ? true : false;\r\n                return res.status(200).json(JSON.stringify({ isAvailable }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = doubleCheckNickCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/commonCtrls/doubleCheckNickCtrl.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst commonCtrls = __webpack_require__(/*! ./commonCtrls */ \"./src/api/auth/commonCtrls/index.ts\");\r\nconst localCtrls = __webpack_require__(/*! ./localCtrls */ \"./src/api/auth/localCtrls/index.ts\");\r\nconst auth = express_1.Router();\r\n// common\r\nauth.post('/doubleCheckNick', commonCtrls.doubleCheckNickCtrl);\r\n// local\r\nauth.post('/local/join', localCtrls.joinCtrl);\r\nauth.post('/local/login', localCtrls.loginCtrl);\r\nauth.post('/local/doubleCheckEmail', localCtrls.doubleCheckEmailCtrl);\r\n// social\r\n// auth.get('/social/kakao', socialCtrls.kakaoCtrl)\r\n// auth.get('/social/kakao/callback', socialCtrls.kakaoCallbackCtrl)\r\n// auth.get('/social/naver', socialCtrls.naverCtrl)\r\n// auth.get('/social/naver/callback', socialCtrls.naverCallbackCtrl)\r\n// // auth.get('/social/google', socialCtrls.googleCtrl)\r\n// auth.get('/social/preUser', socialCtrls.getPreUserCtrl)\r\n// auth.post('/social/join', socialCtrls.joinCtrl)\r\nexports.default = auth;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/index.ts?");

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
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst TokenManager_1 = __webpack_require__(/*! ~modules/TokenManager */ \"./src/modules/TokenManager.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst sexTypes = __webpack_require__(/*! ~constants/sexTypes */ \"./src/constants/sexTypes.ts\");\r\nconst joinCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { email, nick, sex, password } = req.body;\r\n                const isBadRequest = (!email ||\r\n                    !textValidator_1.default.validateBlank(String(email)) ||\r\n                    !textValidator_1.default.validateMaxLength(String(email), userConfig.EMAIL_CHAR_MAX) ||\r\n                    !nick ||\r\n                    !textValidator_1.default.validateBlank(String(nick)) ||\r\n                    !textValidator_1.default.validateMinLength(String(nick), userConfig.NICK_CHAR_MIN) ||\r\n                    !textValidator_1.default.validateMaxLength(String(nick), userConfig.NICK_CHAR_MAX) ||\r\n                    !password ||\r\n                    !textValidator_1.default.validateBlank(String(password)) ||\r\n                    !textValidator_1.default.validateMaxLength(String(password), userConfig.PASSWORD_CHAR_MAX) ||\r\n                    !textValidator_1.default.validateMinLength(String(password), userConfig.PASSWORD_CHAR_MIN) ||\r\n                    !sex ||\r\n                    !(String(sex) === sexTypes.M || String(sex) === sexTypes.W));\r\n                if (isBadRequest) {\r\n                    return res.status(400).json(JSON.stringify({ isSuccess: false, errMsg: '잘못된 요청입니다.' }));\r\n                }\r\n                const userByEmail = yield user_1.default.findOne({ memberType: memberTypes.LOCAL, email: String(email) }).lean();\r\n                if (userByEmail !== null) {\r\n                    return res.status(400).json(JSON.stringify({ isSuccess: false, errMsg: '이미 존재하는 이메일입니다.' }));\r\n                }\r\n                const userByNick = yield user_1.default.findOne({ nick: String(nick) }).lean();\r\n                if (userByNick !== null) {\r\n                    return res.status(400).json(JSON.stringify({ isSuccess: false, errMsg: '이미 존재하는 이메일입니다.' }));\r\n                }\r\n                const isAdmin = (yield user_1.default.findOne().lean()) === null;\r\n                const { hash, salt } = Encryption_1.default.getPwSet(String(password));\r\n                const user = (yield new user_1.default({\r\n                    unique_id: String(Number(new Date())),\r\n                    isAdmin,\r\n                    memberType: memberTypes.LOCAL,\r\n                    nick: String(nick),\r\n                    sex: String(sex),\r\n                    email: String(email),\r\n                    key: {\r\n                        hash,\r\n                        salt\r\n                    }\r\n                }).save()).toObject();\r\n                const token = TokenManager_1.default.issue(user.unique_id);\r\n                return res.status(201).json(JSON.stringify({\r\n                    isSuccess: true,\r\n                    user: {\r\n                        token,\r\n                        unique_id: user.unique_id,\r\n                        nick: user.nick,\r\n                        profileImgSrc: user.profileImgSrc,\r\n                        isAdmin: user.isAdmin\r\n                    }\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({ isSuccess: false, errMsg: '서버 오류입니다.' }));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = joinCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/localCtrls/joinCtrl.ts?");

/***/ }),

/***/ "./src/api/auth/localCtrls/loginCtrl.ts":
/*!**********************************************!*\
  !*** ./src/api/auth/localCtrls/loginCtrl.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst TokenManager_1 = __webpack_require__(/*! ~modules/TokenManager */ \"./src/modules/TokenManager.ts\");\r\nconst loginCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { email, password } = req.body;\r\n                const isBadRequest = (!email ||\r\n                    !password);\r\n                if (isBadRequest) {\r\n                    return res.status(400).json(JSON.stringify({}));\r\n                }\r\n                const user = yield user_1.default.findOne({\r\n                    email: String(email),\r\n                    memberType: memberTypes.LOCAL\r\n                }).lean();\r\n                if (user === null) {\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: false,\r\n                        errMsg: '이메일 또는 비밀번호를 잘못 입력하셨습니다. 등록되지 않은 이메일이거나 비밀번호가 다릅니다.'\r\n                    }));\r\n                }\r\n                const currentHash = Encryption_1.default.getHash(String(password), user.key.salt);\r\n                const dbHash = user.key.hash;\r\n                if (currentHash === dbHash) {\r\n                    const token = TokenManager_1.default.issue(user.unique_id);\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: true,\r\n                        user: {\r\n                            token,\r\n                            isAdmin: user.isAdmin,\r\n                            unique_id: user.unique_id,\r\n                            nick: user.nick,\r\n                            profileImgSrc: user.profileImgSrc\r\n                        }\r\n                    }));\r\n                }\r\n                else {\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: false,\r\n                        errMsg: '이메일 또는 비밀번호를 잘못 입력하셨습니다. 등록되지 않은 이메일이거나 비밀번호가 다릅니다.'\r\n                    }));\r\n                }\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.status(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = loginCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/auth/localCtrls/loginCtrl.ts?");

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

/***/ "./src/api/posts/ctrls/createCommentForMemberCtrl.ts":
/*!***********************************************************!*\
  !*** ./src/api/posts/ctrls/createCommentForMemberCtrl.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst commentConfig = __webpack_require__(/*! ~configs/comment.config.json */ \"./src/configs/comment.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst createCommentForMember = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        // check body, params\r\n        const { description } = req.body;\r\n        const post_id = Number(req.params._id);\r\n        const isBadRequest = ((!description) ||\r\n            (description.constructor !== String) ||\r\n            (!textValidator_1.default.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||\r\n            !Number.isInteger(post_id));\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        // is exist post ?\r\n        const post = yield post_1.default.findOne({ _id: post_id });\r\n        if (!post) {\r\n            return res.sendStatus(410);\r\n        }\r\n        // create comment\r\n        const { user } = req;\r\n        const comment = (yield new comment_1.default({\r\n            post_id: post._id,\r\n            unique_id: user.unique_id,\r\n            isMember: true,\r\n            isAdmin: user.isAdmin,\r\n            description,\r\n            memberAuthor: user._id\r\n        }).save()).toObject();\r\n        // add comment in post\r\n        const updateOptions = { $push: { comments: comment._id } };\r\n        const updateResult = yield post.update(updateOptions);\r\n        if (updateResult.ok !== 1) {\r\n            return res.sendStatus(500);\r\n        }\r\n        return res.status(201).json(JSON.stringify({\r\n            comment: {\r\n                post_id: comment.post_id,\r\n                _id: comment._id,\r\n                isMember: comment.isMember,\r\n                isAdmin: comment.isAdmin,\r\n                description: comment.description,\r\n                createdDate: comment.createdDate,\r\n                memberAuthor: {\r\n                    nick: user.nick,\r\n                    profileImgSrc: user.profileImgSrc,\r\n                    unique_id: user.unique_id\r\n                },\r\n                replies: comment.replies\r\n            }\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = createCommentForMember;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/createCommentForMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/createCommentForNonMemberCtrl.ts":
/*!**************************************************************!*\
  !*** ./src/api/posts/ctrls/createCommentForNonMemberCtrl.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst commentConfig = __webpack_require__(/*! ~configs/comment.config.json */ \"./src/configs/comment.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst writeCommentForNonMemberCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { description, password } = req.body;\r\n                const isBadRequest = ((!description) ||\r\n                    (description.constructor !== String) ||\r\n                    (!textValidator_1.default.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||\r\n                    (!password) ||\r\n                    (password.constructor !== String) ||\r\n                    (!textValidator_1.default.validateMinLength(password, commentConfig.PASSWORD_CHAR_MIN)) ||\r\n                    (!textValidator_1.default.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX)));\r\n                if (isBadRequest) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                const post_id = req.params._id;\r\n                const post = yield post_1.default.findOne({ _id: Number(post_id) });\r\n                if (!post) {\r\n                    return res.sendStatus(410);\r\n                }\r\n                const pwSet = yield Encryption_1.default.getPwSet(password);\r\n                // add comment\r\n                const comment = (yield new comment_1.default({\r\n                    post_id,\r\n                    isMember: false,\r\n                    isAdmin: false,\r\n                    description,\r\n                    key: {\r\n                        hash: pwSet.hash,\r\n                        salt: pwSet.salt\r\n                    }\r\n                }).save()).toObject();\r\n                // add post\r\n                const updateOptions = { $push: { comments: comment._id } };\r\n                const updateResult = yield post.update(updateOptions);\r\n                if (updateResult.ok !== 1) {\r\n                    return res.sendStatus(500);\r\n                }\r\n                return res.status(201).json(JSON.stringify({\r\n                    comment: {\r\n                        post_id: comment.post_id,\r\n                        _id: comment._id,\r\n                        isMember: comment.isMember,\r\n                        isAdmin: comment.isAdmin,\r\n                        description: comment.description,\r\n                        replies: comment.replies,\r\n                        createdDate: comment.createdDate\r\n                    }\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = writeCommentForNonMemberCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/createCommentForNonMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/createReplyForMemberCtrl.ts":
/*!*********************************************************!*\
  !*** ./src/api/posts/ctrls/createReplyForMemberCtrl.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst commentConfig = __webpack_require__(/*! ~configs/comment.config.json */ \"./src/configs/comment.config.json\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst reply_1 = __webpack_require__(/*! ~db/models/reply */ \"./src/db/models/reply.ts\");\r\nconst createReplyForMemberCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        // check body\r\n        const { description } = req.body;\r\n        const isBadRequest = ((!description) ||\r\n            (description.constructor !== String) ||\r\n            (!textValidator_1.default.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)));\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        // is exist comment ?\r\n        const comment_id = Number(req.params.comment_id);\r\n        const comment = yield comment_1.default.findOne({ _id: comment_id });\r\n        if (!comment) {\r\n            return res.sendStatus(410);\r\n        }\r\n        const { user } = req;\r\n        // create reply\r\n        const reply = (yield new reply_1.default({\r\n            comment_id: comment._id,\r\n            isMember: true,\r\n            isAdmin: user.isAdmin,\r\n            memberAuthor: user._id,\r\n            description\r\n        }).save()).toObject();\r\n        // add reply to comment\r\n        const updateOptions = { $push: { replies: reply._id } };\r\n        const updateResult = yield comment.update(updateOptions);\r\n        if (updateResult.ok !== 1) {\r\n            return res.sendStatus(500);\r\n        }\r\n        return res.status(201).json(JSON.stringify({\r\n            reply: {\r\n                _id: reply._id,\r\n                comment_id: reply.comment_id,\r\n                isMember: reply.isMember,\r\n                isAdmin: reply.isAdmin,\r\n                createdDate: reply.createdDate,\r\n                description: reply.description,\r\n                memberAuthor: {\r\n                    unique_id: user.unique_id,\r\n                    nick: user.nick,\r\n                    profileImgSrc: user.profileImgSrc\r\n                }\r\n            }\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = createReplyForMemberCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/createReplyForMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/createReplyForNonMemberCtrl.ts":
/*!************************************************************!*\
  !*** ./src/api/posts/ctrls/createReplyForNonMemberCtrl.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst commentConfig = __webpack_require__(/*! ~configs/comment.config.json */ \"./src/configs/comment.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst reply_1 = __webpack_require__(/*! ~db/models/reply */ \"./src/db/models/reply.ts\");\r\nconst createReplyForNonMemberCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        //check body\r\n        const { description, password } = req.body;\r\n        const isBadRequest = ((!description) ||\r\n            (description.constructor !== String) ||\r\n            (!textValidator_1.default.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||\r\n            (!password) ||\r\n            (password.constructor !== String) ||\r\n            (!textValidator_1.default.validateBlank(password)) ||\r\n            (!textValidator_1.default.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX)));\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        // is exist comment ? \r\n        const comment_id = Number(req.params.comment_id);\r\n        const comment = yield comment_1.default.findOne({ _id: comment_id });\r\n        if (!comment) {\r\n            return res.sendStatus(410);\r\n        }\r\n        // create reply\r\n        const pwSet = yield Encryption_1.default.getPwSet(password);\r\n        const reply = (yield new reply_1.default({\r\n            comment_id: comment._id,\r\n            isAdmin: false,\r\n            isMember: false,\r\n            key: {\r\n                hash: pwSet.hash,\r\n                salt: pwSet.salt\r\n            },\r\n            description\r\n        }).save()).toObject();\r\n        // add reply to comment\r\n        const updateOptions = { $push: { replies: reply._id } };\r\n        const updateResult = yield comment.update(updateOptions);\r\n        if (updateResult.ok !== 1) {\r\n            return res.sendStatus(500);\r\n        }\r\n        return res.status(201).json(JSON.stringify({\r\n            reply: {\r\n                _id: reply._id,\r\n                comment_id: reply.comment_id,\r\n                isAdmin: reply.isAdmin,\r\n                isMember: reply.isMember,\r\n                description: reply.description,\r\n                createdDate: reply.createdDate\r\n            }\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = createReplyForNonMemberCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/createReplyForNonMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/deleteCommentForMemberCtrl.ts":
/*!***********************************************************!*\
  !*** ./src/api/posts/ctrls/deleteCommentForMemberCtrl.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst deleteCommentForMemberCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                // check params\r\n                const comment_id = Number(req.params.comment_id);\r\n                const post_id = Number(req.params._id);\r\n                const isBadRequest = (!Number.isInteger(comment_id) ||\r\n                    !Number.isInteger(post_id));\r\n                if (isBadRequest) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                // is exist comment ?\r\n                const comment = yield comment_1.default.findOne({ _id: comment_id }).lean();\r\n                if (!comment) {\r\n                    return res.sendStatus(410);\r\n                }\r\n                // validate comment Owner\r\n                const { user } = req;\r\n                const comment_user_oid = String(comment.memberAuthor);\r\n                const user_oid = String(user._id);\r\n                if (comment_user_oid !== user_oid) {\r\n                    return res.sendStatus(403);\r\n                }\r\n                // remove comment\r\n                yield comment_1.default.remove({ _id: comment_id });\r\n                // remove comment in post\r\n                const filterOptions = { _id: post_id };\r\n                const updateConditions = { $pull: { comments: comment._id } };\r\n                yield post_1.default.findOneAndUpdate(filterOptions, updateConditions);\r\n                return res.status(200).json(JSON.stringify({\r\n                    isSuccess: true\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res;\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = deleteCommentForMemberCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/deleteCommentForMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/deleteCommentForNonMemberCtrl.ts":
/*!**************************************************************!*\
  !*** ./src/api/posts/ctrls/deleteCommentForNonMemberCtrl.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst commentConfig = __webpack_require__(/*! ~configs/comment.config.json */ \"./src/configs/comment.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst deleteCommentForNonMemberCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                //check body\r\n                const { password } = req.body;\r\n                const isBadRequest = ((!password) ||\r\n                    (password.constructor !== String) ||\r\n                    (!textValidator_1.default.validateMinLength(password, commentConfig.PASSWORD_CHAR_MIN)) ||\r\n                    (!textValidator_1.default.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX)));\r\n                if (isBadRequest) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                // is exist comment ? \r\n                const comment_id = req.params.comment_id;\r\n                const comment = yield comment_1.default.findOne({ _id: Number(comment_id) });\r\n                if (!comment) {\r\n                    return res.sendStatus(410);\r\n                }\r\n                // is exist comment key ?\r\n                const db_comment_hash = comment.key ? comment.key.hash : undefined;\r\n                const db_comment_salt = comment.key ? comment.key.salt : undefined;\r\n                if (!db_comment_hash || !db_comment_salt) {\r\n                    return res.sendStatus(500);\r\n                }\r\n                //validate hash\r\n                const current_hash = Encryption_1.default.getHash(password, db_comment_salt);\r\n                if (db_comment_hash !== current_hash) {\r\n                    return res.status(200).json(JSON.stringify({\r\n                        isSuccess: false,\r\n                        errMsg: '비밀번호가 일치하지 않습니다.'\r\n                    }));\r\n                }\r\n                // remove comment\r\n                const removeConditions = { _id: comment._id };\r\n                yield comment_1.default.remove(removeConditions);\r\n                // remove comment in post\r\n                const post_id = req.params._id;\r\n                const filterOptions = { _id: Number(post_id) };\r\n                const updateConditions = { $pull: { comments: comment._id } };\r\n                yield post_1.default.findOneAndUpdate(filterOptions, updateConditions);\r\n                return res.status(200).json(JSON.stringify({\r\n                    isSuccess: true\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = deleteCommentForNonMemberCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/deleteCommentForNonMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/editCommentForNonMemberCtrl.ts":
/*!************************************************************!*\
  !*** ./src/api/posts/ctrls/editCommentForNonMemberCtrl.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst commentConfig = __webpack_require__(/*! ~configs/comment.config.json */ \"./src/configs/comment.config.json\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst editCommentForNonMemberCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        // check params, body\r\n        const comment_id = Number(req.params.comment_id);\r\n        const { description, password } = req.body;\r\n        const isBadRequest = (!Number.isInteger(comment_id) ||\r\n            (!description) ||\r\n            (description.constructor !== String) ||\r\n            (!textValidator_1.default.validateMaxLength(description, commentConfig.DESCRIPTION_CHAR_MAX)) ||\r\n            (!password) ||\r\n            (password.constructor !== String) ||\r\n            (!textValidator_1.default.validateMinLength(password, commentConfig.PASSWORD_CHAR_MIN)) ||\r\n            (!textValidator_1.default.validateMaxLength(password, commentConfig.PASSWORD_CHAR_MAX)));\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        // is exist comment ?\r\n        const comment = yield comment_1.default.findOne({ _id: comment_id });\r\n        if (!comment) {\r\n            return res.sendStatus(410);\r\n        }\r\n        // is exist comment key ?\r\n        const db_comment_hash = comment.key ? comment.key.hash : undefined;\r\n        const db_comment_salt = comment.key ? comment.key.salt : undefined;\r\n        if (!db_comment_hash || !db_comment_salt) {\r\n            return res.sendStatus(500);\r\n        }\r\n        //validate hash\r\n        const current_hash = Encryption_1.default.getHash(password, db_comment_salt);\r\n        if (db_comment_hash !== current_hash) {\r\n            return res.status(200).json(JSON.stringify({\r\n                isSuccess: false,\r\n                errMsg: '비밀번호가 일치하지 않습니다.'\r\n            }));\r\n        }\r\n        // edit comment\r\n        const filterOptions = { _id: comment_id };\r\n        const updateOptions = { $set: { description } };\r\n        yield comment_1.default.update(filterOptions, updateOptions);\r\n        return res.status(200).json(JSON.stringify({\r\n            isSuccess: true\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = editCommentForNonMemberCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/editCommentForNonMemberCtrl.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/index.ts":
/*!**************************************!*\
  !*** ./src/api/posts/ctrls/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar readPosts_1 = __webpack_require__(/*! ./readPosts */ \"./src/api/posts/ctrls/readPosts.ts\");\r\nexports.readPosts = readPosts_1.default;\r\nvar updatePostViews_1 = __webpack_require__(/*! ./updatePostViews */ \"./src/api/posts/ctrls/updatePostViews.ts\");\r\nexports.updatePostViews = updatePostViews_1.default;\r\nvar createCommentForNonMemberCtrl_1 = __webpack_require__(/*! ./createCommentForNonMemberCtrl */ \"./src/api/posts/ctrls/createCommentForNonMemberCtrl.ts\");\r\nexports.createCommentForNonMemberCtrl = createCommentForNonMemberCtrl_1.default;\r\nvar deleteCommentForNonMemberCtrl_1 = __webpack_require__(/*! ./deleteCommentForNonMemberCtrl */ \"./src/api/posts/ctrls/deleteCommentForNonMemberCtrl.ts\");\r\nexports.deleteCommentForNonMemberCtrl = deleteCommentForNonMemberCtrl_1.default;\r\nvar editCommentForNonMemberCtrl_1 = __webpack_require__(/*! ./editCommentForNonMemberCtrl */ \"./src/api/posts/ctrls/editCommentForNonMemberCtrl.ts\");\r\nexports.editCommentForNonMemberCtrl = editCommentForNonMemberCtrl_1.default;\r\nvar createCommentForMemberCtrl_1 = __webpack_require__(/*! ./createCommentForMemberCtrl */ \"./src/api/posts/ctrls/createCommentForMemberCtrl.ts\");\r\nexports.createCommentForMemberCtrl = createCommentForMemberCtrl_1.default;\r\nvar deleteCommentForMemberCtrl_1 = __webpack_require__(/*! ./deleteCommentForMemberCtrl */ \"./src/api/posts/ctrls/deleteCommentForMemberCtrl.ts\");\r\nexports.deleteCommentForMemberCtrl = deleteCommentForMemberCtrl_1.default;\r\nvar createReplyForNonMemberCtrl_1 = __webpack_require__(/*! ./createReplyForNonMemberCtrl */ \"./src/api/posts/ctrls/createReplyForNonMemberCtrl.ts\");\r\nexports.createReplyForNonMemberCtrl = createReplyForNonMemberCtrl_1.default;\r\nvar createReplyForMemberCtrl_1 = __webpack_require__(/*! ./createReplyForMemberCtrl */ \"./src/api/posts/ctrls/createReplyForMemberCtrl.ts\");\r\nexports.createReplyForMemberCtrl = createReplyForMemberCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/index.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/readPosts.ts":
/*!******************************************!*\
  !*** ./src/api/posts/ctrls/readPosts.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst comment_1 = __webpack_require__(/*! ~db/models/comment */ \"./src/db/models/comment.ts\");\r\nconst reply_1 = __webpack_require__(/*! ~db/models/reply */ \"./src/db/models/reply.ts\");\r\nconst getAllpostsCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const postsQueryOptions = {\r\n            filter: { isPublished: true },\r\n            populate: { path: 'author', select: '-_id nick profileImgSrc' },\r\n            sort: { createdDate: -1 },\r\n        };\r\n        const posts = yield post_1.default\r\n            .find(postsQueryOptions.filter)\r\n            .sort(postsQueryOptions.sort)\r\n            .populate(postsQueryOptions.populate);\r\n        const commentsQueryOptions = {\r\n            populate: { path: 'memberAuthor', select: '-_id nick profileImgSrc unique_id' }\r\n        };\r\n        const comments = yield comment_1.default\r\n            .find()\r\n            .populate(commentsQueryOptions.populate);\r\n        const repliesQueryOptions = {\r\n            populate: { path: 'memberAuthor', select: '-_id nick profileImgSrc unique_id' }\r\n        };\r\n        const replies = yield reply_1.default\r\n            .find()\r\n            .populate(repliesQueryOptions.populate);\r\n        return res.status(200).json(JSON.stringify({\r\n            posts,\r\n            comments,\r\n            replies\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.status(500).json(JSON.stringify({}));\r\n    }\r\n});\r\nexports.default = getAllpostsCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/readPosts.ts?");

/***/ }),

/***/ "./src/api/posts/ctrls/updatePostViews.ts":
/*!************************************************!*\
  !*** ./src/api/posts/ctrls/updatePostViews.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_1 = __webpack_require__(/*! ~db/models/post */ \"./src/db/models/post.ts\");\r\nconst viewUpPost = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const _id = req.params._id;\r\n                const conditions = { _id };\r\n                const post = yield post_1.default.findOne(conditions);\r\n                if (!post) {\r\n                    return res.json(410).json(JSON.stringify({}));\r\n                }\r\n                post.views += 1;\r\n                yield post.save();\r\n                return res.json(204);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.json(500).json(JSON.stringify({}));\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = viewUpPost;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/ctrls/updatePostViews.ts?");

/***/ }),

/***/ "./src/api/posts/index.ts":
/*!********************************!*\
  !*** ./src/api/posts/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst ctrls = __webpack_require__(/*! ./ctrls */ \"./src/api/posts/ctrls/index.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst posts = express_1.Router();\r\nconst bodyCheckMiddleware = (targetBodys) => {\r\n    console.log(targetBodys, '타겟바디');\r\n    return (req, res, next) => {\r\n    };\r\n};\r\n// const bodyCheckMiddleware = ({\r\n// }) => {\r\n//     여기서두가지 선택권이 있는데...\r\n//     하나는 comment_edit 이런식으로 체크타입을 줘서 그거에대한 정의를 해놓고 그거대로 수행하기\r\n//     또하나는 comment 체크타입을쓰고\r\n//     어떤값을 체크할건지 쓰기가있는데\r\n//     내경우에는후자의경우가 편할듯?\r\n// }\r\n// posts.post('/test', bodyCheckMiddleware({\r\n//     name : 'comment',\r\n//     field : {\r\n//         'description'\r\n//     }\r\n// }), (req : any, res : any, next : any) => {\r\n//     res.send('성공했당')\r\n// })\r\nposts.get('/', ctrls.readPosts);\r\nposts.patch('/:_id/view', ctrls.updatePostViews);\r\nposts.post('/:_id/comment', (req, res, next) => {\r\n    const isAsMember = req.query.isAsMember === 'true' ? true : false;\r\n    if (!isAsMember) {\r\n        return ctrls.createCommentForNonMemberCtrl(req, res);\r\n    }\r\n    else {\r\n        return next();\r\n    }\r\n}, tokenValidationMiddleware_1.default, ctrls.createCommentForMemberCtrl);\r\n// posts.delete('/:_id/comment/:comment_id', (req : Request, res : Response, next : any) => {\r\n//     const isAsMember = req.query.isAsMember === 'true' ? true : false\r\n//     if(!isAsMember){ return ctrls.deleteCommentForNonMemberCtrl(req, res) }\r\n//     next()\r\n// }, tokenValidationMiddleware, ctrls.deleteCommentForMemberCtrl)\r\n// posts.patch('/post/comment/:comment_id/forNonMember', ctrls.editCommentForNonMemberCtrl)\r\nposts.post('/post/comment/:comment_id/reply', (req, res, next) => {\r\n    const isAsMember = req.query.isAsMember === 'true' ? true : false;\r\n    if (!isAsMember) {\r\n        return ctrls.createReplyForNonMemberCtrl(req, res);\r\n    }\r\n    return next();\r\n}, tokenValidationMiddleware_1.default, ctrls.createReplyForMemberCtrl);\r\nexports.default = posts;\r\n\n\n//# sourceURL=webpack:///./src/api/posts/index.ts?");

/***/ }),

/***/ "./src/api/users/ctrls/index.ts":
/*!**************************************!*\
  !*** ./src/api/users/ctrls/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar updateUserProfileImgCtrl_1 = __webpack_require__(/*! ./updateUserProfileImgCtrl */ \"./src/api/users/ctrls/updateUserProfileImgCtrl.ts\");\r\nexports.updateUserProfileImgCtrl = updateUserProfileImgCtrl_1.default;\r\nvar updateUserPasswordCtrl_1 = __webpack_require__(/*! ./updateUserPasswordCtrl */ \"./src/api/users/ctrls/updateUserPasswordCtrl.ts\");\r\nexports.updateUserPasswordCtrl = updateUserPasswordCtrl_1.default;\r\nvar readUserProfileCtrl_1 = __webpack_require__(/*! ./readUserProfileCtrl */ \"./src/api/users/ctrls/readUserProfileCtrl.ts\");\r\nexports.readUserProfileCtrl = readUserProfileCtrl_1.default;\r\nvar updateUserDetailsCtrl_1 = __webpack_require__(/*! ./updateUserDetailsCtrl */ \"./src/api/users/ctrls/updateUserDetailsCtrl.ts\");\r\nexports.updateUserDetailsCtrl = updateUserDetailsCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/users/ctrls/index.ts?");

/***/ }),

/***/ "./src/api/users/ctrls/readUserProfileCtrl.ts":
/*!****************************************************!*\
  !*** ./src/api/users/ctrls/readUserProfileCtrl.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst readUserProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const { user } = req;\r\n        return res.status(200).json(JSON.stringify({\r\n            user: {\r\n                sex: user.sex\r\n            }\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = readUserProfile;\r\n\n\n//# sourceURL=webpack:///./src/api/users/ctrls/readUserProfileCtrl.ts?");

/***/ }),

/***/ "./src/api/users/ctrls/updateUserDetailsCtrl.ts":
/*!******************************************************!*\
  !*** ./src/api/users/ctrls/updateUserDetailsCtrl.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst updateUserDetailsCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const { nick, sex } = req.body;\r\n        const isBadRequest = (!nick ||\r\n            !textValidator_1.default.validateBlank(nick) ||\r\n            !textValidator_1.default.validateMinLength(nick, userConfig.NICK_CHAR_MIN) ||\r\n            !textValidator_1.default.validateMaxLength(nick, userConfig.NICK_CHAR_MAX));\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        const { user } = req;\r\n        if (user.nick !== nick) {\r\n            const userByNick = yield user_1.default.findOne({ nick });\r\n            if (userByNick) {\r\n                return res.status(200).json(JSON.stringify({\r\n                    isSuccess: false,\r\n                    errMsg: '이미 존재하는 닉네임 입니다.',\r\n                }));\r\n            }\r\n        }\r\n        const filterOptions = { _id: user._id };\r\n        const updateOptions = {\r\n            $set: {\r\n                sex,\r\n                nick\r\n            }\r\n        };\r\n        const updatedUser = yield user_1.default.findOneAndUpdate(filterOptions, updateOptions, { new: true });\r\n        if (!updatedUser) {\r\n            return res.sendStatus(500);\r\n        }\r\n        return res.status(200).json(JSON.stringify({\r\n            isSuccess: true,\r\n            user: {\r\n                nick: updatedUser.nick,\r\n            }\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = updateUserDetailsCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/users/ctrls/updateUserDetailsCtrl.ts?");

/***/ }),

/***/ "./src/api/users/ctrls/updateUserPasswordCtrl.ts":
/*!*******************************************************!*\
  !*** ./src/api/users/ctrls/updateUserPasswordCtrl.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst Encryption_1 = __webpack_require__(/*! ~modules/Encryption */ \"./src/modules/Encryption.ts\");\r\nconst userConfig = __webpack_require__(/*! ~configs/user.config.json */ \"./src/configs/user.config.json\");\r\nconst memberTypes = __webpack_require__(/*! ~constants/memberTypes */ \"./src/constants/memberTypes.ts\");\r\nconst updateUserPasswordCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const { prevPassword, newPassword } = req.body;\r\n        const isBadRequest = ((!newPassword) ||\r\n            (newPassword.constructor !== String) ||\r\n            (!textValidator_1.default.validateBlank(newPassword)) ||\r\n            (!textValidator_1.default.validateMinLength(newPassword, userConfig.PASSWORD_CHAR_MIN)) ||\r\n            (!textValidator_1.default.validateMaxLength(newPassword, userConfig.PASSWORD_CHAR_MAX)));\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        const { user } = req;\r\n        // is local user ? \r\n        if (user.memberType !== memberTypes.LOCAL) {\r\n            return res.sendStatus(400);\r\n        }\r\n        // check prevPassword\r\n        const db_hash = user.key.hash;\r\n        const db_salt = user.key.salt;\r\n        const current_hash = Encryption_1.default.getHash(prevPassword, db_salt);\r\n        if (db_hash !== current_hash) {\r\n            return res.status(200).json(JSON.stringify({\r\n                isSuccess: false,\r\n                errMsg: '이전 비밀번호가 일치하지 않습니다.'\r\n            }));\r\n        }\r\n        // update newPassword\r\n        const pwSet = Encryption_1.default.getPwSet(newPassword);\r\n        const filterOptions = { _id: user._id };\r\n        const updateOptions = { $set: {\r\n                key: {\r\n                    hash: pwSet.hash,\r\n                    salt: pwSet.salt,\r\n                }\r\n            } };\r\n        const updatedUser = yield user_1.default.findOneAndUpdate(filterOptions, updateOptions, { new: true });\r\n        if (!updatedUser) {\r\n            return res.sendStatus(500);\r\n        }\r\n        return res.status(200).json(JSON.stringify({\r\n            isSuccess: true\r\n        }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = updateUserPasswordCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/users/ctrls/updateUserPasswordCtrl.ts?");

/***/ }),

/***/ "./src/api/users/ctrls/updateUserProfileImgCtrl.ts":
/*!*********************************************************!*\
  !*** ./src/api/users/ctrls/updateUserProfileImgCtrl.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst updateUserProfileImgCtrl = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const { user, file } = req;\r\n        const isBadRequest = !file;\r\n        if (isBadRequest) {\r\n            return res.sendStatus(400);\r\n        }\r\n        const userUploadSrc = `/public/users/${user.unique_id}`;\r\n        const userUploadPath = path.join(global.__rootDir, userUploadSrc);\r\n        // check user folder \r\n        if (!fs.existsSync(userUploadPath)) {\r\n            fs.mkdirSync(userUploadPath);\r\n        }\r\n        else {\r\n            const files = fs.readdirSync(userUploadPath);\r\n            files.forEach((file) => {\r\n                fs.unlinkSync(`${userUploadPath}/${file}`);\r\n            });\r\n        }\r\n        // save profileImg\r\n        const fileExtName = path.extname(file.originalname);\r\n        const fileName = `${Date.now()}profile${fileExtName}`;\r\n        fs.writeFileSync(`${userUploadPath}/${fileName}`, file.buffer, \"binary\");\r\n        // update User\r\n        const profileImgSrc = `${userUploadSrc}/${fileName}`;\r\n        const filterOptions = { _id: user._id };\r\n        const updateOptions = { $set: { profileImgSrc } };\r\n        const updatedUser = yield user_1.default.findOneAndUpdate(filterOptions, updateOptions, { new: true });\r\n        if (!updatedUser) {\r\n            return res.sendStatus(500);\r\n        }\r\n        return res.status(200).json(JSON.stringify({ profileImgSrc: updatedUser.profileImgSrc }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = updateUserProfileImgCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/users/ctrls/updateUserProfileImgCtrl.ts?");

/***/ }),

/***/ "./src/api/users/index.ts":
/*!********************************!*\
  !*** ./src/api/users/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst ctrls = __webpack_require__(/*! ./ctrls */ \"./src/api/users/ctrls/index.ts\");\r\nconst fileToBufferMiddleware_1 = __webpack_require__(/*! ~middlewares/fileToBufferMiddleware */ \"./src/middlewares/fileToBufferMiddleware.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst users = express_1.Router();\r\nusers.use('*', tokenValidationMiddleware_1.default);\r\nusers.get('/me', tokenValidationMiddleware_1.default, ctrls.readUserProfileCtrl);\r\nusers.patch('/me/profileImgSrc', tokenValidationMiddleware_1.default, fileToBufferMiddleware_1.default.single('profileImgFile'), ctrls.updateUserProfileImgCtrl);\r\nusers.patch('/me/password', tokenValidationMiddleware_1.default, ctrls.updateUserPasswordCtrl);\r\nusers.patch('/me/details', tokenValidationMiddleware_1.default, ctrls.updateUserDetailsCtrl);\r\nexports.default = users;\r\n\n\n//# sourceURL=webpack:///./src/api/users/index.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/index.ts":
/*!*********************************************!*\
  !*** ./src/api/visitorCards/ctrls/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar readAllVisitorCards_1 = __webpack_require__(/*! ./readAllVisitorCards */ \"./src/api/visitorCards/ctrls/readAllVisitorCards.ts\");\r\nexports.readAllVisitorCards = readAllVisitorCards_1.default;\r\nvar writeMemberVisitorCardCtrl_1 = __webpack_require__(/*! ./writeMemberVisitorCardCtrl */ \"./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts\");\r\nexports.writeMemberVisitorCardCtrl = writeMemberVisitorCardCtrl_1.default;\r\nvar writeNonMemberVisitorCardCtrl_1 = __webpack_require__(/*! ./writeNonMemberVisitorCardCtrl */ \"./src/api/visitorCards/ctrls/writeNonMemberVisitorCardCtrl.ts\");\r\nexports.writeNonMemberVisitorCardCtrl = writeNonMemberVisitorCardCtrl_1.default;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/index.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/readAllVisitorCards.ts":
/*!***********************************************************!*\
  !*** ./src/api/visitorCards/ctrls/readAllVisitorCards.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst visitorCard_1 = __webpack_require__(/*! ~db/models/visitorCard */ \"./src/db/models/visitorCard.ts\");\r\nconst readAllVisitorCards = (req, res) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const sortOption = { createdDate: -1 };\r\n        const populateOption = { path: 'memberAuthor', select: '-_id nick profileImgSrc' };\r\n        const visitorCards = yield visitorCard_1.default\r\n            .find()\r\n            .sort(sortOption)\r\n            .populate(populateOption);\r\n        return res.status(200).json(JSON.stringify({ visitorCards }));\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(500);\r\n    }\r\n});\r\nexports.default = readAllVisitorCards;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/readAllVisitorCards.ts?");

/***/ }),

/***/ "./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts":
/*!******************************************************************!*\
  !*** ./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst visitorCard_1 = __webpack_require__(/*! ~db/models/visitorCard */ \"./src/db/models/visitorCard.ts\");\r\nconst visitorCardConfig = __webpack_require__(/*! ~configs/visitorCard.config.json */ \"./src/configs/visitorCard.config.json\");\r\nconst textValidator_1 = __webpack_require__(/*! ~modules/textValidator */ \"./src/modules/textValidator.ts\");\r\nconst writeMemberVisitorCardCtrl = (req, res) => {\r\n    (function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const { user } = req;\r\n                const { description } = req.body;\r\n                const isBadRequest = ((!description) ||\r\n                    (description.constructor !== String) ||\r\n                    (!textValidator_1.default.validateMaxLength(description, visitorCardConfig.DESCRIPTION_CHAR_MAX)));\r\n                if (isBadRequest) {\r\n                    return res.sendStatus(400);\r\n                }\r\n                const visitorCard = (yield new visitorCard_1.default({\r\n                    isMember: true,\r\n                    isAdmin: user.isAdmin,\r\n                    description,\r\n                    memberAuthor: user._id\r\n                }).save())\r\n                    .toObject();\r\n                return res.status(201).json(JSON.stringify({\r\n                    visitorCard: {\r\n                        _id: visitorCard._id,\r\n                        isMember: visitorCard.isMember,\r\n                        isAdmin: visitorCard.isAdmin,\r\n                        description: visitorCard.description,\r\n                        memberAuthor: {\r\n                            nick: user.nick,\r\n                            profileImgSrc: user.profileImgSrc\r\n                        },\r\n                        createdDate: visitorCard.createdDate\r\n                    }\r\n                }));\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n                return res.sendStatus(500);\r\n            }\r\n        });\r\n    })();\r\n};\r\nexports.default = writeMemberVisitorCardCtrl;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/ctrls/writeMemberVisitorCardCtrl.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express_1 = __webpack_require__(/*! express */ \"express\");\r\nconst ctrls = __webpack_require__(/*! ./ctrls */ \"./src/api/visitorCards/ctrls/index.ts\");\r\nconst tokenValidationMiddleware_1 = __webpack_require__(/*! ~middlewares/tokenValidationMiddleware */ \"./src/middlewares/tokenValidationMiddleware.ts\");\r\nconst visitorCards = express_1.Router();\r\nvisitorCards.get('/', ctrls.readAllVisitorCards);\r\nvisitorCards.post('/forMember', tokenValidationMiddleware_1.default, ctrls.writeMemberVisitorCardCtrl);\r\nvisitorCards.post('/forNonMember', ctrls.writeNonMemberVisitorCardCtrl);\r\nexports.default = visitorCards;\r\n\n\n//# sourceURL=webpack:///./src/api/visitorCards/index.ts?");

/***/ }),

/***/ "./src/configs/comment.config.json":
/*!*****************************************!*\
  !*** ./src/configs/comment.config.json ***!
  \*****************************************/
/*! exports provided: PASSWORD_CHAR_MIN, PASSWORD_CHAR_MAX, DESCRIPTION_CHAR_MAX, default */
/***/ (function(module) {

eval("module.exports = {\"PASSWORD_CHAR_MIN\":1,\"PASSWORD_CHAR_MAX\":16,\"DESCRIPTION_CHAR_MAX\":1000};\n\n//# sourceURL=webpack:///./src/configs/comment.config.json?");

/***/ }),

/***/ "./src/configs/secret/secret.config.ts":
/*!*********************************************!*\
  !*** ./src/configs/secret/secret.config.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.dbConfig = {\r\n    url: 'mongodb://localhost:27017/bpeakBlog',\r\n    option: { useNewUrlParser: true },\r\n};\r\nexports.encryptionConfig = {\r\n    byteSize: 64,\r\n    iiterations: 99998,\r\n    keyLen: 64,\r\n};\r\nexports.jwtConfig = {\r\n    secret: \"ASLDASE23i8tufERGRGK$(#FG(ETGJOEGK#IR(F)GPR\",\r\n    options: {\r\n        issuer: 'www.bpeakBlog.com',\r\n        subject: 'userInfo',\r\n    }\r\n};\r\nexports.naverConfig = {\r\n    client_id: \"SrVRVgQ8XyzQqVLj9kec\",\r\n    client_secret: \"JKFL6IM3WG\",\r\n    redirect_uri: \"http://127.0.0.1/api/auth/social/naver/callback\"\r\n};\r\nexports.kakaoConfig = {\r\n    client_id: \"d66763cb3d1e62995bc0b50312a5f564\",\r\n    redirect_uri: \"http://localhost/api/auth/social/kakao/callback\"\r\n};\r\n\n\n//# sourceURL=webpack:///./src/configs/secret/secret.config.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst secret_config_1 = __webpack_require__(/*! ~configs/secret/secret.config */ \"./src/configs/secret/secret.config.ts\");\r\nconst dbLauncher = () => {\r\n    const db = mongoose.connection;\r\n    db.on('error', console.error.bind(console, 'connection error : '));\r\n    db.once('open', () => {\r\n        console.log('MONGODB CONNECTED SUCCESS BY MONGOOSE');\r\n    });\r\n    mongoose.connect(secret_config_1.dbConfig.url, secret_config_1.dbConfig.option);\r\n};\r\nexports.default = dbLauncher;\r\n\n\n//# sourceURL=webpack:///./src/db/dbLauncher.ts?");

/***/ }),

/***/ "./src/db/models/comment.ts":
/*!**********************************!*\
  !*** ./src/db/models/comment.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst autoIncrement = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\r\nconst Schema = mongoose.Schema;\r\nconst commentSchema = new Schema({\r\n    post_id: { type: Number, required: true },\r\n    isMember: { type: Boolean, required: true },\r\n    isAdmin: { type: Boolean, required: true },\r\n    memberAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },\r\n    unique_id: { type: String },\r\n    key: {\r\n        hash: { type: String },\r\n        salt: { type: String }\r\n    },\r\n    description: { type: String, required: true },\r\n    createdDate: { type: Date, default: Date.now },\r\n    replies: [{ type: Number, ref: 'reply' }]\r\n});\r\nconst Comment = mongoose.model('comment', commentSchema);\r\nexports.default = Comment;\r\nautoIncrement.initialize(mongoose.connection);\r\ncommentSchema.plugin(autoIncrement.plugin, 'comment');\r\n\n\n//# sourceURL=webpack:///./src/db/models/comment.ts?");

/***/ }),

/***/ "./src/db/models/post.ts":
/*!*******************************!*\
  !*** ./src/db/models/post.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst autoIncrement = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\r\nconst Schema = mongoose.Schema;\r\nconst postSchema = new Schema({\r\n    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },\r\n    isPublished: { type: Boolean, required: true },\r\n    category: { type: String, required: true },\r\n    coverImgSrc: { type: String, default: null },\r\n    title: { type: String, required: true },\r\n    intro: { type: String, required: true },\r\n    tags: { type: Array, required: true },\r\n    contentState: { type: Object },\r\n    createdDate: { type: Date, default: Date.now },\r\n    editedDate: { type: Date, default: Date.now },\r\n    isEdited: { type: Boolean, default: false },\r\n    views: { type: Number, default: 0 },\r\n    comments: [{ type: Number, ref: 'comment' }],\r\n});\r\nconst Post = mongoose.model('post', postSchema);\r\nexports.default = Post;\r\nautoIncrement.initialize(mongoose.connection);\r\npostSchema.plugin(autoIncrement.plugin, 'post');\r\n\n\n//# sourceURL=webpack:///./src/db/models/post.ts?");

/***/ }),

/***/ "./src/db/models/reply.ts":
/*!********************************!*\
  !*** ./src/db/models/reply.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst autoIncrement = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\r\nconst Schema = mongoose.Schema;\r\nconst replySchema = new Schema({\r\n    comment_id: { type: Number, required: true },\r\n    isMember: { type: Boolean, required: true },\r\n    isAdmin: { type: Boolean, required: true },\r\n    memberAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },\r\n    key: {\r\n        hash: { type: String },\r\n        salt: { type: String }\r\n    },\r\n    description: { type: String, required: true },\r\n    createdDate: { type: Date, default: Date.now },\r\n});\r\nconst Reply = mongoose.model('reply', replySchema);\r\nexports.default = Reply;\r\nautoIncrement.initialize(mongoose.connection);\r\nreplySchema.plugin(autoIncrement.plugin, 'reply');\r\n\n\n//# sourceURL=webpack:///./src/db/models/reply.ts?");

/***/ }),

/***/ "./src/db/models/user.ts":
/*!*******************************!*\
  !*** ./src/db/models/user.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst Schema = mongoose.Schema;\r\nconst userSchema = new Schema({\r\n    // common\r\n    unique_id: { type: String, required: true },\r\n    memberType: { type: String, required: true },\r\n    isAdmin: { type: Boolean, required: true },\r\n    nick: { type: String, required: true },\r\n    sex: { type: String, required: true },\r\n    profileImgSrc: { type: String, default: null },\r\n    joinDate: { type: Date, default: Date.now },\r\n    // local\r\n    key: {\r\n        hash: { type: String },\r\n        salt: { type: String }\r\n    },\r\n    email: { type: String },\r\n    //social\r\n    social_id: { type: String }\r\n});\r\nconst User = mongoose.model('user', userSchema);\r\nexports.default = User;\r\n\n\n//# sourceURL=webpack:///./src/db/models/user.ts?");

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
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\n// import Post from '~db/models/post'\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n// Post.findOne({_id : 219}, (err, post) => {\r\n//     if(post){\r\n//         post.views = 900\r\n//         post.save()\r\n//     }\r\n// })\r\nconst a = [1, 2, 3, 2, 3, 3, 4, 2, 5];\r\na.sort((a, b) => {\r\n    return a - b;\r\n});\r\nconsole.log(a);\r\nconsole.log('SERVER STARTING.....');\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nglobal.__rootDir = path.resolve(__dirname);\r\nconst App_1 = __webpack_require__(/*! ./App */ \"./src/App.ts\");\r\nconst dbLauncher_1 = __webpack_require__(/*! ~db/dbLauncher */ \"./src/db/dbLauncher.ts\");\r\ndbLauncher_1.default();\r\nconst app = new App_1.default().app;\r\nconst PORT = Number(process.env.PORT) || 80;\r\napp.listen(PORT, () => {\r\n    console.log(`PORT ${PORT} CONNECTED SUCCESS`);\r\n});\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"src\"))\n\n//# sourceURL=webpack:///./src/index.ts?");

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
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst secret_config_1 = __webpack_require__(/*! ~configs/secret/secret.config */ \"./src/configs/secret/secret.config.ts\");\r\nconst user_1 = __webpack_require__(/*! ~db/models/user */ \"./src/db/models/user.ts\");\r\nconst tokenValidationMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {\r\n    try {\r\n        const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];\r\n        //토큰 미존재\r\n        if (!token) {\r\n            return res.sendStatus(401);\r\n        }\r\n        const decoded = jwt.verify(token, secret_config_1.jwtConfig.secret);\r\n        const unique_id = decoded.user.unique_id;\r\n        const user = yield user_1.default.findOne({ unique_id }).lean();\r\n        //존재하지 않는 유저\r\n        if (!user) {\r\n            return res.sendStatus(401);\r\n        }\r\n        //인증 성공\r\n        req.user = user;\r\n        return next();\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n        return res.sendStatus(401);\r\n    }\r\n});\r\nexports.default = tokenValidationMiddleware;\r\n\n\n//# sourceURL=webpack:///./src/middlewares/tokenValidationMiddleware.ts?");

/***/ }),

/***/ "./src/modules/Encryption.ts":
/*!***********************************!*\
  !*** ./src/modules/Encryption.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\r\nconst secret_config_1 = __webpack_require__(/*! ~configs/secret/secret.config */ \"./src/configs/secret/secret.config.ts\");\r\nclass Encryption {\r\n    static getPwSet(password) {\r\n        const salt = this.getSalt();\r\n        const hash = this.getHash(password, salt);\r\n        return { salt, hash };\r\n    }\r\n}\r\nEncryption.getSalt = () => {\r\n    return crypto.randomBytes(secret_config_1.encryptionConfig.byteSize).toString('base64');\r\n};\r\nEncryption.getHash = (password, salt) => {\r\n    return crypto.pbkdf2Sync(password, salt, secret_config_1.encryptionConfig.iiterations, secret_config_1.encryptionConfig.keyLen, 'sha512').toString('base64');\r\n};\r\nexports.default = Encryption;\r\n\n\n//# sourceURL=webpack:///./src/modules/Encryption.ts?");

/***/ }),

/***/ "./src/modules/TokenManager.ts":
/*!*************************************!*\
  !*** ./src/modules/TokenManager.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst secret_config_1 = __webpack_require__(/*! ~configs/secret/secret.config */ \"./src/configs/secret/secret.config.ts\");\r\nclass TokenManager {\r\n    static issue(unique_id) {\r\n        const token = jwt.sign({\r\n            user: {\r\n                unique_id\r\n            }\r\n        }, secret_config_1.jwtConfig.secret, secret_config_1.jwtConfig.options);\r\n        return token;\r\n    }\r\n}\r\nexports.default = TokenManager;\r\n\n\n//# sourceURL=webpack:///./src/modules/TokenManager.ts?");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });