import React, { useEffect, useState } from 'react';
import skillApi from '../../../services/skillAPI';
import SkillList from '../component/skillList';
import AddSkill from '../component/addSkillModal';
import { Alert, Box, Modal, Snackbar } from '@mui/material';
import categoryApi from '../../../services/categoryApi';

const ListSkill = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [totalSkill, setTotalSkill] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [skillName, setSkillName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [reloadSkill, setReloadSkill] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const getAllSkill = async () => {
      setLoading(true);
      try {
        const response = await skillApi.GetSkillPagination({
          page: page + 1,
          pageSize: pageSize,
          SkillName: skillName,
          CategoryId: categoryId,
        });
        const resCategory = await categoryApi.GetAllCategory();
        setSkillList(response.items);
        setTotalSkill(response.totalItemsCount);
        setCategoryList(resCategory);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllSkill();
  }, [page, pageSize, skillName, categoryId, reloadSkill]);

  const handleOpenAddEditModal = () => {
    setOpenAddEditModal(true);
  };

  const handleCloseAddEditModal = () => {
    setOpenAddEditModal(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <SkillList
        categoryList={categoryList}
        skillList={skillList}
        totalSkill={totalSkill}
        pageSize={pageSize}
        page={page}
        pageChange={handlePageChange}
        pageSizeChange={setPageSize}
        loading={loading}
        setCategoryId={setCategoryId}
        setSkillName={setSkillName}
        setReloadSkill={setReloadSkill}
        setSkillList={setSkillList}
        onOpenModal={handleOpenAddEditModal}
      />
      <Modal open={openAddEditModal} onClose={handleCloseAddEditModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddSkill
            onClose={handleCloseAddEditModal}
            categoryList={categoryList}
            setReloadSkill={setReloadSkill}
            setSnackbar={setSnackbar}
          />
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ListSkill;
