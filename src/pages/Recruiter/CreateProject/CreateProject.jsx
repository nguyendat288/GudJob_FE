import { Autocomplete, Box, Button, FilledInput, InputAdornment, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../LayOutRecruiter/Header'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import categoryApi from '../../../services/categoryApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import projectApi from '../../../services/projectApi';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [listCategory, setListCategory] = useState([])
    const [category, setCategory] = useState('')
    const [budgetMin, setBudgetMin] = useState(0)
    const [budgetMax, setBudgetMax] = useState(0)
    const [duration, setDuration] = useState('')
    const [listSkill, setListSkill] = useState([]);
    const [listSkillSelected, setListSkillSelected] = useState([])
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate();
    useEffect(() => {
        const getCategory = async () => {
            const res = await categoryApi.GetAllCategory();
            setListCategory(res)
        }
        getCategory()
    }, [])

    useEffect(() => {
        setListSkillSelected([])
        if (category !== "") {
            const getSkill = async () => {
                const res = await categoryApi.GetByCategoryId(category);
                setListSkill(res?.items)
            }
            getSkill()
        }
    }, [category])

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    const handleSubmit = async () => {
        let data = {
            title: name,
            description: description,
            minBudget: budgetMin,
            maxBudget: budgetMax,
            categoryId: category,
            duration: duration,
            createdBy: currentUser?.userId,
            skill: listSkillSelected
        }

        if (name === '' || description === '' || category === null || budgetMin === 0 || budgetMax <= budgetMin || duration === '' || listSkillSelected.length === 0) {
            toast.error("not empty")
        } else {
            await projectApi.AddProject(data, navigate);
        }
    }

    return (
        <Box m={5}>
            <Header title='Create New Project' subtitle='You can create new project' />
            <Paper sx={{ bgcolor: '#F8F8FF' }}>
                <Box m={5} p={5}>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                        className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'
                    >
                        GoodJob
                    </Typography>
                    <Typography variant="h6"
                    > Tell us what you need done. </Typography>

                    <Box mt={2}>
                        <Typography mt={3} fontSize='20px' fontWeight='bold'> Project Name </Typography>
                        <Box mt={2}>
                            <TextField fullWidth
                                value={name}
                                sx={{
                                    bgcolor: '#FFFFFF'
                                }}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <Typography mt={3} fontSize='20px' fontWeight='bold'> Project Description </Typography>
                        <Box mt={2}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onChange={handleDescriptionChange}
                            />
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <Typography mt={3} fontSize='20px' fontWeight='bold'> What category are required? </Typography>
                        <Box mt={2}>
                            <Select
                                fullWidth
                                sx={{
                                    bgcolor: '#FFFFFF'
                                }}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {listCategory?.length !== 0 && listCategory.map((item, index) => (
                                    <MenuItem value={item?.id}>{item?.categoryName}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>

                    <Box mt={2}>
                        <Typography mt={3} fontSize='20px' fontWeight='bold'> What skills are required? </Typography>
                        <Typography mt={3} fontSize='15px'> Enter up to 5 skills that best describe your project. </Typography>
                        <Typography mt={2} fontSize='15px'> Freelancers will use these skills to find projects they are most interested and experienced in. </Typography>
                        <Box mt={2}>

                            <Autocomplete
                             sx={{
                                bgcolor: '#FFFFFF'
                            }}
                                multiple
                                options={listSkill}
                                getOptionLabel={(option) => option?.skillName}
                                filterSelectedOptions
                                // value={listSkillSelected}
                                onChange={(event, value) => setListSkillSelected(value.map((item) => item?.skillName))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Skill"
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <Box mt={2}>
                        <Typography mt={3} fontSize='20px' fontWeight='bold'> Budget Of Project  </Typography>
                        <Typography mt={3} fontSize='15px'> Enter the budget you can afford for this project. </Typography>
                        <Box mt={2} display='flex'>
                            <Box>
                                <Typography> Budget Min</Typography>
                                <FilledInput
                                 sx={{
                                    bgcolor: '#FFFFFF'
                                }}
                                    value={budgetMin}
                                    type='number'
                                    id="filled-adornment-weight"
                                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => setBudgetMin(e.target.value)}
                                />
                            </Box>
                            <Box ml={3}>
                                <Typography> Budget Max</Typography>
                                <FilledInput
                                 sx={{
                                    bgcolor: '#FFFFFF'
                                }}
                                    type='number'
                                    value={budgetMax}
                                    id="filled-adornment-weight"
                                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={(e) => setBudgetMax(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <Typography mt={3} fontSize='20px' fontWeight='bold'> Duration   </Typography>
                        <Typography mt={3} fontSize='15px'> The time you want the freelancer to complete the project  </Typography>
                        <Box mt={2} >
                            <TextField
                                value={duration}
                                type='number'
                                sx={{
                                    bgcolor: '#FFFFFF'
                                }}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </Box>
                    </Box>
                    <Box mt={3}>
                        <Button variant='contained' onClick={(e) => handleSubmit()}> Create </Button>
                    </Box>
                </Box>


            </Paper>
        </Box>
    )
}

export default CreateProject
