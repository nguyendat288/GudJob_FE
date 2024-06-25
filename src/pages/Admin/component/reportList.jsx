import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ReportList = ({ reports, onOpenModal }) => {
    return (
        <Box component="main" className="p-4">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{fontSize: "1.5rem", fontWeight: "600"}}>Report List</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Create
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Created By</TableCell>
                            <TableCell>Report Information</TableCell>
                            <TableCell>Report Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports?.items?.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.nameCreatedBy}</TableCell>
                                <TableCell>{report.reportToUrl ? ("URL user: " + report.reportToUrl) : (report.bidName ? ("Bid Name: " + report.bidName) : ("Project Name: " + report.projectName))}</TableCell>
                                <TableCell>{report.reportName}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell>{report.isApproved === true ? (<Typography>Đã Duyệt <CheckCircleOutlineIcon color='success'/></Typography>) : (<Typography>Chờ Duyệt <ErrorOutlineIcon color='warning'/></Typography>)}</TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => onOpenModal(report.id)} disabled={report.isApproved === true ? true : false}>
                                        <FactCheckIcon />
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

export default ReportList;
