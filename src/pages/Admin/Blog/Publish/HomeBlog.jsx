import React from 'react'
import TopBar from './TopBar'
import ListBlog from './ListBlog'
import { Box, Typography } from '@mui/material'
import Footer from '../../../../components/Footer'

const HomeBlog = () => {
    const listBlog = [
        {
            "blogId": 11,
            "title": "Bài viết về IT ",
            "description": "<p><strong>IT ngày càng được nhiều các bạn học sinh chú ý&nbsp;</strong></p><figure class=\"image\"><img style=\"aspect-ratio:2560/1600;\" src=\"https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/images%2FIT.jpg?alt=media&amp;token=8b50d939-4e68-4390-b632-4acaada32672\" width=\"2560\" height=\"1600\"></figure>",
            "userId": 21,
            "isPublished": true,
            "author": "string",
            "categoryId": 1,
            "blogImage": "https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/file%2F1fb70fe2-1d77-4e4b-9b63-35379c24cc63?alt=media&token=f154c729-28e6-4c1c-86d0-4076cbf46c5e",
            "categoryName": "Công nghệ thông tin",
            "createDate": "2024-07-17T16:03:28.958725",
            "createTime": "17/07/2024 16:03"
        },
        {
            "blogId": 12,
            "title": "HEloo mọi người , hôm nay mn đẹp lắm",
            "description": "<p><strong>sadasdasd&nbsp;</strong></p><figure class=\"image\"><img style=\"aspect-ratio:2560/1600;\" src=\"https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/images%2FIT.jpg?alt=media&amp;token=941e73ed-92f0-40f1-98e0-837bf2db9915\" width=\"2560\" height=\"1600\"></figure>",
            "userId": 21,
            "isPublished": true,
            "author": "string",
            "categoryId": 2,
            "blogImage": "https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/file%2Fcc278146-f198-42b3-b84e-01ce36da5770?alt=media&token=b1d11224-abf7-4db1-88ac-c91a534aa476",
            "categoryName": "Kinh tế",
            "createDate": "2024-07-18T02:10:08.3305082",
            "createTime": "18/07/2024 02:10"
        },
        {
            "blogId": 13,
            "title": "IT ngày nay và cuộc sống",
            "description": "<p><strong>It ngày càng mất giá&nbsp;</strong></p><figure class=\"image\"><img src=\"https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/images%2Fmoto.jpg?alt=media&amp;token=75c14f5e-ca7a-460a-9a3d-fc9a3611fa1d\"></figure>",
            "userId": 21,
            "isPublished": true,
            "author": "string",
            "categoryId": 1,
            "blogImage": "https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/file%2F1654f6d2-8f51-443a-8402-058314ffe559?alt=media&token=425a1fc1-4b13-4c07-8f6c-6969ffde192e",
            "categoryName": "Công nghệ thông tin",
            "createDate": "2024-07-18T08:29:06.0205167",
            "createTime": "18/07/2024 08:29"
        }
    ]
    return (
        <Box>
            <TopBar />
            <Box p={4} textAlign='center'>
                <Typography fontSize="30px" fontWeight="bold">
                    Bài viết nổi bật
                </Typography>
                <Box display={'flex'} mt={5} alignItems={'center'} justifyContent='center' >
                    <ListBlog listBlog={listBlog} />
                </Box>

                <Typography mt={5} fontSize="30px" fontWeight="bold">
                    Bài viết mới nhất
                </Typography>
                <Box display={'flex'} mt={5} alignItems={'center'} justifyContent='center' >
                    <ListBlog listBlog={listBlog} />
                </Box>
            </Box>
            <Footer/>

        </Box>
    )
}

export default HomeBlog
