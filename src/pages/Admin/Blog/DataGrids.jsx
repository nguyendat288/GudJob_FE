import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React from 'react';

const DataGrids = ({ row, column }) => {
  const getRowId = (row) => {
    return row.createDate;
  };

  return (
    <Box
      height="70vh"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .name-column--cell': {
          color: '#94e2cd',
        },
        '& .MuiButton-textPrimary': {
          color: '#000',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'red',
          borderBottom: 'none',
          color: '#000',
          fontSize: '16px',
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          // backgroundColor: '#00FFFF',
        },
      }}
    >
      <DataGrid
        rows={row}
        columns={column}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={getRowId}
        pageSizeOptions={[5, 10]}
        slotProps={{
          pagination: {
            labelRowsPerPage: 'Số lượng bản ghi trên 1 trang',
            labelDisplayedRows: ({ from, to, count }) => {
              return `${from.toLocaleString('en')}-${to.toLocaleString(
                'en'
              )} trên ${count.toLocaleString('en')} bản ghi`;
            },
          },
          // rowCount={totalSkill}
          // paginationModel={paginationModel}
          // onPaginationModelChange={(newModel) => {
          //   setPaginationModel(newModel);
          //   pageChange(newModel.page);
          //   pageSizeChange(newModel.pageSize);
          // }}
          // paginationMode="server"
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
      />
    </Box>
  );
};

export default DataGrids;
