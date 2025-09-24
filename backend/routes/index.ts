import express, { Router } from 'express';
import { addBookMark, addBookmarkToFavorit, addReminder, clearAlluserBookmarks, deleteBookmarkById, fetchBookmarkById, fetchBookmarks, fetchData, importBookmark, updateBookmarkById } from "../controllers/bookmarkController";
import { upload } from '../middleware/multer';
import { login, me, refreshToken, register } from '../controllers/userController';
import { isAuthenticate } from '../middleware/authenticate';
import { addGoryController, fetchCateGories, findCategoryByName } from '../controllers/categoryController';
import { getFrequentBookmarks } from '../controllers/frequentController';
const router = express.Router()


router.post('/addBookMark', upload.single('logo'), isAuthenticate, addBookMark)
router.post('/addBookmarkToFavorit', isAuthenticate, addBookmarkToFavorit)
router.post('/fetchBookmarkById', isAuthenticate, fetchBookmarkById)
router.post('/register', register)
router.post('/login', login)
router.post('/fetchBookmarks', isAuthenticate, fetchBookmarks)
router.post('/me', isAuthenticate, me)
router.post('/refresh-token', refreshToken)
router.post('/getFrequentBookmarks', isAuthenticate, getFrequentBookmarks)

router.post('/importBookmark', isAuthenticate, importBookmark)
router.post('/addReminder', isAuthenticate, addReminder)
router.post('/fetchData', isAuthenticate, fetchData)
router.post('/clearAlluserBookmarks', isAuthenticate, clearAlluserBookmarks)
router.post('/deleteBookmarkById', isAuthenticate, deleteBookmarkById)
router.post('/updateBookmarkById', upload.single('logo'), isAuthenticate, updateBookmarkById)

// Category routes

router.post('/cateGoryController', isAuthenticate, addGoryController)
router.post('/fetchCateGories', isAuthenticate, fetchCateGories)
router.post('/findCategoryByName', isAuthenticate, findCategoryByName)

export default router





