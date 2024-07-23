import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../constaints/role';
const UnAuthorized = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const handleRedirect = () => {
    if (currentUser === null) {
      navigate('/login');
    } else if (currentUser?.role === ROLES.FREELANCER) {
      navigate('/home');
    } else if (currentUser?.role === ROLES.RECRUITER) {
      navigate('/recruiter');
    } else if (currentUser?.role === ROLES.ADMIN) {
      navigate('/admin');
    }
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', marginTop: '250px' }}>
      <h1 className="w3-jumbo w3-animate-top w3-center">
        <code>Access Denied</code>
      </h1>
      <hr
        className="w3-border-white w3-animate-left"
        style={{ margin: 'auto', width: '50%' }}
      />
      <h3 className="w3-center w3-animate-right">
        You dont have permission to view this site.
      </h3>
      <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={() => handleRedirect()}
      >
        {currentUser === null && <Typography>Đăng nhập</Typography>}

        {currentUser?.role === ROLES.FREELANCER && (
          <Typography>Trở về trang chủ</Typography>
        )}

        {(currentUser?.role === ROLES.RECRUITER ||
          currentUser?.role === ROLES.ADMIN) && (
          <Typography>Back to dashboard</Typography>
        )}
      </Button>
    </div>
  );
};

export default UnAuthorized;
