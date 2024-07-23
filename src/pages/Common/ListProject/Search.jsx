import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectApi from '../../../services/projectApi';
import ShowList from '../../Recruiter/ListProjectRecruiter/ShowList';
import categoryApi from '../../../services/categoryApi';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import FilterListIcon from '@mui/icons-material/FilterList';
import LoadingComponent from '../../../components/LoadingComponent';

const Search = () => {
  const { searchKey } = useParams();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [listProject, setListProject] = useState(null);

  const [listCategory, setListCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [listSkill, setListSkill] = useState([]);
  const [listSkillSelected, setListSkillSelected] = useState([]);
  const [duration, setDuration] = useState(0);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let params = {
        Keyword: searchKey === '' ? null : searchKey,
        PageIndex: page,
        PageSize: 5,
        CategoryId: categoryId === 0 ? null : categoryId,
        MinBudget: minBudget === 0 ? null : minBudget,
        MaxBudget: maxBudget === 0 ? null : maxBudget,
        Duration: duration === 0 ? null : duration,
      };
      setLoading(true);
      const res = await projectApi.SearchHomePage(params, listSkillSelected);
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 5));
      setLoading(false);
    };
    getData();
  }, [searchKey, page]);

  useEffect(() => {
    const getData = async () => {
      let res = await categoryApi.GetAllCategory();
      setListCategory(res);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      let res = await categoryApi.GetByCategoryId(categoryId);
      setListSkill(res?.items);
    };
    getData();
  }, [categoryId]);

  const handleSelect = (item) => {
    if (listSkillSelected.includes(item.skillName)) {
      setListSkillSelected(
        listSkillSelected.filter((skillName) => skillName !== item.skillName)
      );
    } else {
      setListSkillSelected([...listSkillSelected, item.skillName]);
    }
  };

  const handleChangeCategory = (id) => {
    setListSkillSelected([]);
    setCategoryId(id);
  };

  const hanldeFilter = async () => {
    let params = {
      Keyword: searchKey === '' ? null : searchKey,
      PageIndex: 1,
      PageSize: 5,
      CategoryId: categoryId === 0 ? null : categoryId,
      MinBudget: minBudget === 0 ? null : minBudget,
      MaxBudget: maxBudget === 0 ? null : maxBudget,
      Duration: duration === 0 ? null : duration,
    };
    setLoading(true);
    const res = await projectApi.SearchHomePage(params, listSkillSelected);
    setPage(1);
    setListProject(res);
    setTotalPage(Math.ceil(res?.totalItemsCount / 5));
    setLoading(false);
  };

  return (
    <>
      <Box m={2}>
        {loading && <LoadingComponent loading={loading} />}

        {searchKey === undefined && (
          <>
            <Header title="DANH SÁCH DỰ ÁN" />
          </>
        )}
        {searchKey !== undefined && (
          <>
            <Header
              title="DANH SÁCH DỰ ÁN"
              subtitle={`Kết quả cho tìm kiếm "${searchKey}"`}
            />
          </>
        )}
      </Box>

      <Box display="flex" mt={3} ml={3}>
        <Box flex="3">
          <ShowList listProject={listProject} />
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Pagination
              count={totalPage}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Box>
        <Box flex="1" ml={3} mr={3}>
          <Box bgcolor="#F8F8FF" borderRadius="5px" p={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gutterBottom
            >
              <FilterListIcon /> Bộ lọc
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Chuyên ngành
            </Typography>
            <Select
              fullWidth
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              value={categoryId ? categoryId : 0}
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              <MenuItem value={0}>Tất cả</MenuItem>

              {listCategory &&
                listCategory.length > 0 &&
                listCategory
                  .filter((item) => item.id !== 4)
                  .map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
            </Select>

            {listSkill && listSkill?.length !== 0 && (
              <>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Danh sách kỹ năng
                </Typography>
                {listSkill.map((item) => (
                  <Box key={item.id} mb={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={listSkillSelected.includes(item.skillName)}
                          onChange={() => handleSelect(item)}
                          color="primary"
                        />
                      }
                      label={item.skillName}
                    />
                  </Box>
                ))}
              </>
            )}

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Thời gian
            </Typography>

            <OutlinedInput
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              endAdornment={
                <InputAdornment position="end">ngày</InputAdornment>
              }
              fullWidth
              inputProps={{
                'aria-label': 'ngày',
              }}
            />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Ngân sách tối thiểu{' '}
            </Typography>

            <OutlinedInput
              type="number"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              endAdornment={<InputAdornment position="end">VND</InputAdornment>}
              fullWidth
              inputProps={{
                'aria-label': 'Min Budget',
              }}
            />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Ngân sách tối đa
            </Typography>
            <OutlinedInput
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              endAdornment={<InputAdornment position="end">VND</InputAdornment>}
              fullWidth
              inputProps={{
                'aria-label': 'Max Budget',
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => hanldeFilter()}
            >
              Lọc
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Search;
