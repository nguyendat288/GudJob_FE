import React, { useImperativeHandle, useRef, useState } from 'react';
import { Box, Typography, IconButton, Tooltip, MenuItem, FormControl, InputLabel, Select, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function StatusInputValue(props) {
    const { item, applyValue, focusElementRef } = props;

    const statusRef = useRef(null);
    useImperativeHandle(focusElementRef, () => ({
        focus: () => {
            statusRef.current.focus();
        },
    }));

    const handleFilterChange = (event) => {
        applyValue({ ...item, value: event.target.value });
    };

    return (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel shrink={true}>Value</InputLabel>
            <Select
                value={item.value || ''}
                onChange={handleFilterChange}
                label="Value"
                inputRef={statusRef}
            >
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="true">Đã xóa</MenuItem>
                <MenuItem value="false">Đang hoạt động</MenuItem>
            </Select>
        </FormControl>
    );
}

const statusOperators = [
    {
        label: 'Is',
        value: 'is',
        getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) {
                return null;
            }
            return (value) => {
                return String(value) === filterItem.value;
            };
        },
        InputComponent: StatusInputValue,
    },
    {
        label: 'Is not',
        value: 'is not',
        getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) {
                return null;
            }
            return (value) => {
                return String(value) !== filterItem.value;
            };
        },
        InputComponent: StatusInputValue,
    },
];

const CategoryList = ({ category, totalCategory, pageSize, page, pageChange, pageSizeChange, onOpenModal, onOpenDeleteModal, loading, setReloadCategory }) => {
    const columns = [
        { field: 'id', headerName: 'ID', sortable: false, width: 100, flex: 0 },
        {
            field: 'image',
            headerName: 'Image',
            width: 100,
            flex: 0,
            filterable: false,
            sortable: false,
            renderCell: (params) => <Avatar src={params.value} alt={params.row.name} />
        },
        {
            field: 'categoryName',
            headerName: 'Category name',
            sortable: false,
            width: 200,
            flex: 1,
        },
        {
            field: 'totalProjects',
            headerName: 'Total projects',
            filterable: false,
            width: 300,
            flex: 1,
        },
        {
            field: 'isDeleted',
            headerName: 'Status',
            width: 150,
            flex: 1,
            sortable: false,
            filterOperators: statusOperators,
            renderCell: (params) => (
                params.value ? (
                    <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
                        <Typography>Đã xóa </Typography>
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
                        <Typography>Đang hoạt động </Typography>
                    </Box>
                )
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" width="100%">
                    <Tooltip title="Edit Category">
                        <span>
                            <IconButton onClick={() => onOpenModal(params.row, true)}>
                                <EditIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    {
                        params.row.isDeleted === false ?
                            <Tooltip title="Delete Category">
                                <span>
                                    <IconButton onClick={() => onOpenDeleteModal(params.row, false)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip> :
                            <Tooltip title="Restore Category">
                                <span>
                                    <IconButton onClick={() => onOpenDeleteModal(params.row, true)}>
                                        <RestoreIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                    }
                </Box>
            )
        }
    ];

    const [paginationModel, setPaginationModel] = useState({
        page: page,
        pageSize: pageSize,
    });
    
    return (
        <Box component="main" className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>Category List</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => onOpenModal(null, false)}>
                    Add Category
                </Button>
            </Box>
            <Box height={400} width="100%">
                <DataGrid
                    rows={category}
                    columns={columns}
                    rowCount={totalCategory}
                    paginationModel={paginationModel}
                    onPaginationModelChange={(newModel) => {
                        setPaginationModel(newModel);
                        pageChange(newModel.page);
                        pageSizeChange(newModel.pageSize);
                    }}
                    paginationMode="server"
                    keepNonExistentRowsSelected
                    disableRowSelectionOnClick
                    loading={loading}
                    pageSizeOptions={[5, 10, 15, 20]}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    slotProps={{
                        pagination: {
                            labelRowsPerPage: "Số lượng danh mục trên 1 trang",
                            labelDisplayedRows: ({ from, to, count }) => {
                                return `${from.toLocaleString('en')}-${to.toLocaleString('en')} trên ${count.toLocaleString('en')} danh mục`
                            }
                        },
                        toolbar: {
                            printOptions: { disableToolbarButton: true },
                            csvOptions: { disableToolbarButton: true },
                        }
                    }}
                    localeText={{
                        footerRowSelected: (count) =>
                            count !== 1
                                ? `Đã chọn ${count.toLocaleString()} danh mục`
                                : `Đã chọn ${count.toLocaleString()} danh mục`,
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f5f5f5',
                            borderBottom: '1px solid #ddd',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #ddd',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#f5f5f5',
                            borderTop: '1px solid #ddd',
                        },
                        '& .MuiDataGrid-row': {
                            '&:nth-of-type(even)': {
                                backgroundColor: '#f9f9f9',
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default CategoryList;