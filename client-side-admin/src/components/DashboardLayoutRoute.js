import React from 'react';  
import { Route } from 'react-router-dom';  

import Drawer from '../layout/Drawer';
import Header from '../layout/Header';
  
const DashboardLayout = ({children, ...rest}) => {  
  return (  
    <div className="public-container">
      <Drawer />
      <div className="right-side">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  )  
}  
  
const DashboardLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <DashboardLayout>  
          <Component {...matchProps} />  
      </DashboardLayout>  
    )} />  
  )  
};  
  
export default DashboardLayoutRoute; 