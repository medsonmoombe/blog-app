import mongoose from 'mongoose';

const viewSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    viewedAt: {
      type: Date,
      default: Date.now,
      expires: 604800, // Document expires after 7 days (604800 seconds)
    },
  },
  { timestamps: true }
);

// Compound index to ensure one view per IP per post (resets after 7 days)
viewSchema.index({ postId: 1, ipAddress: 1 }, { unique: true });

const View = mongoose.model('View', viewSchema);

export default View;
