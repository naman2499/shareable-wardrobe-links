import asyncHandler from 'express-async-handler'
import Wardrobe from '../models/wardrobeModel.js'

// @desc    Create new wardrobe
// @route   POST /api/wardrobes
// @access  Private
const addWardrobeItems = asyncHandler(async (req, res) => {
  const {
    wardrobeItems,
  } = req.body

  if (wardrobeItems && wardrobeItems.length === 0) {
    res.status(400)
    throw new Error('No wardrobe items')
    return
  } else {
    const wardrobe = new Wardrobe({
      wardrobeItems,
      user: req.user._id,
    })

    const createdWardrobe = await wardrobe.save()

    res.status(201).json(createdWardrobe)
  }
})

// @desc    Get wardrobe by ID
// @route   GET /api/wardrobes/:id
// @access  Private
const getWardrobeById = asyncHandler(async (req, res) => {
  const wardrobe = await Wardrobe.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (wardrobe) {
    res.json(wardrobe)
  } else {
    res.status(404)
    throw new Error('Wardrobe not found')
  }
})

// @desc    Get logged in user wardrobes
// @route   GET /api/wardrobes/mywardrobes
// @access  Private
const getMyWardrobes = asyncHandler(async (req, res) => {
  const wardrobes = await Wardrobe.find({ user: req.user._id })
  res.json(wardrobes)
})

// @desc    Get all wardrobes
// @route   GET /api/wardrobes
// @access  Private/Admin
const getWardrobes = asyncHandler(async (req, res) => {
  const wardrobes = await Wardrobe.find({}).populate('user', 'id name')
  res.json(wardrobes)
})

export {
  addWardrobeItems,
  getWardrobeById,
  getMyWardrobes,
  getWardrobes,
}
