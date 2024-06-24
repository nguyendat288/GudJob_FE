import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import userManagementApi from '../../../services/adminApi/userManagementApi';

function ListUsers() {
  const [users, setUsers] = useState();
  useEffect(() => {
    const allUsers = async () => {
      try {
        const allUsers = await userManagementApi.getAllUsers();
        console.log(allUsers);
        setUsers(prevUsers => {
          // Check if the new users list is different from the current one
          if (JSON.stringify(prevUsers) !== JSON.stringify(allUsers)) {
            return allUsers;
          }
          return prevUsers;
        });
      } catch (error) {
        console.error(error);
      }
    };
    allUsers();
  }, []);

  return (
    <Box component="main" className="p-4">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1 className="text-2xl font-semibold">Users</h1>
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
                  <IconButton color="warning">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="error">
                    <LockPersonIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListUsers;
