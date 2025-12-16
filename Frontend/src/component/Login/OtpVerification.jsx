// OTPVerification.js
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { verifyOtp } from '../../../Services/Auth';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Focus management for OTP inputs
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleChange = (index, value) => {
    // Allow only numbers
    // if (!/^[A-Za-z0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    setSuccess('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedNumbers = pastedData.replace(/\D/g, '').split('').slice(0, 6);
    
    const newOtp = [...otp];
    pastedNumbers.forEach((num, index) => {
      if (index < 6) {
        newOtp[index] = num;
      }
    });
    setOtp(newOtp);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(val => val === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerify = async () => {
    const email = sessionStorage.getItem("email"); 
    sessionStorage.removeItem("email")
    const isOtpVerified = await verifyOtp(email, otp.join(''));
 
    if(isOtpVerified.success) {
      navigate('/login')
    }else{
      setError(isOtpVerified.message)
    }
  }
  
  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('');
    setTimer(60);
    setCanResend(false);
    
    // Reset focus to first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Simulate OTP resend
    console.log('OTP resent to your mobile/email');
    // Add your OTP resend logic here
  };

  const isVerifyDisabled = otp.join('').length !== 6 || isLoading;

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Verify OTP</h3>
                <p className="text-muted mb-0">
                  Enter the 6-digit code sent to your mobile
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="py-2">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="py-2">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                </Alert>
              )}

              <div className="mb-4">
                <label className="form-label fw-semibold">Enter OTP</label>
                <div className="d-flex justify-content-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text" 
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="form-control text-center fw-bold fs-5"
                      style={{
                        height: '60px',
                        fontSize: '1.5rem'
                      }}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-3 fw-semibold"
                onClick={handleVerify}
                disabled={isVerifyDisabled}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </Button>

              <div className="text-center">
                <p className="text-muted mb-2">
                  Didn't receive the code?{' '}
                  {canResend ? (
                    <Button
                      variant="link"
                      className="p-0 text-decoration-none"
                      onClick={handleResendOTP}
                      disabled={!canResend}
                    >
                      Resend OTP
                    </Button>
                  ) : (
                    <span className="text-primary fw-semibold">
                      Resend in {timer}s
                    </span>
                  )}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OTPVerification;