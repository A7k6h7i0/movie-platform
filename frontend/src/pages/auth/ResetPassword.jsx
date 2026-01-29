import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/auth';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (password.length < 6) {
      setError('Password length must be at least 6 characters');
      return;
    }

    try {
      const res = await resetPassword(token, password);
      setMsg(res.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={submit} className="bg-white/10 p-8 rounded-xl w-96">
        <h2 className="text-xl font-bold text-white mb-4">Reset Password</h2>

        {msg && <p className="text-green-400">{msg}</p>}
        {error && <p className="text-red-400">{error}</p>}

        <input
          type="password"
          required
          placeholder="Enter new password"
          className="w-full p-3 my-4 bg-black text-white border border-gray-700 rounded"
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.length >= 6) {
              setError('');
            }
          }}
        />

        {/* helper message (only when typing short password) */}
        {password && password.length < 6 && !msg && (
          <p className="text-yellow-400 text-sm mb-3">
            Password length must be at least 6 characters
          </p>
        )}

        <button className="w-full bg-red-600 py-2 rounded text-white">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
