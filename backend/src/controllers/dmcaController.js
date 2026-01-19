import DmcaComplaint from '../models/DmcaComplaint.js';

// @desc    Submit DMCA complaint
// @route   POST /api/dmca/submit
// @access  Public
export const submitComplaint = async (req, res) => {
  try {
    const complaintData = req.body;

    const complaint = await DmcaComplaint.create(complaintData);

    res.status(201).json({
      success: true,
      message: 'DMCA complaint submitted successfully. We will review it within 24-48 hours.',
      data: {
        complaintId: complaint._id,
        status: complaint.status,
        submittedAt: complaint.submittedAt
      }
    });
  } catch (error) {
    console.error('DMCA submission error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit complaint. Please try again.'
    });
  }
};

// @desc    Get all complaints (admin only)
// @route   GET /api/dmca/complaints
// @access  Private/Admin
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await DmcaComplaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints'
    });
  }
};
