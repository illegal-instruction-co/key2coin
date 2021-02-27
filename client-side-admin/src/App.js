import { withStore} from 'react-context-hook'
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import DashboardLayoutRoute from './components/DashboardLayoutRoute';
import LoginLayoutRoute from './components/LoginLayoutRoute';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import { routes } from './routes'

function App() {
  const menu = routes.map((route, index) => {
    return (route.component) ? (
        <DashboardLayoutRoute
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            component={props => (
                <route.component {...props} />
            )} />
    ) : (null);
  });
  return (
    <ToastProvider>
    <Switch>  
      <Route exact path="/">  
        <Redirect to="/login" />  
      </Route>  
      <LoginLayoutRoute path="/login" component={Login} />  
      {menu}
      <Route>  
        <NotFound />
      </Route>  
    </Switch>
    </ToastProvider>
  );
}

const initialState = {
  drawer:true,
  auth:{
    token:"",
    success:true
  }
}

const storeConfig = {
 listener: (state, key, prevValue, nextValue) => {
console.log(`the key "${key}" changed in the store`)
console.log('the old value is', prevValue)
console.log('the current value is', nextValue)
console.log('the state is', state)
},
 logging: process.env.NODE_ENV !== 'production'
}

export default withStore(App, initialState, storeConfig)
