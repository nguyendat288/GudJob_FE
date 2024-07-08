import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectApi from '../../../services/projectApi';
import ShowList from '../../Recruiter/ListProjectRecruiter/ShowList';
import categoryApi from '../../../services/categoryApi';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import FilterListIcon from '@mui/icons-material/FilterList';

const Search = () => {
  const { searchKey } = useParams()
  const [listProject, setListProject] = useState(null)
  const [listCategory, setListCategory] = useState([])
  const [categoryId, setCategoryId] = useState()
  const [listSkill, setListSkill] = useState([])
  const [listSkillSelected, setListSkillSelected] = useState([])
  const [duration, setDuration] = useState(0)
  const [minBudget, setMinBudget] = useState(0)
  const [maxBudget, setMaxBudget] = useState(100)

  useEffect(() => {
    const getData = async () => {
      let res = await projectApi.SearchProjectByName(searchKey, 1, 10);
      setListProject(res)
    }
    getData()
  }, [searchKey])

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
      keyword: searchKey,
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

  return (
    <>
      <Box m={2}>
        <Header title="DANH SÁCH DỰ ÁN" subtitle={`Kết quả cho tìm kiếm "${searchKey}"`} />
      </Box>

      <Box display='flex' mt={3} ml={3}>
        <Box flex='3' >
          <ShowList listProject={listProject} />
        </Box>
        <Box flex='1' ml={3} mr={3}>
        <Box bgcolor='#F8F8FF' borderRadius='5px' p={3}>
            <Typography fontWeight='bold'><FilterListIcon /> Filters </Typography>
            <Typography fontWeight='bold'> Category </Typography>
            <Select
              fullWidth
              sx={{
                bgcolor: '#FFFFFF'
              }}
              value={categoryId}
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              {listCategory?.length !== 0 && listCategory.map((item, index) => (
                <MenuItem value={item?.id}>{item?.categoryName}</MenuItem>
              ))}
            </Select>
            {listSkill !== undefined && (<>
              <Typography fontWeight='bold'> List Skill </Typography>
              {listSkill?.map(item => (
                <Box key={item.id}>
                  <label>
                    <input
                      marginLeft='10px'
                      type="checkbox"
                      checked={listSkillSelected.includes(item.id)}
                      onChange={() => handleSelect(item)}
                    />
                    {item.skillName}
                  </label>
                </Box>
              ))}
            </>)}
            <Typography fontWeight='bold'> Duration </Typography>
            <TextField
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Typography fontWeight='bold'> Budget Min </Typography>
            <TextField
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
            />
            <Typography fontWeight='bold'> Budget Max </Typography>
            <TextField
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />
            <Button variant='contained' onClick={() => hanldeFilter()}>Filter</Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default Search
