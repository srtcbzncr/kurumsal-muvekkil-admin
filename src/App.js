import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import theme from './theme/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import CourtList from './components/courtList/CourtList';
import { CookiesProvider } from 'react-cookie';
import CreateCourt from './components/createCourt/CreateCourt';
import { ConfirmProvider } from "material-ui-confirm";
import CourtDetails from './components/courtDetails/CourtDetails';
import EditCourt from './components/editCourt/EditCourt';
import CompanyList from './components/companyList/CompanyList';
import SubscriptionList from './components/subscriptionList/SubscriptionList';
import PlanList from './components/planList/PlanList';
import CreatePlan from './components/createPlan/CreatePlan';
import EditPlan from './components/editPlan/EditPlan';
import UserList from './components/userList/UserList';
import LawyerList from './components/lawyerList/LawyerList';
import ClientList from './components/clientList/ClientList';
import CreateAdmin from './components/createAdmin/CreateAdmin';

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <CookiesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="" element={<Dashboard />} ></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="courts" element={<CourtList/>}></Route>
                <Route path="courts/create" element={<CreateCourt/>}></Route>
                <Route path="courts/:id" element={<CourtDetails/>}></Route>
                <Route path="courts/:id/edit" element={<EditCourt/>}></Route>
                <Route path="companies" element={<CompanyList/>}></Route>
                <Route path="subscriptions" element={<SubscriptionList />}></Route>
                <Route path="plans" element={<PlanList />}></Route>
                <Route path="plans/create" element={<CreatePlan />}></Route>
                <Route path="plans/:id/edit" element={<EditPlan />}></Route>
                <Route path="users" element={<UserList />}></Route>
                <Route path='users/create' element={<CreateAdmin />}></Route>
                <Route path="lawyers" element={<LawyerList />}></Route>
                <Route path="clients" element={<ClientList />}></Route> 
              </Routes>
            </BrowserRouter>
          </CookiesProvider>
        </ConfirmProvider>
      </ThemeProvider>    
    </CssBaseline>
  )
}

export default App;
