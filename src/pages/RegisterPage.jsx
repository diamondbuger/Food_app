import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiCalls } from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password validation requirements
  const validatePassword = (pwd) => {
    const errors = [];

    if (pwd.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push('One uppercase letter (A-Z)');
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push('One lowercase letter (a-z)');
    }
    if (!/[0-9]/.test(pwd)) {
      errors.push('One number (0-9)');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      errors.push('One special character (!@#$%^&* etc)');
    }

    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (pwd) {
      validatePassword(pwd);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validate name
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    // Validate email
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError('Password does not meet the requirements');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await apiCalls.register(name, email, password);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const isPasswordValid = password && passwordErrors.length === 0;

  return (
    <div className="register-page">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={password}
              onChange={handlePasswordChange}
              required
              className={password && (isPasswordValid ? 'valid' : 'invalid')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {password && (
            <div className="password-requirements">
              <h4>Password Requirements:</h4>
              <ul>
                <li className={/^.{8,}$/.test(password) ? 'met' : 'unmet'}>
                  ✓ At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? 'met' : 'unmet'}>
                  ✓ One uppercase letter (A-Z)
                </li>
                <li className={/[a-z]/.test(password) ? 'met' : 'unmet'}>
                  ✓ One lowercase letter (a-z)
                </li>
                <li className={/[0-9]/.test(password) ? 'met' : 'unmet'}>
                  ✓ One number (0-9)
                </li>
                <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'met' : 'unmet'}>
                  ✓ One special character (!@#$%^&* etc)
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={
                confirmPassword
                  ? password === confirmPassword
                    ? 'valid'
                    : 'invalid'
                  : ''
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password-btn"
              title={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="password-error">Passwords do not match</p>
          )}
          {confirmPassword && password === confirmPassword && isPasswordValid && (
            <p className="password-success">✓ Passwords match</p>
          )}
        </div>

        <button type="submit" disabled={loading || !isPasswordValid || !confirmPassword}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
