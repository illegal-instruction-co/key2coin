import Dashboard from './pages/Dashboard'
import Languages from './pages/Languages';
import Redeem from './pages/Redeem';
import Sales from './pages/Sales'
import Settings from './pages/Settings'
import Users from './pages/Users';

export const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/sales', exact: true, name: 'Sales', component: Sales },
    { path: '/redeem', exact: true, name: 'Redeem', component: Redeem },
    { path: '/languages', exact: true, name: 'Languages', component: Languages },
    { path: '/users', exact: true, name: 'Users', component: Users },
    { path: '/settings', exact: true, name: 'Settings', component: Settings }
  ];