
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotpassword } from '../../Api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './ForgotPassword.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrors({ email: '' });

    if (!email.trim()) {
      setErrors({ email: 'Email is required.' });
      return;
    }

    try {
      await forgotpassword(email);
      alert(`Reset link sent to ${email}`);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: 'Invalid email address or user not found.' });
      } else {
        setErrors({ email: 'Unable to process request. Please try again later.' });
      }
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form-box">
        <h1 className="forgot-logo">E-Commerce BookStore</h1>
        <p>Enter your registered email to reset your password</p>
        <form>
          <TextField
            type="email"
            className="forgot-input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
            }}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="outlined"
            className="forgot-submit-button"
            onClick={handleForgotPassword}
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
