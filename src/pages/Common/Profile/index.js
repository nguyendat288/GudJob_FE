import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, Container, Grid, IconButton, Paper, LinearProgress, Link, Button, Rating, TextField } from '@mui/material';
import { LinkedIn, GitHub, CheckCircleOutline, School as SchoolIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import profileApi from '../../../services/profileApi';
import AboutImage from '../../../assets/about.jpg';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentIcon from '@mui/icons-material/Payment';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import ReportModal from './component/ReportModal';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';

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

function Profile() {
    const { userId } = useParams();
    const [profile, setProfile] = useState();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [hover, setHover] = useState(-1);

    useEffect(() => {
        const getData = async () => {
            let res;
            if (userId) {
                res = await profileApi.getUserProfileById(userId);
            } else {
                res = await profileApi.getUserProfile();
            }
            setProfile(res);
        };
        getData();
    }, [userId]);

    const isOwnProfile = userId === undefined;
console.log("profile", profile);
    const handleReport = async (reportData) => {
        console.log("reportData", reportData);
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
                rateToUserId: userId
            }
            await profileApi.submitRating(data);
            toast.success('Đánh giá thành công');
            setProfile((prevProfile) => ({
                ...prevProfile,
                ratings: [...prevProfile.ratings, { star: newRating, comment: newComment }]
            }));
            setNewRating(0);
            setNewComment('');
        } catch (error) {
            toast.error('Lỗi khi đánh giá');
        } finally {
            setSubmitting(false);
        }
    };
console.log("profile.ratings", profile.ratings);
    return (
        <Container>
            <Grid container spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={8}>
                    <section id="profile" className="flex flex-col items-center py-12 bg-gray-100 rounded-t-none rounded-lg shadow-md">
                        <Avatar alt="Avatar" src={profile?.avatar} sx={{ height: 80, width: 80 }} className="shadow-lg" />
                        <Typography sx={{ fontSize: '1.25rem' }} className="mt-4">Hello, I'm</Typography>
                        <Typography sx={{ fontSize: '3rem', fontWeight: 'bold' }} className="font-bold">{profile?.name}</Typography>
                        <Typography sx={{ fontSize: '1.25rem' }} className="text-gray-600">Backend Developer</Typography>
                        <Typography sx={{ fontSize: '1rem', textAlign: 'center', marginTop: '1rem', paddingX: '1rem' }}>I am a backend developer who is always dedicated to my work and ready when a new job comes up.</Typography>
                        <Box className="flex mt-4 space-x-4">
                            <IconButton href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                                <LinkedIn />
                            </IconButton>
                            <IconButton href="https://www.github.com" target="_blank" aria-label="GitHub">
                                <GitHub />
                            </IconButton>
                            {!isOwnProfile && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<ReportIcon />}
                                    onClick={() => setIsReportModalOpen(true)}
                                >
                                    Report
                                </Button>
                            )}
                        </Box>
                    </section>

                    <section id="about" className="py-12">
                        <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>Get To Know More</Typography>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 'bold', textAlign: 'center' }}>About Me</Typography>
                        <Grid container spacing={4} className="mt-8">
                            <Grid item xs={12} md={6}>
                                <img src={AboutImage} alt="About" className="w-full rounded-lg" />
                            </Grid>
                            <Grid item xs={12} md={6} className="space-y-6">
                                <Paper elevation={3} className="p-4">
                                    <Box>
                                        <div className="flex items-center mb={2}">
                                            <CheckCircleOutline color="info" className="mr-3" />
                                            <Typography sx={{ fontSize: '1.25rem' }}>Education</Typography>
                                        </div>
                                        {profile ? (profile?.educations?.length ? (
                                            profile.educations.map((edu, index) => (
                                                <Box key={index} mb={2} border="1px solid #ccc" borderRadius={5} p={2}>
                                                    <Typography sx={{ fontSize: '1rem' }}>Đại học/Cao đẳng: {edu.universityCollege}</Typography>
                                                    <Typography sx={{ fontSize: '1.25rem' }}>Bằng cấp: {edu.degree}</Typography>
                                                    <Typography sx={{ fontSize: '1rem' }}>Thời gian hoàn thành: {`${edu.start.year} - ${edu.end.year}`}</Typography>
                                                </Box>
                                            ))
                                        ) : <Typography sx={{ fontSize: '1rem' }}>Hiện chưa có bất kì học vấn nào</Typography>) : <LinearProgress />}
                                    </Box>
                                </Paper>
                                <Paper elevation={3} className="p-4">
                                    <Box>
                                        <div className="flex items-center mb={2}">
                                            <SchoolIcon color="info" className="mr-3" />
                                            <Typography sx={{ fontSize: '1.25rem' }}>Experience</Typography>
                                        </div>
                                        {profile ? (profile?.experiences?.length ? (
                                            profile.experiences.map((exp, index) => (
                                                <Box key={index} mb={2} border="1px solid #ccc" borderRadius={5} p={2}>
                                                    <Typography sx={{ fontSize: '1.25rem' }}>{exp.title}</Typography>
                                                    <Typography sx={{ fontSize: '1rem' }}>Thời gian làm việc: {`${exp.start.year} - ${exp.end.year}`}</Typography>
                                                    <Typography sx={{ fontSize: '1rem', color: 'gray' }}>Mô tả ngắn: {exp.summary}</Typography>
                                                </Box>
                                            ))
                                        ) : <Typography sx={{ fontSize: '1rem' }}>Hiện chưa có bất kì kinh nghiệm nào</Typography>) : <LinearProgress />}
                                    </Box>
                                </Paper>
                                <Paper elevation={3} className="p-4">
                                    <div className="flex items-center mb={2}">
                                        <DescriptionIcon color="info" className="mr-3" />
                                        <Typography sx={{ fontSize: '1.25rem' }}>Cơ bản về tôi</Typography>
                                    </div>
                                    <Typography sx={{ fontSize: '1rem', color: 'gray' }}>{profile?.description}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </section>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={4}>
                    <Box className="space-y-6">
                        <Paper elevation={3} className="p-4" sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Thông tin xác thực</Typography>
                            <Box className="mt-4 space-y-2">
                                <Grid container>
                                    <Grid item xs={12} md={9}>
                                        <Box className="flex items-center">
                                            <VerifiedUserIcon color='warning' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực cá nhân</Typography>
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
                                            <PaymentIcon color='error' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực thanh toán</Typography>
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
                                    <Grid item xs={12} md={11}>
                                        <Box className="flex items-center">
                                            <PhoneAndroidIcon color='error' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực số điện thoại</Typography>
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
                                    <Grid item xs={12} md={11}>
                                        <Box className="flex items-center">
                                            <EmailIcon color='success' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực Email</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <CheckCircleIcon color='success' fontSize='medium' />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        <Paper elevation={3} className="p-4">
                            <Grid container>
                                <Grid item xs={12} md={11}>
                                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', paddingTop: '8px' }}>Kĩ năng nổi bật</Typography>
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
                                            }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                )}
                            </Grid>
                            <Box className="mt-4 space-y-2">
                                <Typography sx={{ fontSize: '1rem' }}>JavaScript</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>HTML</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>Shopify</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>React.js</Typography>
                            </Box>
                        </Paper>

                        <Paper elevation={3} className="p-4">
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Chứng chỉ</Typography>
                            <Box className="mt-4">
                                <Typography sx={{ fontSize: '1rem' }}>You don't have any certifications yet.</Typography>
                            </Box>
                        </Paper>

                        <Paper elevation={3} className="p-4">
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Đánh giá</Typography>
                            <Box className="mt-4 space-y-4">
                                {profile ? (profile?.ratings?.length ? (
                                    profile.ratings.map((rating, index) => (
                                        <Paper key={index} elevation={2} className="p-4" sx={{ borderRadius: 5 }}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Người dùng: {rating.userRate}</Typography>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{rating.comment}</Typography>
                                            <Rating name="read-only" value={rating.star} readOnly />
                                        </Paper>
                                    ))
                                ) : <Typography sx={{ fontSize: '1rem' }}>Chưa có đánh giá nào</Typography>) : <LinearProgress />}
                            </Box>
                        </Paper>

                        {!isOwnProfile && (
                            <Paper elevation={3} className="p-4">
                                <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Đánh giá của bạn</Typography>
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
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : newRating]}</Box>
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
                    </Box>
                </Grid>
            </Grid>
            <ReportModal
                open={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                onReport={handleReport}
                type="user"
            />
        </Container>
    );
}

export default Profile;
