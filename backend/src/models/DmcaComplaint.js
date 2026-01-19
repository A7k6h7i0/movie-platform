import mongoose from 'mongoose';

const dmcaComplaintSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  copyrightOwner: {
    type: String,
    required: [true, 'Copyright owner name is required'],
    trim: true
  },
  copyrightWorkDescription: {
    type: String,
    required: [true, 'Description of copyrighted work is required'],
    trim: true,
    minlength: [20, 'Description must be at least 20 characters']
  },
  infringingContent: {
    type: String,
    required: [true, 'Description of infringing content is required'],
    trim: true
  },
  infringingUrl: {
    type: String,
    required: [true, 'URL of infringing content is required'],
    trim: true
  },
  goodFaithStatement: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must confirm the good faith statement'
    }
  },
  accuracyStatement: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must confirm the accuracy statement'
    }
  },
  authorizedStatement: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must confirm you are authorized to act'
    }
  },
  digitalSignature: {
    type: String,
    required: [true, 'Digital signature is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'resolved', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('DmcaComplaint', dmcaComplaintSchema);
