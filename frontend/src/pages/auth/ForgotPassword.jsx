import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    try {
      const res = await forgotPassword(email);
      setMsg(`Temporary Password: ${res.tempPassword}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={submit} className="bg-white/10 p-8 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Forgot Password</h2>

        {msg && <p className="text-green-400 mb-3">{msg}</p>}
        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          type="email"
          required
          placeholder="Enter registered email"
          className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Get Temporary Password
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          <Link to="/login" className="text-red-400">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
