import { Box, Button, FormControl, Modal, Select, TextField, MenuItem, Tooltip, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import { v4 } from 'uuid';
import { imageDb } from '../../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import customUploadAdapter from '../../../firebase/customUploadAdapter';
import 'ckeditor5/ckeditor5.css';
import categoryApi from '../../../services/categoryApi';
import LoadingComponent from '../../../components/LoadingComponent';
import blogApi from '../../../services/blogApi';
import DataGrids from './DataGrids';
import { formatDateTime } from '../../../utils/formatDate';

const ViewBlog = () => {
  const userId = useSelector((state) => state.auth.login?.currentUser?.userId);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState(1)
  const [listCategory, setlistCategory] = useState([])
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const [listBlog, setListBlog] = useState([])
  useEffect(() => {
    const getData = async () => {
      let res = await blogApi.GetAllBlog(1, 10);
      setListBlog(res?.items)
    }
    getData()
  }, [])
  console.log(listBlog);

  const columns = [
    {
      field: "author",
      headerName: "Tác giả",
      width: 150,
    },
    {
      field: "categoryName",
      headerName: "Chủ đề ",
      width: 250,
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      width: 250,
    },
    {
      field: "createDate",
      headerName: "Ngày tạo",
      width: 250,
          renderCell: (params) => (
            <>
                <Box mt={2}>
                    <Typography> {formatDateTime(params?.row?.createDate)} </Typography>
                </Box>
            </>
        )
    },
    // {
    //     field: "score",
    //     headerName: "Score",
    //     width: 100,
    //     renderCell: (params) => (
    //         <>
    //             <Box mt={2}>

    //                 <Typography> {params?.row?.score}/{params?.row?.test?.numberQuestion} </Typography>
    //             </Box>
    //         </>
    //     )
    // },
    // {
    //     field: "gg",
    //     headerName: "Action",
    //     width: 100,
    //     renderCell: (params) => (
    //         <>
    //             <Button variant='contained' onClick={(e) => handleDetail(params?.row?.testDetailId, params?.row?.testId,params?.row?.user?.userId)}>Detail</Button>
    //         </>
    //     )
    // }
  ]

  useEffect(() => {
    const getData = async () => {
      if (open) {
        let res = await categoryApi.GetAllCategory();
        setlistCategory(res)
      }
    }
    getData()
  }, [open])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeCategory = (id) => {
    setCategoryId(id)
  }

  const handleUpload = (e) => {
    if (e) {
      if (e.name.endsWith('.jpg') || e.name.endsWith('.png')) {
        setLoading(true);
        const imgRef = ref(imageDb, `file/${v4()}`);
        uploadBytes(imgRef, e)
          .then(value => getDownloadURL(value.ref))
          .then(url => setImage(url))
          .catch(error => {
            console.error(error);
            toast.error('Upload failed');
          })
          .finally(() => setLoading(false));
      } else {
        toast.error('File is not an image');
      }
    } else {
      toast.error('No file selected');
    }
  };

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleCreateBlog = async () => {
    if (title.length < 10
      || title.length > 100 ||
      description.length < 10 ||
      description.length > 1000 ||
      image == ''
    ) {
      toast.error("Dữ liệu nhập vào không hợp lệ !!!")
      return;
    }

    setLoading(true)
    try {
      let data = {
        createdBy: userId,
        title: title,
        description: description,
        categoryId: categoryId,
        blogImage: image,
        isPublished: true
      }

      await blogApi.CreateBlog(data)
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  console.log(listCategory);
  return (
    <Box >
      <Box display='flex' alignItems='center' mb={3}>
        <Header title='DANH SÁCH BÀI VIẾT' subtitle="Danh sách các bài viết trong trang web" />
        <Box ml='auto'>
          <Tooltip title="Tạo bài viết" arrow>
            <Button
              sx={{ bgcolor: '#28a745', color: '#fff', fontSize: '12px', '&:hover': { bgcolor: '#00CC00' } }}
              onClick={() => handleOpen()}
              startIcon={<AddIcon />}
            >
              Tạo bài viết
            </Button>
          </Tooltip>
        </Box>

      </Box>
      <Box>
        <DataGrids row={listBlog} column={columns} />
      </Box>



      {/* Modal tạo bài viết blog */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          {loading && <LoadingComponent loading={loading} />}

          <Box sx={style}>
<Box textAlign='center' mb={2}>
            <TypographyHeader title="Tạo bài viết" />
</Box>
<Divider/>

            <TypographyTitle title="Tiêu đề " />
            <TextField
              placeholder='Nhập tiêu đề ....'
              fullWidth
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
            />

            <TypographyTitle title="Chủ đề của bài viết " />
            <Select
              fullWidth
              sx={{ bgcolor: '#FFFFFF', mb: 2 }}
              value={categoryId}
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              {listCategory?.length > 0 && listCategory.map((item, index) => (
                <MenuItem key={index} value={item?.id}>{item?.categoryName}</MenuItem>
              ))}
            </Select>

            <TypographyTitle mt={1} title="Ảnh chủ đề " />
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </Button>

            {image && <img src={image} alt="Uploaded" style={{ marginTop: '10px', maxHeight: '200px' }} />}

            <TypographyTitle mt={1} title="Mô tả " />
            <CKEditor
            
              editor={ClassicEditor}
              data={description}
              config={{
                extraPlugins: [CustomUploadAdapterPlugin]
              }}
              
              onChange={handleDescriptionChange}
            />

            <Button variant='contained'
              disabled={loading}
              onClick={(e) => handleCreateBlog(e)}> Tạo bài viết </Button>

          </Box>
        </>
      </Modal>

    </Box>
  )
}

export default ViewBlog

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'auto',
  maxHeight: 500,
  p: 4,
};