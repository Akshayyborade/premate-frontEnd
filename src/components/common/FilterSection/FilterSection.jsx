import React from 'react';
import './FilterSection.css';

const FilterSection = ({ searchTerm, onSearchChange, filters, onFilterChange, filterOptions }) => {
    return (
        <div className="filters-section">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search students..."
                className="search-bar"
            />

            <div className="filter-controls">
                {filterOptions.map((filter) => (
                    <select
                        key={filter.name}
                        value={filters[filter.name]}
                        onChange={(e) => onFilterChange(filter.name, e.target.value)}
                    >
                        <option value="">{filter.placeholder}</option>
                        {filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ))}
            </div>
        </div>
    );
};

export default FilterSection; 