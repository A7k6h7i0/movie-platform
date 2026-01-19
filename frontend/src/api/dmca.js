const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const submitDmcaComplaint = async (complaintData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dmca/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ Important for CORS
      body: JSON.stringify(complaintData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit complaint');
    }

    return data;
  } catch (error) {
    console.error('DMCA API Error:', error);
    throw error;
  }
};
