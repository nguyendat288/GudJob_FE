import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const ListBlog = ({ listBlog }) => {
    return (
        <ImageList sx={{ width: '85%', height: 'auto' }} cols={3}>
            <ImageListItem key="Subheader" cols={3}>
                {/* <ListSubheader component="div">December</ListSubheader> */}
            </ImageListItem>
            {listBlog.map((item) => (
                <ImageListItem key={item.blogImage}>
                    <img
                        srcSet={`${item.blogImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.blogImage}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                                <InfoOutlinedIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default ListBlog
