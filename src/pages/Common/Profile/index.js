import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Typography,
  Box,
  Grid,
  IconButton,
  Paper,
  LinearProgress,
  Link,
  Button,
  Rating,
  TextField,
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import profileApi from '../../../services/profileApi';
import PaymentIcon from '@mui/icons-material/Payment';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ReportModal from './component/ReportModal';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import chatApi from '../../../services/chatApi';
import UpdateSkillModal from './component/UpdateSkillModal';
import CustomAvatar from '../../../components/CustomAvatar';
import { formatDate } from '../../../utils/formatDate';

const labels = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Khá tốt',
  5: 'Xuất sắc',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Profile = () => {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [profile, setProfile] = useState();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hover, setHover] = useState(-1);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      let res;
      if (userId) {
        if (parseInt(userId) === currentUser?.userId) {
          setIsOwnProfile(true);
        }
        res = await profileApi.getUserProfileById(userId);
      } else {
        setIsOwnProfile(true);
        res = await profileApi.getUserProfile();
      }
      setProfile(res);
    };
    getData();
  }, [userId, currentUser.userId]);

  const handleReport = async (reportData) => {
    await reportApi.createReport(reportData);
    toast.error('Đã khiếu nại người dùng');
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let data = {
        comment: newComment,
        star: newRating,
        rateToUserId: userId,
      };
      await profileApi.submitRating(data);
      toast.success('Đánh giá người dùng', profile.name);

      setProfile((prevProfile) => {
        const updatedRatings = prevProfile.ratings
          ? [...prevProfile.ratings]
          : [];
        updatedRatings.push({ star: newRating, comment: newComment });

        return {
          ...prevProfile,
          ratings: updatedRatings,
        };
      });

      setNewRating(0);
      setNewComment('');
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContact = async () => {
    let res = await chatApi.CreateNewConversation(currentUser?.userId, userId);
    navigate(`/chat/${res}/${userId}`);
  };

  return (
    <Box
      className="pl-40 pr-40 p-4"
      sx={{ paddingX: { xs: 2, sm: 4, md: 6, lg: 8 } }}
    >
      <Grid container spacing={2}>
        {/* Left Side */}
        <Grid item xs={12} md={8}>
          {/* Section 1 */}
          <Paper elevation={3} className="p-4 mb-4">
            <Box className="flex space-x-4">
              {profile?.avatar === null ? (
                <CustomAvatar name={profile?.name} size={100} />
              ) : (
                <Avatar
                  alt="Avatar"
                  src={profile?.avatar}
                  sx={{ height: 100, width: 100 }}
                  className="shadow-lg"
                />
              )}
              <Box className="flex-1 space-y-2">
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {profile?.name}
                </Typography>
                <Box className="flex space-x-2">
                  {profile?.skills.map((skill, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      className="bg-gray-200 p-1 rounded"
                    >
                      {skill}
                    </Typography>
                  ))}
                </Box>
                <Box className="flex items-center space-x-1">
                  <Rating
                    value={profile?.avgRate ?? 0}
                    precision={0.1}
                    readOnly
                  />
                  <Typography>
                    {profile?.avgRate ? profile.avgRate : 'No rating yet'} / 5
                  </Typography>
                </Box>
                <Button variant="contained">Xem thống kê</Button>
                {!isOwnProfile && (
                  <Box className="flex space-x-2 mt-2">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<ReportIcon />}
                      onClick={() => setIsReportModalOpen(true)}
                    >
                      Report
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ChatOutlinedIcon />}
                      onClick={() => handleContact()}
                    >
                      Nhắn tin
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className="mt-4 space-y-2">
              <Typography>
                Ngày tham gia: {formatDate(profile?.createdDate)}
              </Typography>
              <Typography>{profile?.description}</Typography>
            </Box>
          </Paper>

          {/* Section 2: Portfolio */}
          <Paper elevation={3} className="p-4 mb-4">
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Thành tích
            </Typography>
            <Box className="flex space-x-2 overflow-x-auto">
              {/* {mockData.portfolio.map((item, index) => (
                <Box key={index} className="flex-shrink-0 w-40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                  <Typography>{item.title}</Typography>
                </Box>
              ))} */}
            </Box>
          </Paper>

          {/* Section 3: Education */}
          <Paper elevation={3} className="p-4 mb-4">
            <div className="flex items-center mb-2">
              <SchoolIcon color="info" className="mr-3" />
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Học vấn
              </Typography>
            </div>
            {profile ? (
              profile?.educations?.length ? (
                profile.educations.map((edu, index) => (
                  <Box
                    key={index}
                    mb={2}
                    border="1px solid #ccc"
                    borderRadius={3}
                    p={2}
                  >
                    <Typography sx={{ fontSize: '1rem' }}>
                      Đại học/Cao đẳng: {edu.universityCollege}
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem' }}>
                      Bằng cấp: {edu.degree}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                      Thời gian hoàn thành:{' '}
                      {`${edu.start.year} - ${edu.end.year}`}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: '1rem' }}>
                  Hiện chưa có bất kì học vấn nào
                </Typography>
              )
            ) : (
              <LinearProgress />
            )}
          </Paper>

          {/* Section 4: Experience */}
          <Paper elevation={3} className="p-4 mb-4">
            <div className="flex items-center mb-2">
              <WorkIcon color="info" className="mr-3" />
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Kinh nghiệm
              </Typography>
            </div>
            {profile ? (
              profile?.experiences?.length ? (
                profile.experiences.map((exp, index) => (
                  <Box
                    key={index}
                    mb={2}
                    border="1px solid #ccc"
                    borderRadius={5}
                    p={2}
                  >
                    <Typography sx={{ fontSize: '1.25rem' }}>
                      {exp.title}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                      Thời gian làm việc:{' '}
                      {`${exp.start.year} - ${exp.end.year}`}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: 'gray' }}>
                      Mô tả ngắn: {exp.summary}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: '1rem' }}>
                  Hiện chưa có bất kì kinh nghiệm nào
                </Typography>
              )
            ) : (
              <LinearProgress />
            )}
          </Paper>

          {/* Section 5: Ratings */}
          <Paper elevation={3} className="p-4">
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Đánh giá
            </Typography>
            <Box className="mt-4 space-y-4">
              {profile ? (
                profile?.ratings?.length ? (
                  profile.ratings.map((rating, index) => (
                    <Paper key={index} elevation={2} className="p-4">
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Người dùng: {rating?.userRate}
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        {rating?.comment}
                      </Typography>
                      <Rating name="read-only" value={rating.star} readOnly />
                    </Paper>
                  ))
                ) : (
                  <Typography sx={{ fontSize: '1rem' }}>
                    Chưa có đánh giá nào
                  </Typography>
                )
              ) : (
                <LinearProgress />
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4} className="space-y-4">
          <Paper elevation={3} className="p-4">
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Thông tin xác thực
            </Typography>
            <Box className="mt-4 space-y-2">
              <Grid container>
                <Grid item xs={12} md={9}>
                  <Box className="flex items-center">
                    <PaymentIcon color="error" />
                    <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                      Xác thực thanh toán
                    </Typography>
                  </Box>
                </Grid>
                {isOwnProfile && (
                  <Grid item xs={12} md={3}>
                    <Link href="#" underline="hover">
                      <Typography>Xác thực</Typography>
                    </Link>
                  </Grid>
                )}
              </Grid>
              <Grid container>
                <Grid item xs={12} md={9}>
                  <Box className="flex items-center">
                    <PhoneAndroidIcon color="error" />
                    <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                      Xác thực số điện thoại
                    </Typography>
                  </Box>
                </Grid>
                {isOwnProfile && (
                  <Grid item xs={12} md={3}>
                    <Link href="#" underline="hover">
                      <Typography>Xác thực</Typography>
                    </Link>
                  </Grid>
                )}
              </Grid>
              <Grid container>
                <Grid item xs={12} md={profile?.emailConfirmed ? 11 : 9}>
                  <Box className="flex items-center">
                    <EmailIcon
                      color={profile?.emailConfirmed ? 'success' : 'error'}
                    />
                    <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                      Xác thực Email
                    </Typography>
                  </Box>
                </Grid>
                {isOwnProfile && !profile?.emailConfirmed ? (
                  <Grid item xs={12} md={3}>
                    <Link href="#" underline="hover">
                      <Typography>Xác thực</Typography>
                    </Link>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={1}>
                    <CheckCircleIcon color="success" fontSize="medium" />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={3} className="p-4">
            <Grid container>
              <Grid item xs={12} md={11}>
                <Typography
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    paddingTop: '8px',
                  }}
                >
                  Kĩ năng nổi bật
                </Typography>
              </Grid>
              {isOwnProfile && (
                <Grid item xs={12} md={1}>
                  <IconButton
                    sx={{
                      '& .MuiSvgIcon-root': {
                        transition: 'color 0.3s',
                      },
                      '&:hover .MuiSvgIcon-root': {
                        color: 'blue',
                      },
                    }}
                    onClick={() => setIsSkillModalOpen(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
            <Box className="mt-4 space-y-2">
              {profile?.skills?.length ? (
                profile.skills.map((skill, index) => (
                  <Box
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Typography sx={{ fontSize: '1rem' }}>{skill}</Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: '1rem' }}>
                  You haven't added any skills yet.
                </Typography>
              )}
            </Box>
          </Paper>
          <Paper elevation={3} className="p-4">
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Chứng chỉ
            </Typography>
            <Box className="mt-4">
              {profile?.qualifications?.length ? (
                profile.qualifications.map((item, index) => (
                  <Box
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Typography
                      component={RouterLink}
                      to={item.link}
                      sx={{ fontSize: '1rem' }}
                      color={'primary'}
                    >
                      {item.organization}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: '1rem' }}>
                  You haven't added any skills yet.
                </Typography>
              )}
            </Box>
          </Paper>
          {!isOwnProfile && (
            <Paper elevation={3} className="p-4">
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                Đánh giá của bạn
              </Typography>
              <Box className="mt-4">
                <form onSubmit={handleRatingSubmit}>
                  <Box className="flex flex-row">
                    <Rating
                      name="hover-feedback"
                      value={newRating}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => setNewRating(newValue)}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                    />
                    {newRating !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : newRating]}
                      </Box>
                    )}
                  </Box>
                  <TextField
                    label="Bình luận"
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    sx={{ marginY: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                  >
                    Gửi đánh giá
                  </Button>
                </form>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
      <ReportModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReport={handleReport}
        type="user"
      />
      <UpdateSkillModal
        openSkill={isSkillModalOpen}
        onCloseSkill={() => setIsSkillModalOpen(false)}
        profile={profile}
        setProfile={setProfile}
      />
    </Box>
  );
};

export default Profile;
