import moment from 'moment';

export const formatDate = (dateString) => {
    return moment(dateString).format('MM/DD/YYYY hh:mm:ss A');
};