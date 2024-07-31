import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Pagination,
  Button,
  CardHeader,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileApi from '../../../services/profileApi';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/formatDate';
import projectApi from '../../../services/projectApi';
import { toast } from 'react-toastify';
import { truncateText } from '../../../utils/truncateText';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function CurrentProject() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [allProjects, setAllProjects] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [statusId, setStatusId] = useState(2);
  const [reload, setReload] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await profileApi.getUserProjectByStatus({
          userId: currentUser?.userId,
          statusId: statusId,
          pageIndex: page,
          pageSize: pageSize,
        });
        setAllProjects(allProjects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [page, pageSize, currentUser?.userId, statusId, reload]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (newStatusId) => {
    setStatusId(newStatusId);
    setPage(1);
  };

  const handleMarkAsDone = async () => {
    try {
      let data = {
        projectId: selectedProject.projectId,
        bidId: selectedProject.bidId,
        statusId: 9,
      };
      await projectApi.MarkDoneProject(data);
      setReload((prev) => !prev);
      toast.success('Project marked as done successfully');
      setOpen(false);
    } catch (error) {
      console.log(error);
      console.error('Error marking project as done:', error);
    }
  };

  const handleClickOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Box
      p={3}
      m={3}
      border="1px solid #ccc"
      borderRadius={5}
      className="bg-white"
    >
      <Typography sx={{ fontSize: '2em', mb: 2 }} gutterBottom>
        Current Projects
      </Typography>
      <Box className="mb-4">
        <div className="relative w-full flex justify-left">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-b-2 border-gray-300"></span>
          </div>
          <div className="relative flex justify-center space-x-1 bg-gray-100 rounded-full p-1 shadow">
            <button
              onClick={() => handleTabChange(2)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 2
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đã bid
            </button>
            <button
              onClick={() => handleTabChange(3)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 3
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đang làm
            </button>
            <button
              onClick={() => handleTabChange(9)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 9
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đợi kiểm
            </button>
            <button
              onClick={() => handleTabChange(6)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 6
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đã hoàn thành
            </button>
          </div>
        </div>
      </Box>
      {allProjects?.items?.length > 0 ? (
        <Box>
          <Grid container spacing={2}>
            {allProjects.items.map((project, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => handleDetail(project?.projectId)}
                >
                  <CardHeader
                    action={<Chip label={project.status} color="primary" />}
                    title={
                      <Typography
                        variant="h1"
                        sx={{ fontSize: '1.5em' }}
                        gutterBottom
                      >
                        {truncateText(project?.projectName, 40)}
                      </Typography>
                    }
                  />
                  <CardContent
                    sx={{ flexGrow: 1, paddingTop: 0, paddingBottom: 0 }}
                  >
                    <Typography variant="body1" component="div">
                      <strong>Project Owner:</strong> {project.projectOwner}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Bid Budget:</strong> {project.bidBudget} VND
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Duration:</strong> {project.duration} days
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Deadline:</strong> {formatDate(project.deadline)}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Time Bid:</strong> {formatDate(project.timeBid)}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {project.statusId === 3 && (
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickOpen(project);
                        }}
                        sx={{ ml: 'auto' }}
                      >
                        Mark as done
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(allProjects.totalItemsCount / pageSize)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      ) : (
        <Typography>No projects found.</Typography>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontSize: '1.875rem' }}>
          {'Xác nhận công việc đã hoàn thành'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn chắc chắn muốn xác nhận công việc này đã hoàn thành? Công việc
            này sẽ chuyển sang trạng thái đợi kiểm. Người đăng bài sẽ kiểm tra
            kết quả công việc và thông báo công việc này đã hoàn thiện sau này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleMarkAsDone}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CurrentProject;
