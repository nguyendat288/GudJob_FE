import React, { useEffect, useState } from 'react';
import userManagementApi from '../../../services/adminApi/userManagementApi';
import UserList from '../component/userList';
import ConfirmationModal from '../component/confirmationModal';
import { toast } from 'react-toastify';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [searchName, setSearchName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userManagementApi.getAllUsers({
          page: page + 1,
          pageSize: pageSize,
          role: role === 'All' ? "" : role,
          search: searchName,
          email: email,
          phone: phone,
        });
        setUsers(response.items);
        setTotalUsers(response.totalItemsCount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, pageSize, searchName, email, phone, role, reloadUsers]);

  const handleLockUser = async (userId) => {
    try {
      await userManagementApi.lockUser([userId]);
      setReloadUsers(prev => !prev);
      toast.success('User locked successfully');
    } catch (error) {
      toast.error('Unable to lock user');
      console.error('Error locking user', error);
    }
  };

  const handleUnlockUser = async (userId) => {
    try {
      await userManagementApi.unlockUser([userId]);
      setReloadUsers(prev => !prev);
      toast.success('User unlocked successfully');
    } catch (error) {
      toast.error('Unable to unlock user');
      console.error('Error unlocking user', error);
    }
  };

  const handleOpenModal = (user, action) => {
    setSelectedUser(user);
    setModalAction(action);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const handleConfirmAction = () => {
    if (selectedUser) {
      if (modalAction === 'lock') {
        handleLockUser(selectedUser.id);
      } else if (modalAction === 'unlock') {
        handleUnlockUser(selectedUser.id);
      }
    }
    setOpenModal(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <UserList
        users={users}
        onOpenModal={handleOpenModal}
        pageSize={pageSize}
        page={page}
        pageChange={handlePageChange}
        pageSizeChange={setPageSize}
        loading={loading}
        reloadUsers={setReloadUsers}
        totalUsers={totalUsers}
        setLoading={setLoading}
        role={role}
        setRole={setRole}
        setSearchName={setSearchName}
        setEmail={setEmail}
        setPhone={setPhone}
      />
      <ConfirmationModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title={`Confirm ${modalAction === 'lock' ? 'Lock' : 'Unlock'} User`}
        description={`Are you sure you want to ${modalAction} this user?`}
      />
    </div>
  );
};

export default ListUsers;
