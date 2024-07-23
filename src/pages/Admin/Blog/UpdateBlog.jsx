import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import blogApi from '../../../services/blogApi';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Switch,
  Tab,
  TextField,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
import categoryApi from '../../../services/categoryApi';
import 'ckeditor5/ckeditor5.css';
import '../../../assets/css/MyEditor.css';
import { imageDb } from '../../../firebase/firebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import LoadingComponent from '../../../components/LoadingComponent';
import customUploadAdapter from '../../../firebase/customUploadAdapter';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
  const { blogId } = useParams();
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState();

  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [helperTextTitle, setHelperTextTitle] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [listCategory, setlistCategory] = useState([]);
  const [image, setImage] = useState('');
  const [errorImage, setErrorImage] = useState(false);
  const [helperTextImage, setHelperTextImage] = useState('');
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState(false);
  const [helperTextDescription, setHelperTextDescription] = useState('');
  const [isPublish, setIsPublish] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isHot, setIsHot] = useState(false);

  const [shortDescription, setShortDescription] = useState('');
  const [errorshortDescription, setErrorshortDescription] = useState(false);
  const [helperTextshortDescription, setHelperTextshortDescription] =
    useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 1) {
      const getData = async () => {
        setLoading(true);
        let res = await blogApi.GetBlogById(blogId);
        setTitle(res?.title);
        setCategoryId(res?.categoryId);
        setDescription(res?.description);
        setShortDescription(res?.shortDesction);
        setImage(res?.blogImage);
        setBlog(res);
        setIsPublish(res?.isPublished);
        setIsHomePage(res?.isHomePage);
        setIsHot(res?.isHot);
        setLoading(false);
      };
      getData();
    }
  }, [value]);

  useEffect(() => {
    if (value === 1) {
      setLoading(true);
      const getData = async () => {
        let res = await categoryApi.GetAllCategory();
        setlistCategory(res);
        setLoading(false);
      };
      getData();
    }
  }, [value]);

  const handleChangeCategory = (id) => {
    setCategoryId(id);
  };

  const handleUpload = (e) => {
    if (e) {
      if (e.name.endsWith('.jpg') || e.name.endsWith('.png')) {
        setLoading(true);
        const imgRef = ref(imageDb, `file/${v4()}`);
        uploadBytes(imgRef, e)
          .then((value) => getDownloadURL(value.ref))
          .then((url) => {
            setImage(url);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            toast.error('Upload failed');
          });
      } else {
        setErrorImage(true);
        setHelperTextImage('*File phải là ảnh');
      }
    } else {
      setErrorImage(true);
      setHelperTextImage('No file selected');
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

  const handleUpdateBlog = async () => {
    let hasError = false;
    if (title.length < 10 || title.length > 200) {
      setErrorTitle(true);
      setHelperTextTitle('* Tiêu đề từ 10 - 200 ký tự');
      hasError = true;
    } else {
      setErrorTitle(false);
      setHelperTextTitle('');
    }

    if (description === '') {
      setErrorDescription(true);
      setHelperTextDescription('* Không được để trống');
      hasError = true;
    } else {
      setErrorDescription(false);
      setHelperTextDescription('');
    }

    if (image === '') {
      setErrorImage(true);
      setHelperTextImage('* Không để trống');
      hasError = true;
    } else {
      setErrorImage(false);
      setHelperTextImage('');
    }
    if (shortDescription === '' || shortDescription.length >= 200) {
      setErrorshortDescription(true);
      setHelperTextshortDescription('* Mô tả ngắn từ 0 - 200 ký tự .');
      hasError = true;
    } else {
      setErrorshortDescription(false);
      setHelperTextshortDescription('');
    }
    if (hasError) {
      return;
    }

    setLoading(true);
    try {
      let data = {
        id: blogId,
        title: title,
        description: description,
        shortDescription: shortDescription,
        categoryId: categoryId,
        blogImage: image,
        isPublished: isPublish,
        isHomePage: isHomePage,
        isHot: isHot,
      };
      await blogApi.UpdateBlog(data);
      setLoading(false);
      navigate('/view-blog');
    } catch (error) {}
  };

  return (
    <Box sx={style}>
      {loading && <LoadingComponent loading={loading} />}
      <Box textAlign="center" mb={2}>
        <TypographyHeader title="Chỉnh sửa bài viết" />
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Bài viết " value={1} />
            <Tab label="Bài viết liên quan" value={2} />
          </TabList>
        </Box>

        <TabPanel value={1}>
          <Box>
            <TypographyTitle title="Tiêu đề " marginT={3} />
            <TextField
              sx={{
                bgcolor: 'white',
                mt: 2,
              }}
              error={errorTitle}
              placeholder="Nhập tiêu đề ...."
              fullWidth
              value={title}
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
            />
            {helperTextTitle && (
              <Box color="error.main" mt={1}>
                {helperTextTitle}
              </Box>
            )}
            <TypographyTitle title="Mô tả ngắn " marginT={3} />
            <TextField
              multiline
              maxRows={4}
              sx={{
                bgcolor: 'white',
                mt: 2,
              }}
              error={errorshortDescription}
              placeholder="Nhập mô tả ngắn...."
              fullWidth
              value={shortDescription}
              variant="outlined"
              onChange={(e) => setShortDescription(e.target.value)}
            />

            {helperTextshortDescription && (
              <Box color="error.main" mt={1}>
                {helperTextshortDescription}
              </Box>
            )}
            <TypographyTitle title="Chủ đề của bài viết " marginT={3} />
            <Select
              fullWidth
              sx={{ bgcolor: '#FFFFFF', mt: 2 }}
              value={categoryId}
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              {listCategory?.length > 0 &&
                listCategory.map((item, index) => (
                  <MenuItem key={index} value={item?.id}>
                    {item?.categoryName}
                  </MenuItem>
                ))}
            </Select>
            <Box
              display="flex"
              mt={3}
              justifyItems="center"
              alignItems="center"
            >
              <TypographyTitle title="Ảnh chủ đề " />
              <Button
                variant="contained"
                component="label"
                size="small"
                sx={{
                  ml: 2,
                }}
                error={errorImage ? true : undefined}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleUpload(e.target.files[0])}
                />
              </Button>
            </Box>
            {helperTextImage && (
              <Box color="error.main" mt={1}>
                {helperTextImage}
              </Box>
            )}

            {image && (
              <img
                src={image}
                alt="Uploaded"
                style={{ marginTop: '10px', maxHeight: '200px' }}
              />
            )}

            <TypographyTitle mt={1} title="Mô tả " marginT={3} />
            <CKEditor
              editor={ClassicEditor}
              data={description}
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
              }}
              onChange={handleDescriptionChange}
            />
            {errorDescription && (
              <Box color="error.main" mt={1}>
                {helperTextDescription}
              </Box>
            )}

            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                mt={3}
                justifyItems="center"
                alignItems="center"
              >
                <TypographyTitle title="Công khai " />
                <Switch
                  checked={isPublish}
                  value={isPublish}
                  onChange={(e) => setIsPublish(e.target.checked)}
                />
              </Box>

              <Box
                display="flex"
                mt={3}
                justifyItems="center"
                alignItems="center"
              >
                <TypographyTitle title="Trang chủ " />
                <Switch
                  checked={isHomePage}
                  value={isHomePage}
                  onChange={(e) => setIsHomePage(e.target.checked)}
                />
              </Box>

              <Box
                display="flex"
                mt={3}
                justifyItems="center"
                alignItems="center"
              >
                <TypographyTitle title="Nổi bật " />
                <Switch
                  value={isHot}
                  checked={isHot}
                  onChange={(e) => setIsHot(e.target.checked)}
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                disabled={loading}
                onClick={(e) => handleUpdateBlog(e)}
              >
                Chỉnh sửa bài viết
              </Button>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={2}>Item Two</TabPanel>
      </TabContext>
    </Box>
  );
};

export default UpdateBlog;
const style = {
  p: 4,
  overflow: 'auto',
  maxHeight: window.innerHeight - 80,
};
