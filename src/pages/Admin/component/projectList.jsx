import React from 'react';
import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
  Alert,
  Button,
  Snackbar,
} from '@mui/material';
import ProjectDescription from '../../../components/ProjectDescription';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDate } from '../../../utils/formatDate';
import projectApi from '../../../services/projectApi';
import { formatCurrency } from '../../../utils/formatCurrency';

const ProjectList = ({ listProject, setReload }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChangeStatus = async (id, statusId) => {
    let data = {
      statusId: statusId,
      projectId: id,
    };
    try {
      await projectApi.changeProjectStatus(data);
      setOpen(true);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                        backgroundColor: project?.projectStatus?.statusColor,
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
                            sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                            className="mt-2 ml-2 inline-block rounded-3xl border border-sky-500 p-2"
                          >
                            <Typography fontSize="15px"> {item} </Typography>
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
                      <Button
                        onClick={() =>
                          handleChangeStatus(
                            project?.id,
                            project?.projectStatus?.id
                          )
                        }
                        variant="contained"
                        size="small"
                      >
                        Approve
                      </Button>
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
      </Box>
    </Box>
  );
};

export default ProjectList;
