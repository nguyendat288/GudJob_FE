import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const language = [
    { code: "en", lang: "English" },
    { code: "vi", lang: "Tiếng Việt" },
];

const LanguageSelector = () => {
    const { t, i18n } = useTranslation('common');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        handleClose();
    };

    return (
        <>
            <Tooltip title={t('language')}>
                <IconButton onClick={handleClick}>
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {language.map((lng) => {
                    return <MenuItem onClick={() => handleLanguageChange(lng.code)} key={lng.code}>{lng.lang}</MenuItem>
                })}
            </Menu>
        </>
    )
}

export default LanguageSelector
