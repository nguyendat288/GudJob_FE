import { Box, Button, Divider, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { styled } from '@mui/system';
import ListComment from './ListComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authApi from '../service/authApi';
import { toast } from 'react-toastify';

const StyledTypography = styled(Typography)(({ theme }) => ({
    borderRadius: '10px',
    marginLeft: theme.spacing(3),
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
    textAlign: 'center',
}));

const Detail = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate();

    const { projectId } = useParams()
    const [detail, setDetail] = useState();
    const [item, setItem] = useState([]);
    const [open, setOpen] = useState(false);

    const [proposal, setProposal] = useState('')
    const [budget, setBudget] = useState(0)
    const [duration, setDuration] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getProjectDetail = async () => {
            let res = await authApi.GetProjectDetailsById(projectId);
            setDetail(res);
            if(res?.createdBy === currentUser?.userId){
                const getBidding = async () => {
                    let res1 = await authApi.GetBiddingListByProjectId(projectId,1,10);
                    setItem(res1?.items);
                }
                getBidding()
            }
        }
        getProjectDetail()
    }, [])       
    

    useEffect(() => {
      
     
    }, [])   

    console.log(item);

    const handleSubmit = async (e) => {
        if (proposal === '' || duration =='' || budget == 0) {
            toast.error("Something was error");
        }else{
            let data = {
                projectId: projectId,
                userId: currentUser?.userId,
                proposal: proposal,
                duration: duration,
                budget: budget
            }
            await authApi.AddBidding(data, navigate);
        }
    }

    return (
        <>
            <Navbar />
            <Box m={4}>
                <Box display='flex'>
                    <Typography variant='h4'>{detail?.title} </Typography>
                    {detail?.statusId == 1 && (<>
                        <StyledTypography>
                            Pending
                        </StyledTypography>
                    </>)}
                    {detail?.statusId == 2 && (<>
                        <StyledTypography>
                            Done
                        </StyledTypography>
                    </>)}
                </Box>
                <Divider />
                <Paper>
                    <Box p={3} display='flex' justifyContent='space-between' justifyItems='center'>
                        <Box>
                            <Typography variant='h5'>Project Detail</Typography>
                            <Box
                                bgcolor='#CCCCCC'
                                sx={{
                                    mt: 1,
                                    borderRadius: '10px',
                                    padding: '5px',
                                    display: 'inline-block',
                                    marginBottom: 4
                                }}
                            >
                                <Typography> {detail?.category?.categoryName} </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant='h6'>Budget   : {detail?.minBudget} $- {detail?.maxBudget} $</Typography>
                            <Typography variant='h6'>Duration : {detail?.duration} </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={4}>
                        <Typography variant='h6'>Project Description</Typography>
                        <Typography> {detail?.description} </Typography>
                    </Box>
                    {detail?.createdBy != currentUser?.userId && (<>
                        <Box p={4}>
                            <Button variant='contained' onClick={handleOpen}>Bidding</Button>
                        </Box>
                    </>)

                    }

                </Paper>
                {
                    detail?.createdBy == currentUser?.userId && (<>
                        <ListComment list={item}/>

                    </>)
                }
            </Box>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography fontSize='25px' fontWeight='bold'> Bidding  </Typography>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            value={proposal}
                            onChange={(e) => setProposal(e.target.value)}
                            label="Comment" variant="outlined" />

                        <Box display='flex' justifyContent='space-between' gap={3} mt={3}>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Budget</FormHelperText>
                                <OutlinedInput
                                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    type='number'
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </FormControl>
                            <Box mt={3}>
                                <TextField
                                    fullWidth
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    label="Duration" variant="outlined" type='text' />
                            </Box>
                        </Box>

                        <Box mt={3}>
                            <Button
                                variant='contained'
                                onClick={(e) => handleSubmit(e)}
                            >Create Project</Button>
                        </Box>
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
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};
export default Detail
