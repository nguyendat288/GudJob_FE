import React, { useImperativeHandle, useRef, useState } from 'react';
import { Box, Typography, IconButton, Tooltip, TextField, InputAdornment, Button, Menu, MenuItem, FormControl, InputLabel, Select, Popover } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
      <Box sx={{ mt: 2 }}>No reports</Box>
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
      <Box sx={{ mt: 2 }}>No reports found.</Box>
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
        <MenuItem value="true">Đã duyệt</MenuItem>
        <MenuItem value="false">Chờ duyệt</MenuItem>
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

const ReportList = ({ reports, totalReports, pageSize, page, pageChange, pageSizeChange, typeDes, setTypeDes, onOpenModal, loading, setLoading }) => {
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPop, setAnchorElPop] = useState(null);
  const [popoverContent, setPopoverContent] = useState('');

  const handlePopoverOpen = (event, content) => {
    setAnchorElPop(event.currentTarget);
    setPopoverContent(content);
  };

  const handlePopoverClose = () => {
    setAnchorElPop(null);
    setPopoverContent('');
  };

  const open = Boolean(anchorElPop);

  const columns = [
    { field: 'nameCreatedBy', headerName: 'Created By', sortable: false, width: 150, flex: 1 },
    {
      field: 'reportInformation',
      headerName: 'Report Information',
      width: 200,
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const { reportToUrl, bidName, projectName } = params.row;
        return (
          <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
            <Typography>
              {reportToUrl ? `URL user: ${reportToUrl}` :
                bidName ? `Bid Name: ${bidName}` :
                  projectName ? `Project Name: ${projectName}` :
                    'No Information'}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'reportName',
      headerName: 'Reason',
      sortable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      filterable: false,
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={(event) => handlePopoverOpen(event, params.value)}
            onMouseLeave={handlePopoverClose}
          >
            {params.value}
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorElPop}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
          </Popover>
        </Box>
      )
    },
    {
      field: 'isApproved',
      headerName: 'Status',
      width: 150,
      flex: 1,
      sortable: false,
      filterOperators: statusOperators,
      renderCell: (params) => (
        params.value ? (
          <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
            <Typography>Đã Duyệt <CheckCircleOutlineIcon color='success' /></Typography>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
            <Typography>Chờ Duyệt <ErrorOutlineIcon color='warning' /></Typography>
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
        <Tooltip title="Đánh dấu là đã xử lý">
          <span>
            <IconButton onClick={() => onOpenModal(params.row.id)} disabled={params.row.isApproved === true}>
              <FactCheckIcon />
            </IconButton>
          </span>
        </Tooltip>
      )
    }
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: pageSize,
  });

  const handleRoleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelect = async (typeDes) => {
    setTypeDes(typeDes);
    setLoading(true);
    handleMenuClose();
  };

  return (
    <Box className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>Report List</Typography>
      </Box>
      <TextField
        label="Search reporter"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                aria-controls="type-menu"
                aria-haspopup="true"
                onClick={handleRoleButtonClick}
                endIcon={<ArrowDropDownIcon />}
              >
                {typeDes || 'Type'}
              </Button>
              <Menu
                id="type-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleTypeSelect('user')}>Report User</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('bid')}>Report Bid</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('project')}>Report Project</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('All')}>All</MenuItem>
              </Menu>
            </InputAdornment>
          ),
        }}
      />
      <Box height={400} width="100%">
        <DataGrid
          rows={reports}
          columns={columns}
          rowCount={totalReports}
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
          getRowHeight={() => 'auto'}
          slots={{
            toolbar: GridToolbar,
            noResultsOverlay: CustomNoResultsOverlay,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: "Số lượng report trên 1 trang",
              labelDisplayedRows: ({ from, to, count }) => {
                return `${from.toLocaleString('en')}-${to.toLocaleString('en')} trên ${count.toLocaleString('en')} report`
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
                ? `Đã chọn ${count.toLocaleString()} report`
                : `Đã chọn ${count.toLocaleString()} report`,
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

export default ReportList;