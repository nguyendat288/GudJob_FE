import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { Box, Button, IconButton, Avatar, Typography, Tooltip, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputAdornment, Menu, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataGrid, useGridApiRef, GridToolbar, getGridNumericOperators } from '@mui/x-data-grid';
import userManagementApi from '../../../services/adminApi/userManagementApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
          <MenuItem value="true">Unlock</MenuItem>
          <MenuItem value="null">Lock</MenuItem>
        </Select>
      </FormControl>
  );
}

const statusOperators = [
  {
    label: 'is',
    value: 'is',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      return (value) => {
        console.log("value", value);
        return String(value) === filterItem.value;
      };
    },
    InputComponent: StatusInputValue,
  },
  {
    label: 'is not',
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

const UserList = ({ users, onOpenModal, pageSizeChange, pageSize, page, pageChange, loading, reloadUsers, totalUsers, setLoading, role, setRole, setSearchName, setEmail, setPhone }) => {
  const apiRef = useGridApiRef();
  const { t } = useTranslation(['admin', 'common']);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState();

  const handleSearchBySelect = (selectedSearchBy) => {
    setSearchBy(selectedSearchBy);
    handleMenuClose();
  };

  const handleSearchButtonClick = (event) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleRoleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorElSearch(null);
  };

  const handleRoleSelect = async (role) => {
    setRole(role);
    setLoading(true);
    handleMenuClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: pageSize,
  });
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    setPaginationModel({ page: page, pageSize: pageSize });
  }, [page, pageSize]);

  const columns = [
    { field: 'id', headerName: 'ID', filterable: false, width: 90, flex: 0.5 },
    {
      field: 'avatar',
      headerName: t('avatar', { ns: 'admin' }),
      width: 100,
      flex: 1,
      filterable: false,
      renderCell: (params) => <Avatar src={params.value} alt={params.row.name} />
    },
    { field: 'name', headerName: t('name', { ns: 'admin' }), filterable: false, width: 150, flex: 1 },
    { field: 'email', headerName: 'Email', filterable: false, width: 200, flex: 1 },
    {
      field: 'phoneNumber',
      headerName: t('phone_number', { ns: 'common' }),
      filterable: false,
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>{params.value ? params.value : t('no_information', { ns: 'admin' })}</Typography>
        </Box>
      ),
    },
    {
      field: 'totalProject',
      headerName: 'Total project',
      filterOperators: getGridNumericOperators().filter(
        (operator) => operator.value !== 'isAnyOf' && operator.value !== '=' && operator.value !== '!=',
      ),
      width: 200,
      flex: 1
    },
    {
      field: 'totalBid',
      headerName: 'Total bid',
      filterOperators: getGridNumericOperators().filter(
        (operator) => operator.value !== 'isAnyOf' && operator.value !== '=' && operator.value !== '!=',
      ),
      width: 200,
      flex: 1
    },
    {
      field: 'isLock',
      headerName: t('status', { ns: 'common' }),
      width: 220,
      flex: 1,
      filterOperators: statusOperators,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>{params.row.isLock ? t('locked', { ns: 'admin' }) : t('active', { ns: 'admin' })}</Typography>
        </Box>
      ),
    },
    {
      field: 'isCompany',
      headerName: t('role', { ns: 'common' }),
      filterable: false,
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>{params.row.isCompany ? 'Recruiter' : 'Freelancer'}</Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('action', { ns: 'common' }),
      width: 200,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          {params.row.isLock ? (
            <Tooltip title="Unlock user">
              <IconButton onClick={() => onOpenModal(params.row, 'unlock')} color="success">
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Lock user">
              <IconButton onClick={() => onOpenModal(params.row, 'lock')} color="error">
                <LockPersonIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    }
  ];

  const getSelectedRowData = () => {
    return rowSelectionModel.map((id) => apiRef.current.getRow(id));
  };

  const handleBulkLockUser = async () => {
    const usersData = getSelectedRowData();
    const { lockedUsers, activeUsers } = usersData.reduce((acc, user) => {
      if (user.isLock) {
        acc.lockedUsers.push(user);
      } else {
        acc.activeUsers.push(user);
      }
      return acc;
    }, { lockedUsers: [], activeUsers: [] });

    const lockedUserIds = lockedUsers.map(user => user.id);
    const activeUserIds = activeUsers.map(user => user.id);

    try {
      await userManagementApi.lockUser(activeUserIds);
      await userManagementApi.unlockUser(lockedUserIds);
      reloadUsers(prev => !prev);
      toast.success('User locked/unlocked successfully');
    } catch (error) {
      toast.error('Unable to lock/unlock user');
      console.error('Error locking/unlocking user', error);
    }
    handleClose();
  }

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      switch (searchBy) {
        case 'Name':
          setEmail('');
          setPhone('');
          setSearchName(search);
          break;
        case 'Email':
          setSearchName('');
          setPhone('');
          setEmail(search);
          break;
        case 'Phone Number':
          setSearchName('');
          setEmail('');
          setPhone(search);
          break;
        default:
          setSearchName('');
          setEmail('');
          setPhone('');
          break;
      }
      setLoading(false);
    }
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    totalBid: false,
    totalProject: false,
  });

  return (
    <Box component="main" className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>{t("userList")}</Typography>
        {rowSelectionModel.length ? <Button onClick={handleClickOpen} variant="contained" startIcon={<LockIcon />}>
          {t('fast_lock_unlock')}
        </Button> : <Typography></Typography>}
      </Box>
      <TextField
        label={t('search', { ns: 'common' })}
        variant="outlined"
        value={search}
        disabled={searchBy ? false : true}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button
                aria-controls="search-by-menu"
                aria-haspopup="true"
                onClick={handleSearchButtonClick}
                endIcon={<ArrowDropDownIcon />}
              >
                {searchBy || 'Search By'}
              </Button>
              <Menu
                id="search-by-menu"
                anchorEl={anchorElSearch}
                open={Boolean(anchorElSearch)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleSearchBySelect('Name')}>Name</MenuItem>
                <MenuItem onClick={() => handleSearchBySelect('Email')}>Email</MenuItem>
                <MenuItem onClick={() => handleSearchBySelect('Phone Number')}>Phone Number</MenuItem>
              </Menu>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                aria-controls="role-menu"
                aria-haspopup="true"
                onClick={handleRoleButtonClick}
                endIcon={<ArrowDropDownIcon />}
              >
                {role || 'Role'}
              </Button>
              <Menu
                id="role-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleRoleSelect('Admin')}>Admin</MenuItem>
                <MenuItem onClick={() => handleRoleSelect('Freelancer')}>Freelancer</MenuItem>
                <MenuItem onClick={() => handleRoleSelect('Recruiter')}>Recruiter</MenuItem>
                <MenuItem onClick={() => handleRoleSelect('All')}>All</MenuItem>
              </Menu>
            </InputAdornment>
          ),
        }}
      />
      <Box height={400} width="100%">
        <DataGrid
          rows={users}
          columns={columns}
          rowCount={totalUsers}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            setPaginationModel(newModel);
            pageChange(newModel.page);
            pageSizeChange(newModel.pageSize);
          }}
          paginationMode="server"
          checkboxSelection
          keepNonExistentRowsSelected
          disableRowSelectionOnClick
          loading={loading}
          pageSizeOptions={[5, 10, 15, 20]}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          apiRef={apiRef}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            pagination: {
              labelRowsPerPage: t('rows_per_page'),
              labelDisplayedRows: ({ from, to }) => {
                const totalPages = Math.ceil(totalUsers / pageSize);
                return `${from.toLocaleString('en')}-${to.toLocaleString('en')} ${t('of_page')} ${totalPages.toLocaleString('en')} ${t('page')}`
              }
            },
            toolbar: {
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            }
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          localeText={{
            footerRowSelected: (count) =>
              count !== 1
                ? `${t('selected')} ${count.toLocaleString()} ${t('users')}`
                : `${t('selected')} ${count.toLocaleString()} ${t('user')}`,
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "1.875rem" }}>
          {"Xác nhận khóa/mở khóa toàn bộ người dùng đã chọn?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Chúng tôi không khuyến khích hành động khóa/mở khóa toàn bộ người dùng đã chọn.
            Điều này có thể dẫn đến các sai lầm và khó khăn trong việc chỉnh sửa về sau.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description-2" sx={{ mt: 3 }}>
            Bạn chắc chắn vẫn muốn thực hiện hành động này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleBulkLockUser} autoFocus>
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserList;
