import { Box, Button, Checkbox, FormControlLabel, InputAdornment, MenuItem, OutlinedInput, Pagination, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectApi from '../../../services/projectApi';
import ShowList from '../../Recruiter/ListProjectRecruiter/ShowList';
import categoryApi from '../../../services/categoryApi';
import FilterListIcon from '@mui/icons-material/FilterList';
const Filter = () => {
  const { idCate } = useParams()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const [listProject, setListProject] = useState(null)
  const [listCategory, setListCategory] = useState([])
  const [categoryId, setCategoryId] = useState(idCate)
  const [listSkill, setListSkill] = useState([])
  const [listSkillSelected, setListSkillSelected] = useState([])
  const [duration, setDuration] = useState(0)
  const [minBudget, setMinBudget] = useState(0)
  const [maxBudget, setMaxBudget] = useState(100)

  useEffect(() => {
    const getData = async () => {
      let data = {
        pageIndex: page,
        pageSize: 5,
        categoryId: idCate,
      }
      let res = await projectApi.filterProject(data);
      setListProject(res)
      setTotalPage(Math.ceil(res?.totalItemsCount / 5));

    }
    getData()
  }, [idCate,page])

  useEffect(() => {
    const getData = async () => {
      let res = await categoryApi.GetAllCategory();
      setListCategory(res)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      let res = await categoryApi.GetByCategoryId(categoryId);
      setListSkill(res?.items)
    }
    getData()
  }, [categoryId])

  const handleSelect = (item) => {
    if (listSkillSelected.includes(item.id)) {
      setListSkillSelected(listSkillSelected.filter(id => id !== item.id));
    } else {
      setListSkillSelected([...listSkillSelected, item.id]);
    }
  };

  const handleChangeCategory = (id) => {
    setListSkillSelected([])
    setCategoryId(id)
  }
  const hanldeFilter = async () => {
    let data = {
      pageIndex: 1,
      pageSize: 20,
      categoryId: categoryId,
      skillIds: listSkillSelected,
      minBudget: minBudget,
      maxBudget: maxBudget,
      duration: duration
    }
    let res = await projectApi.filterProject(data);
    setListProject(res)
  }
  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
    <Box display='flex' mt={3} ml={3}>
      <Box flex='3' >
        <ShowList listProject={listProject} />
        <Box mt={2} display='flex' justifyContent='center' alignItems='center'>
            <Pagination
              count={totalPage}
              defaultPage={page}
              onChange={handlePageChange}
              color="primary" />
          </Box>
      </Box>
      <Box flex='1' ml={3} mr={3}>
          <Box bgcolor='#F8F8FF' borderRadius='5px' p={3}>
            <Typography variant="h6" fontWeight='bold' display='flex' alignItems='center' gutterBottom>
              <FilterListIcon /> Filters
            </Typography>

            <Typography variant="subtitle1" fontWeight='bold' gutterBottom>Category</Typography>
            <Select
              fullWidth
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              value={categoryId}
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              <MenuItem value={0}>Tất cả</MenuItem>

              {listCategory?.length !== 0 && listCategory.map((item, index) => (
                <MenuItem key={index} value={item?.id}>{item?.categoryName}</MenuItem>
              ))}
            </Select>

            {listSkill && listSkill?.length !== 0 && (
              <>
                <Typography variant="subtitle1" fontWeight='bold' gutterBottom>List Skill</Typography>
                {listSkill.map((item) => (
                  <Box key={item.id} mb={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={listSkillSelected.includes(item.id)}
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

            <Typography variant="subtitle1" fontWeight='bold' gutterBottom>Duration</Typography>

            <OutlinedInput
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              endAdornment={<InputAdornment position="end">ngày</InputAdornment>}
              fullWidth
              inputProps={{
                'aria-label': 'ngày',
              }}
            />
            <Typography variant="subtitle1" fontWeight='bold' gutterBottom>Budget Min</Typography>

            <OutlinedInput
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              endAdornment={<InputAdornment position="end">VND</InputAdornment>}
              fullWidth
              inputProps={{
                'aria-label': 'Min Budget',
              }}
            />
            <Typography variant="subtitle1" fontWeight='bold' gutterBottom>Budget Max</Typography>
            <OutlinedInput
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              endAdornment={<InputAdornment position="end">VND</InputAdornment>}
              fullWidth
              inputProps={{
                'aria-label': 'Max Budget',
              }}
            />
            <Button variant='contained' color='primary' onClick={() => hanldeFilter()}>
              Filter
            </Button>
          </Box>
        </Box>
    </Box >
  )
}

export default Filter
