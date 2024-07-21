import { Box, Button, Select, TextField, MenuItem, Divider, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

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
import '../../../assets/css/MyEditor.css'
import blogApi from '../../../services/blogApi';
import { useNavigate } from 'react-router-dom';

const ViewBlog = () => {
    const userId = useSelector((state) => state.auth.login?.currentUser?.userId);
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(false)
    const [helperTextTitle, setHelperTextTitle] = useState("")
    const [categoryId, setCategoryId] = useState(1)
    const [listCategory, setlistCategory] = useState([])
    const [image, setImage] = useState("")
    const [errorImage, setErrorImage] = useState(false)
    const [helperTextImage, setHelperTextImage] = useState("")
    const navigate = useNavigate()
    const [description, setDescription] = useState("")
    const [errorDescription, setErrorDescription] = useState(false)
    const [isPublish, setIsPublish] = useState(false)
    const [helperTextDescription, setHelperTextDescription] = useState("")

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            let res = await categoryApi.GetAllCategory();
            setlistCategory(res)
        }
        getData()
    }, [])

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
                    .then(url => {
                        setImage(url)
                        setLoading(false)
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error('Upload failed');
                    })
            } else {
                setErrorImage(true);
                setHelperTextImage('* File phải là ảnh');
            }
        } else {
            setErrorImage(true);
            setHelperTextImage('* Chưa file nào được chọn');
            toast.error('Chưa file nào được chọn');
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
        let hasError = false;
        if (title.length < 10 || title.length > 200) {
            setErrorTitle(true);
            setHelperTextTitle("* Tiêu đề từ 10 - 200 ký tự");
            hasError = true;
        } else {
            setErrorTitle(false);
            setHelperTextTitle("");
        }

        if (description === '') {
            setErrorDescription(true);
            setHelperTextDescription("* Không được để trống");
            hasError = true;
        } else {
            setErrorDescription(false);
            setHelperTextDescription("");
        }

        if (image === '') {
            setErrorImage(true);
            setHelperTextImage("* Không để trống");
            hasError = true;
        } else {
            setErrorImage(false);
            setHelperTextImage("");
        }

        if (hasError) {
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
                isPublished : isPublish
            }
            await blogApi.CreateBlog(data);
            setLoading(false)
            navigate("/view-blog")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={style}>
            {loading && <LoadingComponent loading={loading} />}
            <Box>
                <Box textAlign='center' mb={2}>
                    <TypographyHeader title="Tạo bài viết" />
                </Box>
                <Divider />
                <TypographyTitle title="Tiêu đề " marginT={3} />
                <TextField
                    sx={{
                        bgcolor: "white",
                        mt: 2
                    }}
                    error={errorTitle}
                    placeholder='Nhập tiêu đề ....'
                    fullWidth
                    value={title}
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                {helperTextTitle && <Box color="error.main" mt={1}>{helperTextTitle}</Box>}

                <TypographyTitle title="Chủ đề của bài viết " marginT={3} />
                <Select
                    fullWidth
                    sx={{ bgcolor: '#FFFFFF', mt: 2 }}
                    value={categoryId}
                    onChange={(e) => handleChangeCategory(e.target.value)}
                >
                    {listCategory?.length > 0 && listCategory.map((item, index) => (
                        <MenuItem key={index} value={item?.id}>{item?.categoryName}</MenuItem>
                    ))}
                </Select>
                <Box display='flex' mt={3} justifyItems='center' alignItems='center'>
                    <TypographyTitle title="Ảnh chủ đề " />
                    <Button
                        variant="contained"
                        component="label"
                        size='small'
                        sx={{
                            ml: 2
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
                {helperTextImage && <Box color="error.main" mt={1}>{helperTextImage}</Box>}

                {image && <img src={image} alt="Uploaded" style={{ marginTop: '10px', maxHeight: '200px' }} />}

                <TypographyTitle mt={1} title="Mô tả " marginT={3} />
                <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    config={{
                        extraPlugins: [CustomUploadAdapterPlugin]
                    }}
                    onChange={handleDescriptionChange}
                />
                {errorDescription && <Box color="error.main" mt={1}>{helperTextDescription}</Box>}

                <Box display='flex' mt={3} justifyItems='center' alignItems='center'>
                    <TypographyTitle title="Công khai " />
                    <Switch value={isPublish}
                        onChange={(e) => setIsPublish(e.target.checked)} />

                </Box>
                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Button
                        variant='contained'
                        disabled={loading}
                        onClick={(e) => handleCreateBlog(e)}
                    >
                        Tạo bài viết
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ViewBlog

const style = {
    p: 4,
    overflow: 'auto',
    maxHeight: window.innerHeight - 80,
};
