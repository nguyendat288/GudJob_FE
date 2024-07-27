import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { LocalOffer, ShoppingCart, Loyalty, Edit } from '@mui/icons-material';
import { styled } from '@mui/system';
import QRCode from 'qrcode.react';
import paymentApi from '../../services/paymentApi';

const BidBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const BidButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const QRModal = ({ open, handleClose, qrCodeData, bidNumber }) => (
  <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{ backdrop: { timeout: 500 } }}
  >
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '8px',
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" align="center" mb={2}>
          Mở App Ngân hàng bất kỳ để quét mã QR hoặc chuyển khoản chính xác số
          tiền bên dưới
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <QRCode value={qrCodeData.qrCode} size={200} />
          <Box mt={3} width="100%">
            <Typography variant="body1">
              <strong>Ngân hàng:</strong> {qrCodeData.bankName}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Chủ tài khoản:</strong> {qrCodeData.accountName}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Số tài khoản:</strong> {qrCodeData.accountNumber}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Số tiền:</strong>{' '}
              {qrCodeData?.amount?.toLocaleString('vi-VN')} VND
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Nội dung:</strong> {qrCodeData.description}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" component="h2" align="center" mb={2}>
            Lưu ý: Kiểm tra chính xác số lượng đấu thầu và số tiền bạn muốn mua.
            Hiện tại bạn đang mua thêm <strong>{bidNumber}</strong> lần đấu
            thầu, số tiền phải trả là{' '}
            <strong>{qrCodeData?.amount?.toLocaleString('vi-VN')} VND</strong>
          </Typography>
        </Box>
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Huỷ
          </Button>
        </Box>
      </Box>
    </Fade>
  </Modal>
);

const Payment = () => {
  const [bidNumber, setBidNumber] = useState(0);
  const [qrCodeData, setQrCodeData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleBuyBids = async (bid) => {
    setBidNumber(bid);
    try {
      const response = await paymentApi.createPayment(bid);
      console.log('response', response);
      setQrCodeData({
        qrCode: response.qrCode,
        bankName: 'Ngân hàng TMCP Quân đội',
        accountName: 'BUI QUANG TRUONG',
        accountNumber: response.accountNumber,
        amount: response.amount,
        description: response.description,
      });
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setModalOpen(false);

  return (
    <Box p={4}>
      <Typography
        sx={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#333333',
          mb: 4,
        }}
      >
        Mua thêm lượt đấu thầu
      </Typography>
      <ResponsiveGrid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <BidBox>
            <LocalOffer fontSize="large" color="primary" />
            <Typography variant="h6" mt={2}>
              Buy 5 Bids
            </Typography>
            <BidButton
              variant="contained"
              color="primary"
              onClick={() => handleBuyBids(5)}
            >
              Buy Now
            </BidButton>
          </BidBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <BidBox>
            <ShoppingCart fontSize="large" color="secondary" />
            <Typography variant="h6" mt={2}>
              Buy 10 Bids
            </Typography>
            <BidButton
              variant="contained"
              color="secondary"
              onClick={() => handleBuyBids(10)}
            >
              Buy Now
            </BidButton>
          </BidBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <BidBox>
            <Loyalty fontSize="large" color="success" />
            <Typography variant="h6" mt={2}>
              Buy 15 Bids
            </Typography>
            <BidButton
              variant="contained"
              color="success"
              onClick={() => handleBuyBids(15)}
            >
              Buy Now
            </BidButton>
          </BidBox>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <BidBox>
            <Edit fontSize="large" color="warning" />
            <Typography variant="h6" mt={2}>
              Buy Custom Bids
            </Typography>
            <BidButton
              variant="contained"
              color="warning"
              onClick={() => handleBuyBids(bidNumber)}
            >
              Customize
            </BidButton>
          </BidBox>
        </Grid>
      </ResponsiveGrid>
      <QRModal
        open={modalOpen}
        handleClose={handleClose}
        qrCodeData={qrCodeData}
        bidNumber={bidNumber}
      />
    </Box>
  );
};

export default Payment;
