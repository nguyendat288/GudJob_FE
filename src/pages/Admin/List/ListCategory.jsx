import React, { useEffect, useState } from 'react';
import categoryApi from '../../../services/categoryApi';
import { Box, Modal } from '@mui/material';
import CategoryList from '../component/categoryList';
import AddCategory from '../component/addCategoryModal';
import DeleteCategory from '../component/deleteCategoryModal';

const ListCategory = () => {
    const [category, setCategory] = useState([]);
    const [totalCategory, setTotalCategory] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [restored, setRestored] = useState(false);
    const [reloadCategory, setReloadCategory] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const allCategory = await categoryApi.GetAllCategoryWithPagination({
                    page: page + 1,
                    pageSize: pageSize,
                });
                setCategory(allCategory.items);
                setTotalCategory(allCategory.totalItemsCount);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [page, pageSize, reloadCategory]);

    const handleOpenAddEditModal = (category, editMode) => {
        setSelectedCategory(category);
        setIsEdit(editMode);
        setOpenAddEditModal(true);
    };

    const handleCloseAddEditModal = () => {
        setOpenAddEditModal(false);
        setSelectedCategory(null);
        setIsEdit(false);
    };

    const handleOpenDeleteModal = (category, deleteMode) => {
        setSelectedCategory(category);
        setRestored(deleteMode);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedCategory(null);
        setRestored(false);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <CategoryList
                category={category}
                totalCategory={totalCategory}
                pageSize={pageSize}
                page={page}
                pageChange={handlePageChange}
                pageSizeChange={setPageSize}
                onOpenModal={handleOpenAddEditModal}
                onOpenDeleteModal={handleOpenDeleteModal}
                loading={loading}
                setLoading={setLoading}
                setReloadCategory={setReloadCategory}
            />
            <Modal open={openAddEditModal} onClose={handleCloseAddEditModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <AddCategory
                        onClose={handleCloseAddEditModal}
                        category={selectedCategory}
                        isEdit={isEdit}
                        setReloadCategory={setReloadCategory}
                    />
                </Box>
            </Modal>
            <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <DeleteCategory
                        onClose={handleCloseDeleteModal}
                        category={selectedCategory}
                        restored={restored}
                        setReloadCategory={setReloadCategory}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default ListCategory;
