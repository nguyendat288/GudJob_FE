import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FilledInput,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../services/categoryApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import projectApi from '../../../services/projectApi';
import { useNavigate } from 'react-router-dom';
import 'ckeditor5/ckeditor5.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import LoadingComponent from '../../../components/LoadingComponent';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [helperTextName, setHelperTextName] = useState('');

  const [description, setDescription] = useState('');
  const [helperTextDescription, setHelperTextDescription] = useState('');

  const [listCategory, setListCategory] = useState([]);

  const [category, setCategory] = useState('');
  const [errorCategory, setErrorCategory] = useState(false);
  const [helperTextCategory, setHelperTextCategory] = useState('');

  const [budgetMin, setBudgetMin] = useState(0);
  const [errorBudgetMin, setErrorBudgetMin] = useState(false);
  const [helperTextBudgetMin, setHelperTextBudgetMin] = useState('');

  const [budgetMax, setBudgetMax] = useState(0);
  const [errorBudgetMax, setErrorBudgetMax] = useState(false);
  const [helperTextBudgetMax, setHelperTextBudgetMax] = useState('');

  const [duration, setDuration] = useState(0);

  const [errorDuration, setErrorDuration] = useState(false);
  const [helperTextDuration, setHelperTextDuration] = useState('');

  const [listSkill, setListSkill] = useState([]);
  const [listSkillSelected, setListSkillSelected] = useState([]);
  const [errorListSkillSelected, setErrorListSkillSelected] = useState(false);
  const [helperTextListSkillSelected, setHelperTextListSkillSelected] =
    useState('');

  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryApi.GetAllCategory();
      setListCategory(res);
    };
    getCategory();
  }, []);

  useEffect(() => {
    setListSkillSelected([]);
    if (category !== '') {
      const getSkill = async () => {
        const res = await categoryApi.GetByCategoryId(category);
        setListSkill(res?.items);
      };
      getSkill();
    }
  }, [category]);

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleSubmit = async () => {
    let hasError = false;
    if (name.length <= 10 || name.length >= 100) {
      setErrorName(true);
      setHelperTextName('* Tiêu đề từ 10 - 100 ký tự .');
      hasError = true;
    } else {
      setErrorName(false);
      setHelperTextName('');
    }

    if (description.length <= 50 || description.length >= 2000) {
      setHelperTextDescription('* Mô tả từ 50 - 2000 ký tự .');
      hasError = true;
    } else {
      setHelperTextDescription('');
    }

    if (category === '') {
      setErrorCategory(true);
      setHelperTextCategory('* Hãy chọn chuyên ngành cho dự án .');
      hasError = true;
    } else {
      setErrorCategory(false);
      setHelperTextCategory('');
    }

    if (budgetMin <= 0 || budgetMin === '') {
      setErrorBudgetMin(true);
      setHelperTextBudgetMin('* Không được để trống .');
      hasError = true;
    } else {
      setErrorBudgetMin(false);
      setHelperTextBudgetMin('');
    }

    if (budgetMax <= 0 || budgetMax === '' || budgetMax <= budgetMin) {
      setErrorBudgetMax(true);
      setHelperTextBudgetMax('* Phải lớn hơn ngân sách tối thiểu .');
      hasError = true;
    } else {
      setErrorBudgetMax(false);
      setHelperTextBudgetMax('');
    }

    if (
      listSkillSelected.length === 0 ||
      listSkillSelected === null ||
      listSkillSelected.length > 5
    ) {
      setErrorListSkillSelected(true);
      setHelperTextListSkillSelected('* Chọn tối đa 5 kỹ thuật .');
      hasError = true;
    } else {
      setErrorListSkillSelected(false);
      setHelperTextListSkillSelected('');
    }

    if (duration <= 0 || duration === '') {
      setErrorDuration(true);
      setHelperTextDuration('* Không được để trống .');
      hasError = true;
    } else {
      setErrorDuration(false);
      setHelperTextDuration('');
    }

    if (hasError === true) {
      return;
    }

    try {
      setLoading(true);
      let data = {
        title: name,
        description: description,
        minBudget: budgetMin,
        maxBudget: budgetMax,
        categoryId: category,
        duration: duration,
        createdBy: currentUser?.userId,
        skill: listSkillSelected,
      };
      await projectApi.AddProject(data, navigate);
      setLoading(false);
    } catch (err) {
      toast.error('Tạo dự án thất bại . ');
    }
  };

  return (
    <Box sx={style}>
      {loading && <LoadingComponent loading={loading} />}

      <Paper sx={{ bgcolor: '#F8F8FF' }}>
        <Box m={3} p={5}>
          <Box textAlign="center" mb={3}>
            <TypographyHeader title="Tạo dự án " />
          </Box>
          <Divider />
          <Box mt={2}>
            <TypographyTitle title="Tên dự án" marginT={3} />
            <Box mt={2}>
              <TextField
                fullWidth
                placeholder="Nhập tên dự án ..."
                value={name}
                error={errorName}
                helperText={helperTextName}
                sx={{
                  bgcolor: '#FFFFFF',
                }}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </Box>
          <Box mt={2}>
            <TypographyTitle title="Mô tả dự án" />
            <Box mt={2}>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleDescriptionChange}
              />
              <Typography color="red">{helperTextDescription}</Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <TypographyTitle title="Dự án của bạn thuộc ngành nào ? " />
            <Box mt={2}>
              <Select
                fullWidth
                sx={{
                  bgcolor: '#FFFFFF',
                }}
                error={errorCategory}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {listCategory?.length !== 0 &&
                  listCategory.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.categoryName}
                    </MenuItem>
                  ))}
              </Select>
              <Typography color="red">{helperTextCategory}</Typography>
            </Box>
          </Box>

          <Box mt={3}>
            <TypographyTitle title="Dự án của bạn yêu cầu những kỹ năng gì ?" />
            <Typography mt={2} fontSize="15px">
              {' '}
              Nhập tối đa 5 kỹ năng mô tả đúng nhất dự án của bạn.{' '}
            </Typography>
            <Typography mt={2} fontSize="15px">
              {' '}
              Những người làm nghề tự do sẽ sử dụng những kỹ năng này để tìm ra
              những dự án mà họ quan tâm và có kinh nghiệm nhất.{' '}
            </Typography>
            <Box mt={2}>
              <Autocomplete
                sx={{
                  bgcolor: '#FFFFFF',
                }}
                multiple
                options={listSkill}
                getOptionLabel={(option) => option?.skillName}
                filterSelectedOptions
                onChange={(event, value) =>
                  setListSkillSelected(value.map((item) => item?.skillName))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errorListSkillSelected}
                    helperText={helperTextListSkillSelected}
                    placeholder="Skill"
                  />
                )}
              />
            </Box>
          </Box>

          <Box mt={2}>
            <TypographyTitle title="Ngân sách bạn có thể cung cấp trong dự án này ?" />
            <Typography mt={3} fontSize="15px">
              Nhập ngân sách bạn có thể đủ khả năng cho dự án này.{' '}
            </Typography>
            <Box mt={2} display="flex">
              <Box>
                <TypographyTitle title="Ngân sách tối thiểu " />

                <FilledInput
                  sx={{
                    bgcolor: '#FFFFFF',
                  }}
                  value={budgetMin}
                  type="number"
                  id="filled-adornment-weight"
                  error={errorBudgetMin}
                  endAdornment={
                    <InputAdornment position="end">VND</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  onChange={(e) => setBudgetMin(parseInt(e.target.value, 10))}
                />
                <Typography color="red">{helperTextBudgetMin}</Typography>
              </Box>
              <Box ml={3}>
                <TypographyTitle title="Ngân sách tối đa " />
                <FilledInput
                  sx={{
                    bgcolor: '#FFFFFF',
                  }}
                  type="number"
                  value={budgetMax}
                  error={errorBudgetMax}
                  id="filled-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">VND</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  onChange={(e) => setBudgetMax(parseInt(e.target.value, 10))}
                />
                <Typography color="red">{helperTextBudgetMax}</Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography mt={3} fontSize="20px" fontWeight="bold">
              {' '}
              Thời gian mong muốn có thể hoàn thành dự án ?{' '}
            </Typography>
            <Typography mt={3} fontSize="15px">
              Thời gian bạn muốn freelancer hoàn thành dự án .{' '}
            </Typography>
            <Box mt={2}>
              <FilledInput
                sx={{
                  bgcolor: '#FFFFFF',
                }}
                type="number"
                value={duration}
                id="filled-adornment-weight"
                error={errorDuration}
                endAdornment={
                  <InputAdornment position="end">ngày</InputAdornment>
                }
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                onChange={(e) => setDuration(e.target.value)}
              />
              <Typography color="red">{helperTextDuration}</Typography>
            </Box>
          </Box>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={(e) => handleSubmit()}>
              {' '}
              Tạo dự án{' '}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateProject;
const style = {
  p: 4,
  overflow: 'auto',
  maxHeight: window.innerHeight - 80,
};
