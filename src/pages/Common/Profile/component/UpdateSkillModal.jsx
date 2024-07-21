import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  ListItemButton,
  Chip,
  Stack,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import categoryApi from '../../../../services/categoryApi';
import profileApi from '../../../../services/profileApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import skillApi from '../../../../services/skillAPI';

const UpdateSkillModal = ({ openSkill, onCloseSkill, profile, setProfile }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [listSkill, setListSkill] = useState([]);
  const [defaultListSkill, setDefaultListSkill] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await categoryApi.GetAllCategory();
        const resSkillList = await skillApi.GetAllSkill();
        setDefaultListSkill(resSkillList);
        setCategory(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (profile) {
      setSelected(profile?.skills);
    }
  }, [profile]);

  const handleDelete = (skillToDelete) => {
    setSelected((prevSelected) =>
      prevSelected.filter((skill) => skill !== skillToDelete)
    );
  };

  const handleToggleSkill = (skill) => {
    if (selected.includes(skill)) {
      handleDelete(skill);
    } else {
      setSelected((prevSelected) => [...prevSelected, skill]);
    }
  };

  const handleShowSkillByCategory = async (categoryId) => {
    try {
      const res = await categoryApi.GetByCategoryId(categoryId);
      setListSkill(res?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...profile,
      skills: selected,
    };

    const data = {
      name: profile.name,
      email: profile.email,
      phoneNumber: profile.phoneNumber || '',
      description: profile.description || '',
      taxCode: profile?.taxCode || '',
      isCompany: profile?.isCompany || false,
      skills: selected || [],
    };

    try {
      await profileApi.updateProfile(data, navigate);
      toast.success('Profile updated successfully!');
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error response from server:', error.response);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message ||
            'Something went wrong. Please try again.'
        );
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
    onCloseSkill();
  };

  return (
    <Modal open={openSkill} onClose={onCloseSkill}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          maxWidth: '90%',
          minWidth: isSmallScreen ? '90%' : 1500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '10px',
          p: 4,
          overflow: 'auto',
        }}
      >
        <Typography className="text-xl font-bold">
          Select your skills and expertise
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 4,
            mb: 3,
          }}
        >
          {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            id="fullWidth"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for skills"
          /> */}
          <Autocomplete
            fullWidth
            disabled={selected.length >= 5}
            options={defaultListSkill.filter((skill) =>
              skill.skillName.toLowerCase().includes(search.toLowerCase())
            )}
            getOptionLabel={(option) => option.skillName}
            renderInput={(params) => (
              <TextField {...params} label="Search Skills" variant="outlined" />
            )}
            onChange={(event, newValue) => {
              if (
                newValue &&
                !selected.includes(newValue.skillName) &&
                selected.length < 5
              ) {
                setSelected((prevSelected) => [
                  ...prevSelected,
                  newValue.skillName,
                ]);
              }
              setSearch('');
            }}
          />
        </Box>
        <Divider className="before:bg-slate-500 after:bg-slate-500">
          <Typography>OR</Typography>
        </Divider>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ bgcolor: '#FFFFFF', boxShadow: 3, p: 2 }}>
              <Typography className="font-bold">Select a category</Typography>
              <Divider className="bg-slate-500" sx={{ my: 1 }} />
              <List
                sx={{
                  maxHeight: 550,
                  overflow: 'auto',
                }}
              >
                {category.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        wordBreak: 'break-word',
                      }}
                      disablePadding
                    >
                      <ListItemButton
                        onClick={() => handleShowSkillByCategory(item.id)}
                      >
                        <ListItemText
                          primary={item.categoryName}
                          sx={{
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1,
                          }}
                        />
                        <ListItemIcon>
                          <NavigateNextIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ bgcolor: '#FFFFFF', boxShadow: 3, p: 2 }}>
              <Typography className="font-bold">Select skills</Typography>
              <Divider className="bg-slate-500" sx={{ my: 1 }} />
              <List
                sx={{
                  height: 550,
                  maxHeight: 550,
                  overflow: 'auto',
                }}
              >
                {listSkill.length > 0 ? (
                  listSkill.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          wordBreak: 'break-word',
                        }}
                        disablePadding
                      >
                        <ListItemButton
                          className={
                            selected.includes(item.skillName)
                              ? 'bg-slate-200'
                              : ''
                          }
                          onClick={() => handleToggleSkill(item.skillName)}
                          disabled={selected.length >= 5}
                        >
                          <ListItemText
                            primary={item.skillName}
                            sx={{
                              whiteSpace: 'normal',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              flex: 1,
                            }}
                          />
                          <ListItemIcon>
                            {selected.includes(item.skillName) ? (
                              <CheckIcon fontSize="small" color="success" />
                            ) : (
                              <AddIcon fontSize="small" />
                            )}
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))
                ) : (
                  <Typography>
                    Select a category to start adding skills to your profile.
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2 }}>
              <Typography className="font-bold">
                {selected.length} out of 5 skills selected
              </Typography>
              <Divider className="bg-slate-500" sx={{ my: 1 }} />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  height: 100,
                  maxHeight: 550,
                  flexWrap: 'wrap',
                }}
              >
                {selected.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    variant="outlined"
                    onDelete={() => handleDelete(item)}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateSkillModal;
