import { Box, Button, Divider, FilledInput, InputAdornment, LinearProgress, Modal, Tab, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import projectApi from '../../../services/projectApi';
import biddingApi from '../../../services/biddingApi';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProjectDetail from './ProjectDetail';
import ListBidding from './ListBidding';
import { ROLES } from '../../../constaints/role';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import LoadingComponent from '../../../components/LoadingComponent';

const Detail = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [value, setValue] = useState('1');
    const [detail, setDetail] = useState(null);
    const [budget, setBudget] = useState(0);
    const [comment, setComment] = useState('');
    const [duration, setDuration] = useState(0);
    const [listBidding, setListBidding] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getProjectDetail = async () => {
            setLoading(true);
            try {
                let res = await projectApi.GetProjectDetailsById(projectId);
                setDetail(res);
            } catch (error) {
                toast.error("Failed to fetch project details");
            } finally {
                setLoading(false);
            }
        }
        getProjectDetail()
    }, [projectId])

    useEffect(() => {
        const getAllBidding = async () => {
            setLoading(true);
            try {
                let res = await biddingApi.GetBiddingListByProjectId(projectId, 1, 10);
                setListBidding(res?.data);
            } catch (error) {
                toast.error("Failed to fetch bidding list");
            } finally {
                setLoading(false);
            }
        }
        getAllBidding()
    }, [value, projectId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (comment === '' || duration === '' || budget === 0 || budget < detail?.minBudget || budget > detail?.maxBudget) {
            toast.error("Something went wrong. Please check your input.");
            setLoading(false)
        } else {
            let data = {
                projectId: projectId,
                proposal: comment,
                duration: duration,
                budget: budget
            }
            try {
                await biddingApi.AddBidding(data, navigate);
                setOpen(false);
            } catch (error) {
                toast.error("Failed to place bid");
            } finally {
                setLoading(false);
            }
        }
    }

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await projectApi.DeleteProject(id);
            toast.success("Project deleted successfully");
        } catch (error) {
            toast.error("Failed to delete project");
        } finally {
            setLoading(false);
        }
    }

    const handleAccept = async (id) => {
        setLoading(true);
        let data = {
            id: id,
            isAccepted: true
        }
        try {
            await biddingApi.AcceptBidding(data, navigate);
            toast.success("Bidding accepted");
        } catch (error) {
            toast.error("Failed to accept bidding");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <LoadingComponent loading={loading} />}
            <Box m={5}>
                <Box mb={3}>
                    {value === '1' && (
                        <Header title="MÔ TẢ DỰ ÁN" subtitle="Thông tin chi tiết của dự án" />
                    )}
                    {value === '2' && (
                        <Header title="DANH SÁCH ĐẤU THẦU" subtitle="Danh sách đấu thầu của dự án" />
                    )}
                </Box>

                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Mô tả dự án" sx={{ fontSize: '12px' }} value="1" />
                                <Tab label="Đấu thầu" sx={{ fontSize: '12px' }} value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {detail == null ? (
                                <LinearProgress />
                            ) : (
                                <ProjectDetail
                                    detail={detail}
                                    navigate={navigate}
                                    handleDelete={handleDelete}
                                    currentUser={currentUser}
                                    projectId={projectId}
                                />
                            )}
                            {currentUser != null && currentUser?.role === ROLES.FREELANCER && (
                                <Button onClick={handleOpen}>Bidding</Button>
                            )}
                        </TabPanel>
                        <TabPanel value="2">
                            {listBidding == null ? (
                                <LinearProgress />
                            ) : (
                                <ListBidding
                                    listBidding={listBidding}
                                    currentUser={currentUser}
                                    createdBy={detail?.createdBy}
                                    handleAccept={handleAccept}
                                />
                            )}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{ bgcolor: '#F8F8FF', mt: 2 }}
            >
                <Box sx={style}>
                    <Box p={2}>
                        <Typography fontSize='18px' fontWeight='bold'>Place a bid on this project</Typography>
                    </Box>
                    <Divider />
                    <Box pt={3} pl={3}>
                        <Typography fontSize='15px'>You will be able to edit your bid until the project is awarded to someone.</Typography>
                    </Box>
                    <Box m={5}>
                        <Box display='flex' gap={1}>
                            <Box flex='1'>
                                <Typography fontWeight='bold'>Bid Amount</Typography>
                                <FilledInput
                                    value={budget}
                                    type='number'
                                    id="filled-adornment-weight"
                                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{ 'aria-label': 'weight' }}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </Box>
                            <Box flex='1'>
                                <Typography fontWeight='bold'>Duration</Typography>
                                <FilledInput
                                    type='number'
                                    value={duration}
                                    id="filled-adornment-weight"
                                    endAdornment={<InputAdornment position="end">day</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{ 'aria-label': 'weight' }}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </Box>
                        </Box>
                        <Box mt={2}>
                            <Typography fontWeight='bold'>Comment</Typography>
                            <TextField
                                fullWidth
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" p={2}>
                        <Button variant='contained' onClick={handleSubmit}>Bid</Button>
                        <Button variant='contained' onClick={() => setLoading(true)}>Loading</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

export default Detail;
