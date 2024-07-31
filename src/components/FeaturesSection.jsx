import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📚',
      title: 'Hơn 50 kĩ năng khác nhau',
      description:
        'Đa dạng các kĩ năng khác nhau phù hợp với chuyên ngành bạn đã học',
    },
    {
      icon: '💸',
      title: 'Thanh toán minh bạch',
      description:
        'Thông tin thanh toán xác minh. Chỉ thanh toán khi 2 bên xác nhận công việc đã hoàn thành',
    },
    {
      icon: '⚡',
      title: 'Thời gian linh động',
      description:
        'Đừng lo lắng! Đa số các công việc không ảnh hưởng lịch làm việc hay học tập chính của bạn',
    },
    {
      icon: '🌐',
      title: 'Hỗ trợ nhiệt tình',
      description:
        'Hỗ trợ nhanh chóng. Liên hệ với đội ngũ quản lý hoặc developer để giải quyết các vấn đề trong ngày',
    },
  ];

  return (
    <Box className="py-12 bg-white text-left">
      <Box className="max-w-screen-2xl mx-auto">
        <Typography
          className="max-w-screen-md md:mb-10 text-3xl md:text-5xl font-medium tracking-tighter text-center md:text-left"
          sx={{ color: 'var(--text-color)' }}
        >
          Nâng cao kĩ năng chuyên môn chỉ bằng một cú nhấp chuột
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              md={3}
              key={index}
              className="flex flex-col items-center md:items-start blur-border"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <Typography
                variant="h6"
                className="text-2xl font-semibold mb-3 text-center md:text-left"
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-600 text-center md:text-left"
              >
                {feature.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
