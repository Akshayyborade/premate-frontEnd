import React from 'react';
import { componentMap } from './componentMap'; // Import the component mapping
import DashboardHome from './DashboardHome';

const MainContent = ({ component, setMainContentComponent }) => {
    const RenderComponent = componentMap[component] || DashboardHome; // Fallback to DashboardHome

    return (
        <div className="">
            <RenderComponent setMainContentComponent={setMainContentComponent} />
        </div>
    );
};

export default MainContent;