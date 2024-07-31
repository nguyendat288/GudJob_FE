import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
  Alert,
  Button,
  Snackbar,
  Stack,
  Modal,
} from '@mui/material';
import ProjectDescription from '../../../components/ProjectDescription';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDate } from '../../../utils/formatDate';
import projectApi from '../../../services/projectApi';
import { formatCurrency } from '../../../utils/formatCurrency';
import ShowListSkeleton from '../../../components/Skeleton/ShowListSkeleton';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled('textarea')(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

const ProjectList = ({ listProject, setReload }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reasonReject, setReasonReject] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleOpenModal = (projectId) => {
    setReasonReject('');
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setReasonReject('');
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleApprove = async (id, statusId) => {
    let data = {
      statusId: statusId,
      projectId: id,
    };
    try {
      await projectApi.ApproveProject(data);
      setOpen(true);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    if (!reasonReject) return;
    let data = {
      statusId: 5,
      projectId: selectedProjectId,
      rejectReason: reasonReject,
    };
    try {
      await projectApi.RejectProject(data);
      setOpenModal(false);
      setOpen(true);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {Object.keys(listProject).length === 0 ? (
        <ShowListSkeleton />
      ) : (
        <Box className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
              Project List
            </Typography>
          </Box>
          <Box>
            {listProject === undefined && <LinearProgress />}
            {listProject?.items?.length === 0 && (
              <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Alert severity="info">Hiện tại chưa có bản ghi nào .</Alert>
              </Container>
            )}
            {listProject?.items?.length !== 0 &&
              listProject?.items?.map(
                (project, index) =>
                  project?.projectStatus?.id === 1 && (
                    <Box key={index} className="project-item">
                      <Box
                        sx={{
                          position: 'relative',
                          padding: '10px',
                          backgroundColor: '#fff',
                          '&:hover': {
                            backgroundColor: '#f0f0f0',
                          },
                          cursor: 'pointer',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '-7px',
                            left: 0,
                            padding: '4px 8px',
                            backgroundColor:
                              project?.projectStatus?.statusColor,
                            color: 'black',
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px',
                            border: '1px solid #ccc',
                          }}
                        >
                          <Typography className="font-bold" fontSize={'10px'}>
                            {project?.projectStatus?.statusName}
                          </Typography>
                        </Box>
                        <Box display="flex" mt={1}>
                          <Box>
                            <TypographyTitle
                              title={project?.title}
                              color="#3366FF"
                            />
                            <Typography fontWeight="bold" fontSize="14px">
                              Ngân sách : {formatCurrency(project?.minBudget)}-{' '}
                              {formatCurrency(project?.maxBudget)}
                            </Typography>
                            <Typography fontWeight="bold" fontSize="14px">
                              Thời gian : {project?.duration} ngày
                            </Typography>
                          </Box>
                        </Box>
                        <Box mt={1}>
                          <Box m={2}>
                            <ProjectDescription
                              description={project?.description}
                            />
                          </Box>
                          <Typography fontWeight="bold" fontSize="14px">
                            Kỹ năng yêu cầu
                          </Typography>
                          <Box display="flex" flexWrap="wrap">
                            {project?.skill?.map((item, index) => (
                              <Box
                                key={index}
                                sx={{
                                  '&:hover': { backgroundColor: '#f0f8ff' },
                                }}
                                className="mt-2 ml-2 inline-block rounded-3xl border border-sky-500 p-2"
                              >
                                <Typography fontSize="15px">
                                  {' '}
                                  {item}{' '}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1,
                          }}
                        >
                          <Typography className="self-center" fontSize="12px">
                            Ngày tạo : {formatDate(project?.createdDate)}
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            <Button
                              onClick={() =>
                                handleApprove(
                                  project?.id,
                                  project?.projectStatus?.id
                                )
                              }
                              variant="contained"
                              size="small"
                            >
                              Duyệt
                            </Button>
                            <Button
                              onClick={() => handleOpenModal(project.id)}
                              variant="outlined"
                              size="small"
                            >
                              Từ chối
                            </Button>
                          </Stack>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  )
              )}
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Cập nhật trạng thái dự án thành công"
            />
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <TypographyTitle title="Lý do từ chối" />
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                  Cung cấp lý do từ chối để người đăng bài chỉnh sửa lại project
                  của họ phù hợp hơn.
                </Typography>
                <Textarea
                  aria-label="minimum height"
                  minRows={3}
                  value={reasonReject}
                  onChange={(e) =>
                    setReasonReject(e.target.value.slice(0, 200))
                  }
                  placeholder="Giới hạn 200 kí tự..."
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    onClick={handleCloseModal}
                    color="secondary"
                    sx={{ mr: 1 }}
                  >
                    Hủy bỏ
                  </Button>
                  <Button variant="contained" onClick={handleReject}>
                    Gửi
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProjectList;
