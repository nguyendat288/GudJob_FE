import React, { useImperativeHandle, useRef, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import categoryApi from '../../../services/categoryApi';
import { CustomNoRowsOverlay } from './CustomNoRowsOverlay';
import { CustomNoResultsOverlay } from './CustomNoResultsOverlay';
import skillApi from '../../../services/skillAPI';

function StatusInputValue(props) {
  const { item, applyValue, focusElementRef } = props;

  const statusRef = useRef(null);
  useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      statusRef.current.focus();
    },
  }));

  const handleFilterChange = (event) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel shrink={true}>Value</InputLabel>
      <Select
        value={item.value || ''}
        onChange={handleFilterChange}
        label="Value"
        inputRef={statusRef}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="true">Không hiển thị</MenuItem>
        <MenuItem value="false">Đang hiển thị</MenuItem>
      </Select>
    </FormControl>
  );
}

const statusOperators = [
  {
    label: 'Is',
    value: 'is',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      return (value) => {
        return String(value) === filterItem.value;
      };
    },
    InputComponent: StatusInputValue,
  },
  {
    label: 'Is not',
    value: 'is not',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      return (value) => {
        return String(value) !== filterItem.value;
      };
    },
    InputComponent: StatusInputValue,
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SkillList = ({
  categoryList,
  skillList,
  totalSkill,
  pageSize,
  page,
  pageChange,
  pageSizeChange,
  loading,
  setCategoryId,
  setSkillName,
  setReloadSkill,
  onOpenModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [allSkill, setAllSkill] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [rowModesModel, setRowModesModel] = useState({});
  const [openMenu, setOpenMenu] = useState({});

  const [open, setOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedSkillId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillRes = await skillApi.GetAllSkill();
        setAllSkill(skillRes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: pageSize,
  });

  useEffect(() => {
    setPaginationModel({ page: page, pageSize: pageSize });
  }, [page, pageSize]);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedSkill(null);
      const filtered = async () => {
        try {
          const response = await categoryApi.GetByCategoryId(
            selectedCategory.id
          );
          setFilteredSkills(response.items);
        } catch (error) {
          console.log(error);
        }
      };
      filtered();
    } else {
      setFilteredSkills(allSkill);
    }
  }, [selectedCategory, allSkill]);

  const handleSearch = (category, skill) => {
    setSelectedCategory(category);
    setSelectedSkill(skill);
    setCategoryId(category ? category.id : null);
    setSkillName(skill ? skill.skillName : null);
    setReloadSkill((prev) => !prev);
  };

  const processRowUpdate = async (newRow) => {
    const { id, skillName, categoryId, categoryName } = newRow;

    // Update skill in the backend
    try {
      await skillApi.UpdateSkill({ id, skillName, categoryId, categoryName });
      setSnackbar({
        open: true,
        message: 'Skill updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to update the skill:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update the skill',
        severity: 'error',
      });
    }

    return newRow;
  };

  const handleDelete = async () => {
    try {
      await skillApi.DeleteSkill(selectedSkillId);
      setReloadSkill((prev) => !prev);
      setSnackbar({
        open: true,
        message: 'Skill deleted successfully',
        severity: 'success',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete the skill:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete the skill',
        severity: 'error',
      });
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,

      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = skillList.find((row) => row.id === id);

    if (editedRow.isNew) {
      setReloadSkill((prev) => !prev);
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      filterable: false,
      width: 90,
      flex: 0.5,
      editable: false,
    },
    {
      field: 'categoryId',
      headerName: 'Category ID',
      filterable: false,
      width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: 'categoryName',
      headerName: 'Category Name',
      filterable: false,
      width: 150,
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: categoryList.map((category) => category.categoryName),
      renderEditCell: (params) => {
        const handleChange = (event) => {
          params.api.setEditCellValue({
            id: params.id,
            field: 'categoryName',
            value: event.target.value,
          });
        };

        return (
          <FormControl fullWidth>
            <Select
              value={params.value || ''}
              onChange={handleChange}
              open={openMenu[params.id] || false}
              onOpen={() =>
                setOpenMenu((prev) => ({ ...prev, [params.id]: true }))
              }
              onClose={() =>
                setOpenMenu((prev) => ({ ...prev, [params.id]: false }))
              }
              MenuProps={{
                PaperProps: {
                  onMouseDown: (event) => event.stopPropagation(),
                },
              }}
            >
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: 'skillName',
      headerName: 'Skill Name',
      width: 100,
      flex: 1,
      editable: true,
    },
    {
      field: 'isDeleted',
      headerName: 'Status',
      width: 100,
      flex: 1,
      sortable: false,
      editable: false,
      filterOperators: statusOperators,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" width="100%" sx={{ mt: 1.5 }}>
          <Typography>
            {params.row.isDeleted ? 'Không hiển thị' : 'Đang hiển thị'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title="Save Skill">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,

            <Tooltip title="Cancel edit">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
              />
            </Tooltip>,
          ];
        }

        return [
          <Tooltip title="Edit Skill">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
            />
          </Tooltip>,

          <Tooltip title="Delete Skill">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleClickOpen(id)}
            />
          </Tooltip>,
        ];
      },
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    categoryId: false,
  });

  return (
    <Box className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
          Skill List
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onOpenModal(null, false)}
        >
          Add Skill
        </Button>
      </Box>

      <Stack spacing={2} direction="row" mb={2}>
        <Autocomplete
          options={categoryList}
          getOptionLabel={(option) => option.categoryName}
          value={selectedCategory}
          onChange={(event, newValue) => handleSearch(newValue, selectedSkill)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select Category" />
          )}
          sx={{ width: 300 }}
        />
        <Autocomplete
          options={filteredSkills}
          getOptionLabel={(option) => option.skillName}
          value={selectedSkill}
          onChange={(event, newValue) =>
            handleSearch(selectedCategory, newValue)
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select Skill" />
          )}
          sx={{ width: 300 }}
        />
      </Stack>

      <Box height={400} width="100%">
        <DataGrid
          rows={skillList}
          columns={columns}
          rowCount={totalSkill}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            setPaginationModel(newModel);
            pageChange(newModel.page);
            pageSizeChange(newModel.pageSize);
          }}
          paginationMode="server"
          keepNonExistentRowsSelected
          disableRowSelectionOnClick
          loading={loading}
          pageSizeOptions={[5, 10, 15, 20]}
          disableColumnResize={true}
          slots={{
            toolbar: GridToolbar,
            noResultsOverlay: CustomNoResultsOverlay,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          slotProps={{
            pagination: {
              labelRowsPerPage: 'Số lượng kĩ năng trên 1 trang',
              labelDisplayedRows: ({ from, to, count }) => {
                return `${from.toLocaleString('en')}-${to.toLocaleString(
                  'en'
                )} trên ${count.toLocaleString('en')} kĩ năng`;
              },
            },
            toolbar: {
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
          localeText={{
            footerRowSelected: (count) =>
              count !== 1
                ? `Đã chọn ${count.toLocaleString()} kĩ năng`
                : `Đã chọn ${count.toLocaleString()} kĩ năng`,
          }}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #ddd',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #ddd',
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(even)': {
                backgroundColor: '#f9f9f9',
              },
            },
          }}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: '1.875rem' }}>
          {'Xác nhận xóa kĩ năng'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Xác nhận xóa kĩ năng này? Các project với kĩ năng này vẫn sẽ được
            hiển thị nhưng người dùng sẽ không thể thêm kĩ năng này vào profile
            của họ
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillList;
