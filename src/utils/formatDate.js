import moment from 'moment';

export const formatDate = (dateString) => {
  return moment(dateString).format('MM/DD/YYYY hh:mm:ss A');
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = (date.getHours() + 7) % 24;
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};

export const formatDateReport = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
