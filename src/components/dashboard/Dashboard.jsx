import Layout from '../layout/Layout';
import './style.css';
import React from 'react';
import { Box } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';

export default function Dashboard() {

    return (
        <AuthCheck>
            <Layout>
                <Box>
                    Dashboard
                </Box>
            </Layout>
        </AuthCheck>
    )
}