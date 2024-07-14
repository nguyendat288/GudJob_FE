import React, { useImperativeHandle, useRef, useState } from 'react';
import { Box, Typography, IconButton, Tooltip, MenuItem, FormControl, InputLabel, Select, Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const StyledGridOverlayNoRows = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
        fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751',
    },
    '& .no-rows-secondary': {
        fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126',
    },
}));

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-results-primary': {
        fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751',
    },
    '& .no-results-secondary': {
        fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126',
    },
}));

function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlayNoRows>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={96}
          viewBox="0 0 452 257"
          aria-hidden
          focusable="false"
        >
          <path
            className="no-rows-primary"
            d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
          />
          <path
            className="no-rows-primary"
            d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
          />
          <path
            className="no-rows-secondary"
            d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
          />
        </svg>
        <Box sx={{ mt: 2 }}>No categories</Box>
      </StyledGridOverlayNoRows>
    );
  }

function CustomNoResultsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={96}
                viewBox="0 0 523 299"
                aria-hidden
                focusable="false"
            >
                <path
                    className="no-results-primary"
                    d="M262 20c-63.513 0-115 51.487-115 115s51.487 115 115 115 115-51.487 115-115S325.513 20 262 20ZM127 135C127 60.442 187.442 0 262 0c74.558 0 135 60.442 135 135 0 74.558-60.442 135-135 135-74.558 0-135-60.442-135-135Z"
                />
                <path
                    className="no-results-primary"
                    d="M348.929 224.929c3.905-3.905 10.237-3.905 14.142 0l56.569 56.568c3.905 3.906 3.905 10.237 0 14.143-3.906 3.905-10.237 3.905-14.143 0l-56.568-56.569c-3.905-3.905-3.905-10.237 0-14.142ZM212.929 85.929c3.905-3.905 10.237-3.905 14.142 0l84.853 84.853c3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0l-84.853-84.853c-3.905-3.905-3.905-10.237 0-14.142Z"
                />
                <path
                    className="no-results-primary"
                    d="M212.929 185.071c-3.905-3.905-3.905-10.237 0-14.142l84.853-84.853c3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-84.853 84.853c-3.905 3.905-10.237 3.905-14.142 0Z"
                />
                <path
                    className="no-results-secondary"
                    d="M0 43c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 53 0 48.523 0 43ZM0 89c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 99 0 94.523 0 89ZM0 135c0-5.523 4.477-10 10-10h74c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 181c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 227c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM523 227c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10ZM523 181c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 135c0 5.523-4.477 10-10 10h-74c-5.523 0-10-4.477-10-10s4.477-10 10-10h74c5.523 0 10 4.477 10 10ZM523 89c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 43c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10Z"
                />
            </svg>
            <Box sx={{ mt: 2 }}>No categories found.</Box>
        </StyledGridOverlay>
    );
}

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
                <MenuItem value="true">Không hiển thị</MenuItem>
                <MenuItem value="false">Đang hiển thị</MenuItem>
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
        { field: 'id', headerName: 'ID', sortable: false, width: 100 },
        {
            field: 'image',
            headerName: 'Image',
            width: 100,
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
                        <Typography>Không hiển thị </Typography>
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
                        <Typography>Đang hiển thị </Typography>
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
        <Box className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
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
                    disableColumnResize={true}
                    slots={{
                        toolbar: GridToolbar,
                        noResultsOverlay: CustomNoResultsOverlay,
                        noRowsOverlay: CustomNoRowsOverlay,
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