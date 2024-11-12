import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const getBreadcrumbName = (path) => {
        // Convert path to readable name (e.g., 'student-list' -> 'Student List')
        return path
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <nav className="breadcrumbs">
            <Link to="/" className="breadcrumb-item">
                Home
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <React.Fragment key={routeTo}>
                        <span className="breadcrumb-separator">/</span>
                        {isLast ? (
                            <span className="breadcrumb-item active">
                                {getBreadcrumbName(name)}
                            </span>
                        ) : (
                            <Link to={routeTo} className="breadcrumb-item">
                                {getBreadcrumbName(name)}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs; 