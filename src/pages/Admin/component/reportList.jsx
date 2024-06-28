import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Tooltip } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';

const ReportList = ({ reports, onOpenModal }) => {
    const {t} = useTranslation(['admin', 'common']);
    return (
        <Box component="main" className="p-4">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>{t('reportList')}</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('created_by')}</TableCell>
                            <TableCell>{t('report_information')}</TableCell>
                            <TableCell>{t('report_name')}</TableCell>
                            <TableCell>{t('description')}</TableCell>
                            <TableCell>{t('status', { ns : 'common' })}</TableCell>
                            <TableCell align='center'>{t('action', { ns : 'common' })}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports?.items?.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.nameCreatedBy}</TableCell>
                                <TableCell>{report.reportToUrl ? ("URL user: " + report.reportToUrl) : (report.bidName ? ("Bid Name: " + report.bidName) : ("Project Name: " + report.projectName))}</TableCell>
                                <TableCell>{report.reportName}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell>{report.isApproved === true ? (<Typography>{t('approved')} <CheckCircleOutlineIcon color='success' /></Typography>) : (<Typography>{t('pending')} <ErrorOutlineIcon color='warning' /></Typography>)}</TableCell>
                                <TableCell align='center'>
                                    <Tooltip title={t('mark_as_resolved')}>
                                        <IconButton onClick={() => onOpenModal(report.id)} disabled={report.isApproved === true ? true : false}>
                                            <FactCheckIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ReportList;
