import { useState } from 'react';
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
      setMsg(res.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={submit} className="bg-white/10 p-8 rounded-xl w-96">
        <h2 className="text-xl font-bold text-white mb-4">Forgot Password</h2>

        {msg && <p className="text-green-400">{msg}</p>}
        {error && <p className="text-red-400">{error}</p>}

        <input
          type="email"
          required
          className="w-full p-3 my-4 bg-black text-white border border-gray-700 rounded"
          placeholder="Enter registered email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-red-600 py-2 rounded text-white">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
