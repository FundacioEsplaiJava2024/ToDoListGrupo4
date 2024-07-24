import React, { useState } from 'react';

interface AuthDialogProps {
  type: 'signUp' | 'signIn';
  onClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ type, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(`${type === 'signUp' ? 'Sign Up' : 'Sign In'}:`, { username, password });
    onClose();
  };

  return (
    <div className="auth-dialog">
      <h2>{type === 'signUp' ? 'Sign Up' : 'Sign In'}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>{type === 'signUp' ? 'Sign Up' : 'Sign In'}</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AuthDialog;
