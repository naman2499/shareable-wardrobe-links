import mongoose from 'mongoose'

const wardrobeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    wardrobeItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Wardrobe = mongoose.model('Wardrobe', wardrobeSchema)

export default Wardrobe
