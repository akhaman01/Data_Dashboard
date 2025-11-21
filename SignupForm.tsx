import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const success = await signup(name, email, password);
    if (!success) {
      setError('Email already exists');
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Sign up for a new account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-modern"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-modern"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-modern"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-modern"
              placeholder="Confirm your password"
              required
            />
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" className="btn btn-primary auth-btn" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? 
            <button onClick={onSwitchToLogin} className="auth-link">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;