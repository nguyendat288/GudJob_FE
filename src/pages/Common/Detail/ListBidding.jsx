import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Pagination,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ROLES } from '../../../constaints/role';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';
import ReportModal from '../Profile/component/ReportModal';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { formatDateTime } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';

const ListBidding = ({
  listBidding,
  currentUser,
  createdBy,
  handlePageChange,
  handleOpenBidding,
  detail,
  page,
  totalPage,
}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [bid, setBid] = useState();
  const navigate = useNavigate();
  const handleReport = async (reportData) => {
    await reportApi.createReport(reportData);
    toast.error('Đã khiếu nại dự án');
  };

  const handleClickReport = (id) => {
    setBid(id);
    setIsReportModalOpen(true);
  };
  const handleNameClick = (userId) => {
    navigate(`/profile/${userId}`);
  };
  const renderSkill = (listSkill) => {
    return (
      <Tooltip title="Kỹ năng ">
        <Box display="flex" gap={2}>
          {listSkill?.map((item, index) => (
            <Typography key={index} fontSize="15px" fontWeight="bold">
              {' '}
              {item}{' '}
            </Typography>
          ))}
        </Box>
      </Tooltip>
    );
  };
  return (
    <Box display="flex">
      <Box flex="4">
        {listBidding?.items?.length === 0 && (
          <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Alert severity="info">Hiện tại chưa có bản ghi nào .</Alert>
          </Container>
        )}
        {listBidding &&
          listBidding?.items?.map((item, index) => (
            <div key={index}>
              <Paper sx={{ bgcolor: '#F8F8FF', borderRadius: '5px', mt: 1 }}>
                <Box p={3}>
                  <Box display="flex">
                    <Box display="flex">
                      <Avatar
                        alt="Remy Sharp"
                        sx={{
                          width: '65px',
                          height: '65px',
                        }}
                        src={item?.appUser2?.avatar}
                      />
                      <Box ml={2}>
                        <Box display="flex" alignItems="center">
                          <Typography
                            fontSize="15px"
                            fontWeight="bold"
                            onClick={() => handleNameClick(item?.appUser2?.id)}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: 'blue',
                              },
                            }}
                          >
                            {item?.appUser2?.name}{' '}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Tooltip title="Đánh giá trung bình">
                            <Box display="flex" alignItems="center">
                              <Rating
                                disabled
                                value={item?.appUser2?.avgRate}
                                defaultValue={item?.appUser2?.avgRate}
                                precision={0.1}
                              />
                              <Typography ml={1}>
                                {item?.appUser2?.avgRate}{' '}
                              </Typography>
                            </Box>
                          </Tooltip>
                          <Tooltip title="Tổng số đánh giá">
                            <Typography>
                              <HowToVoteIcon /> {item?.appUser2?.totalRate}
                            </Typography>
                          </Tooltip>
                          <Tooltip title="Địa chỉ">
                            {(item?.appUser2?.city != null ||
                              item?.appUser2?.country != null) && (
                              <>
                                <Typography>
                                  <FmdGoodIcon color="primary" />{' '}
                                  {item?.appUser2?.city}{' '}
                                  {item?.appUser2?.country}{' '}
                                </Typography>
                              </>
                            )}
                          </Tooltip>
                        </Box>
                        {renderSkill(item?.appUser2?.skill)}
                      </Box>
                    </Box>
                    <Box ml="auto">
                      <Typography>
                        {' '}
                        Ngân sách : {formatCurrency(item?.budget)}{' '}
                      </Typography>
                      <Typography>
                        {' '}
                        Thời gian : {item?.duration} ngày{' '}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography mt={1}>{item?.proposal} </Typography>

                  {currentUser != null &&
                    currentUser?.role === ROLES.RECRUITER &&
                    currentUser?.userId === createdBy &&
                    detail.projectStatus.id === 2 && (
                      <>
                        <Box display="flex" mt={1} ml="auto">
                          <Button
                            variant="contained"
                            onClick={(e) => handleOpenBidding(item?.id)}
                          >
                            Chấp nhận
                          </Button>
                        </Box>
                      </>
                    )}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                  >
                    <Typography fontSize="12px" mt={2}>
                      Thời gian cập nhật : {formatDateTime(item?.updatedDate)}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Tooltip title="Tố cáo đấu thầu">
                        <Box
                          display="flex"
                          alignItems="center"
                          onClick={() => handleClickReport(item?.id)}
                          className="text-blue-600 cursor-pointer"
                        >
                          <FlagCircleIcon />
                          <Typography
                            ml={1}
                            fontSize="12px"
                            sx={{
                              textDecoration: 'underline',
                            }}
                          >
                            Tố cáo đấu thầu
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </div>
          ))}
        {listBidding?.items?.length > 0 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPage}
              defaultPage={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
      <Box flex="1" ml={2}>
        <ReportModal
          open={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onReport={handleReport}
          type="bid"
          bid={bid}
        />
      </Box>
    </Box>
  );
};

export default ListBidding;
