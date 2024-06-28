import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Avatar, Typography, Tooltip, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import userManagementApi from '../../../services/adminApi/userManagementApi';
import { toast } from 'react-toastify';

const UserList = ({ users, onOpenModal, pageSizeChange, pageSize, page, pageChange, loading, reloadUsers, totalUsers }) => {
  const apiRef = useGridApiRef();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
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
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => <Avatar src={params.value} alt={params.row.name} />
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>{params.value ? params.value : 'No information'}</Typography>
        </Box>
      ),
    },
    {
      field: 'isLock',
      headerName: 'Trạng thái tài khoản',
      width: 220,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>{params.row.isLock ? 'Đã khóa' : 'Đang hoạt động'}</Typography>
        </Box>
      ),
    },
    {
      field: 'isCompany',
      headerName: 'Vai trò',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>{params.row.isCompany ? 'Recruiter' : 'Freelancer'}</Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 200,
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

  return (
    <Box component="main" className="p-4">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>Quản Lý Người Dùng</Typography>
        {rowSelectionModel.length ? <Button onClick={handleClickOpen} variant="contained" startIcon={<LockIcon />}>
          Fast Lock/Unlock
        </Button> : <Typography></Typography>}
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
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
          pageSizeOptions={[5, 10, 15, 20, { value: 1000, label: 'Tất cả người dùng' }]}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          apiRef={apiRef}
          slotProps={{
            pagination: {
              labelRowsPerPage: "Số lượng người dùng trên 1 trang",
              labelDisplayedRows: ({ from, to }) => {
                const totalPages = Math.ceil(totalUsers / pageSize);
                return `${from.toLocaleString('en')}-${to.toLocaleString('en')} trên ${totalPages.toLocaleString('en')} trang`
              }
            }
          }}
          localeText={{
            footerRowSelected: (count) =>
              count !== 1
                ? `Đã chọn ${count.toLocaleString()} người dùng`
                : `Đã chọn ${count.toLocaleString()} người dùng`,
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
