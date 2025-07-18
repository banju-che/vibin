import React from 'react';
import Sidebar from './Sidebar';


const MainLayout = ({children}) => {
    return(
        <div>
            <Sidebar />
            <div className="ml-64 flex-1">{children}</div>
        </div>
    )
}

export default MainLayout;