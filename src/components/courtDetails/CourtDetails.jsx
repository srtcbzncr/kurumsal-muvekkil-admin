import './style.css';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { Stack } from '@mui/material';
import { useConfirm } from "material-ui-confirm";

import { ToastContainer, toast } from 'react-toastify';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

import getAuthHeader from '../../helpers/getAuthHeader';

const CourtDetails = () => {
  return (
    <div>CourtDetails</div>
  )
}

export default CourtDetails