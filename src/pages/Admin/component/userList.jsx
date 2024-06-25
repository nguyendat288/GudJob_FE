import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UserList = ({ users, onOpenModal }) => {
  return (
    <Box component="main" className="p-4">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography sx={{fontSize: "1.5rem", fontWeight: "600"}}>Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.items?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber ? user.phoneNumber : <Typography>No information</Typography>}</TableCell>
                <TableCell align='center'>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  {user.isLock === true ? (
                    <IconButton onClick={() => onOpenModal(user, 'unlock')} color="success">
                      <LockOpenIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => onOpenModal(user, 'lock')} color="error">
                      <LockPersonIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserList;
