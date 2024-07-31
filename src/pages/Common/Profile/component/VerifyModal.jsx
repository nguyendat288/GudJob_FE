import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import authApi from '../../../../services/authApi';

const PhoneNumberVerificationModal = ({ openVerify, onCloseVerify }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (step === 2) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleGetVerifyCode = async () => {
    try {
      await authApi.verifyPhone(`+84${phoneNumber}`);
      setStep(2);
      setTimer(30);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      await authApi.verifyPhoneCode(verifyCode);
      toast.success('Phone number verified successfully');
      onCloseVerify();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleResendCode = async () => {
    setTimer(30);
    try {
      await authApi.verifyPhone(`+84${phoneNumber}`);
      toast.success('Verification code resent');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <Modal open={openVerify} onClose={onCloseVerify} closeAfterTransition>
      <Box
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        sx={{
          width: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '10px',
          p: 4,
          overflow: 'auto',
        }}
      >
        {step === 1 ? (
          <div className="flex flex-col space-y-4">
            <Typography variant="h6">Nhập số điện thoại để xác minh</Typography>
            <div className="flex items-center space-x-2">
              <Typography>+84</Typography>
              <TextField
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetVerifyCode}
            >
              Lấy mã xác minh
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Typography variant="h6">
              Nhập mã xác minh đã gửi đến số điện thoại của bạn
            </Typography>
            <TextField
              variant="outlined"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerifyPhoneNumber}
            >
              Xác thực
            </Button>
            <Typography>
              Mã sẽ hết hạn sau 3 phút
              {timer > 0 ? (
                `Vui lòng đợi sau ${timer} giây nếu bạn chưa nhận được mã xác minh`
              ) : (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleResendCode}
                >
                  Gửi lại mã xác minh
                </span>
              )}
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PhoneNumberVerificationModal;
