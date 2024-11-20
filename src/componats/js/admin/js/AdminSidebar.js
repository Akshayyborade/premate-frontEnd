import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/admin-sidebar.css'; // External CSS
import { sidebarItems } from './sidebarItems'; // Sidebar config
import * as Icons from '@fortawesome/free-solid-svg-icons'; // Import all icons

function AdminSidebar({ setMainContentComponent }) {
    const [openDropdown, setOpenDropdown] = useState('');

    const handleTabClick = (component) => {
        setMainContentComponent(component);
    };

    const handleDropdownToggle = (category) => {
        setOpenDropdown(openDropdown === category ? '' : category);
    };

    return (
        <div className="sidebar-container">
            <ul className="sidebar-list">
                {sidebarItems.map((categoryObj, index) => (
                    <li key={index}>
                        <div
                            className="sidebar-item"
                            onClick={() => handleDropdownToggle(categoryObj.category)}
                        >
                            <FontAwesomeIcon
                                icon={Icons[categoryObj.icon]}
                                className="sidebar-icon"
                            />
                            <span>{categoryObj.category}</span>
                            <FontAwesomeIcon
                                icon={openDropdown === categoryObj.category ? faChevronDown : faChevronRight}
                                className="toggle-icon"
                            />
                        </div>
                        {openDropdown === categoryObj.category && (
                            <ul className="dropdown-list">
                                {categoryObj.items.map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            to={item.path}
                                            className="sidebar-link"
                                            onClick={() => handleTabClick(item.component)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminSidebar;
