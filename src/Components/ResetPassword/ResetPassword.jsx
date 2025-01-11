import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetpassword } from '../../Api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSearchParams } from "react-router-dom";
import './ResetPassword.scss';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ password: '' });
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken")
    const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({ password: '' });

    if (!password.trim()) {
      setErrors({ password: 'Password is required.' });
      return;
    }

    try {
      await resetpassword(password, resetToken);
      alert('Password reset successfull');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ password: 'Invalid token or user not found.' });
      } else {
        setErrors({ password: 'Unable to reset password. Please try again later.' });
      }
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form-box">
        <h1 className="reset-logo">E-Commerce BookStore</h1>
        <p style={{fontSize:"smaller"}}>Enter your new password</p>
        <form>
          <TextField
            type="password"
            className="reset-input-field"
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
            }}
            error={!!errors.password}
            helperText={errors.password}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="outlined"
            className="reset-submit-button"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
