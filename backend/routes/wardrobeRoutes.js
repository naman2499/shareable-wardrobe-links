import express from 'express'
const router = express.Router()
import {
  addWardrobeItems,
  getWardrobeById,
  getMyWardrobes,
  getWardrobes,
} from '../controllers/wardrobeController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addWardrobeItems).get(protect, admin, getWardrobes)
router.route('/mywardrobes').get(protect, getMyWardrobes)
router.route('/:id').get(protect, getWardrobeById)

export default router
