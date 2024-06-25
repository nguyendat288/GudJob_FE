import React, { useEffect, useState } from 'react';
import userManagementApi from '../../../services/adminApi/userManagementApi';
import UserList from '../component/userList';
import ConfirmationModal from '../component/confirmationModal';
import { toast } from 'react-toastify';

const ListUsers = () => {
  const [users, setUsers] = useState();
  const [reloadUsers, setReloadUsers] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userManagementApi.getAllUsers();
        console.log(allUsers);
        setUsers(prevUsers => {
          if (JSON.stringify(prevUsers) !== JSON.stringify(allUsers)) {
            return allUsers;
          }
          return prevUsers;
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [reloadUsers]);

  const handleLockUser = async (userId) => {
    try {
      const response = await userManagementApi.lockUser(userId);
      setReloadUsers(prev => !prev);
      toast.success('Đã khóa người dùng');
      console.log('User locked successfully', response);
    } catch (error) {
      toast.error('Không thể khóa người dùng');
      console.error('Error locking user', error);
    }
  };

  const handleUnlockUser = async (userId) => {
    try {
      const response = await userManagementApi.unlockUser(userId);
      setReloadUsers(prev => !prev);
      toast.success('Đã mở khóa người dùng')
      console.log('User unlocked successfully', response);
    } catch (error) {
      toast.error('Không thể mở khóa người dùng');
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

  return (
    <div>
      <UserList
        users={users}
        onOpenModal={handleOpenModal}
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
