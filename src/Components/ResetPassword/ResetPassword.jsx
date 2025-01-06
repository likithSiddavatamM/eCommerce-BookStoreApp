import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetpassword } from '../../Api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './ResetPassword.scss';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ password: "" });
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({ password: "" });

    if (!password.trim()) {
      setErrors({ password: "Password is required." });
      return;
    }

    try {
      await resetpassword({ password, token }); 
      alert("Password reset successful");
      navigate('/');
    } catch (error) {
      
      if (error.response && error.response.status === 400) {
        setErrors({ password: "Invalid token or user not found." });
      } else {
        setErrors({ password: "Unable to reset password. Please try again later." });
      }
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-form-box">
        <h1 className="reset-logo">E-Commerce BookStore</h1>
        <p>Enter your new password</p>
        <form>
          <TextField
            type="password"
            className="reset-input-field"
            placeholder="New Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
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
