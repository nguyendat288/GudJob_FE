import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Statistic from '../../../services/adminApi/statistic';
import 'tailwindcss/tailwind.css';

// Register the necessary Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HomeAdmin = () => {
  const { t } = useTranslation('admin');
  const [categoriesData, setCategoriesData] = useState([]);
  const [projectsData, setProjectsData] = useState({});
  const [usersData, setUsersData] = useState({});
  const [newUserData, setNewUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await Statistic.CategoriesPieChartData();
        setCategoriesData(categoriesResponse.data);

        const projectsResponse = await Statistic.ProjectsPieChartData();
        setProjectsData(projectsResponse.data);

        const usersResponse = await Statistic.UsersPieChartData();
        setUsersData(usersResponse.data);

        const newUserResponse = await Statistic.NewUserData();
        setNewUserData(newUserResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const categoriesChartData = {
    labels: categoriesData.map((item) => item.categoryName),
    datasets: [
      {
        data: categoriesData.map((item) => item.totalProjects),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const projectsChartData = {
    labels: ['Approved Projects', 'Completed Projects'],
    datasets: [
      {
        data: [
          projectsData.totalAppovedProjects,
          projectsData.completedProjects,
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const usersChartData = {
    labels: ['Freelancers', 'Recruiters'],
    datasets: [
      {
        data: [usersData.freelacerCount, usersData.recruiterCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const newUserChartData = {
    labels: newUserData.map((item) =>
      new Date(item.createdDate).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Total Users',
        data: newUserData.map((item) => item.totalUserCount),
        borderColor: '#FF6384',
        fill: false,
      },

      {
        label: 'Freelancers',
        data: newUserData.map((item) => item.freelancerCount),
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'Recruiters',
        data: newUserData.map((item) => item.recruiterCount),
        borderColor: '#FFCE56',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography
        sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}
        className="mb-4"
      >
        {t('dashboard')}
      </Typography>
      <Grid container spacing={4}>
        {/* Section for Pie Charts */}
        <Grid item xs={12} md={6}>
          <Box className="shadow p-4 rounded-lg bg-white">
            <Typography variant="h6" className="mb-4 text-center">
              Overview
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box className="shadow p-4 rounded-lg bg-gray-50">
                  <Typography variant="h6" className="mb-2 text-center">
                    Categories
                  </Typography>
                  <Pie data={categoriesChartData} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="shadow p-4 rounded-lg bg-gray-50">
                  <Typography variant="h6" className="mb-2 text-center">
                    Projects
                  </Typography>
                  <Pie data={projectsChartData} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="shadow p-4 rounded-lg bg-gray-50">
                  <Typography variant="h6" className="mb-2 text-center">
                    Users
                  </Typography>
                  <Pie data={usersChartData} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Section for Line Chart */}
        <Grid item xs={12} md={6}>
          <Box className="shadow p-4 rounded-lg bg-white">
            <Typography variant="h6" className="mb-4 text-center">
              New Users
            </Typography>
            <Line data={newUserChartData} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeAdmin;
