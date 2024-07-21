import React, { useEffect, useState } from 'react';
import projectApi from '../../../services/projectApi';
import ProjectList from '../component/projectList';
import { Box, Pagination } from '@mui/material';

const ListProject = () => {
  const [listProject, setListProject] = useState({});
  const [reload, setReload] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getData = async () => {
      let pageSize = 5;
      let res = await projectApi.GetAllProject(pageIndex, pageSize);
      setTotalPages(Math.ceil(res.totalItemsCount / pageSize));
      setListProject(res);
    };
    getData();
    setReload(false);
  }, [reload, pageIndex]);

  const handlePageChange = (event, value) => {
    setPageIndex(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <ProjectList listProject={listProject} setReload={setReload} />
      <Box p={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={pageIndex}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </div>
  );
};

export default ListProject;
