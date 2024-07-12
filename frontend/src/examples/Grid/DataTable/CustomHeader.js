// CustomHeader.js
import React, { useState, useCallback } from 'react';
import './style.css';

const CustomHeader = (props) => {
    const { displayName, column, api } = props;
    const [filterValue, setFilterValue] = useState('');

    const onFilterChange = useCallback((event) => {
        const value = event.target.value;
        setFilterValue(value);
        const filterInstance = api.getFilterInstance(column.colId);
        filterInstance.setModel({
            type: 'contains',
            filter: value,
        });
        api.onFilterChanged();
    }, [api, column]);

    return (
        <div className="custom-header">
            <div>{displayName}</div>
            <input
                type="text"
                placeholder={`Search ${displayName}`}
                value={filterValue}
                onChange={onFilterChange}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default CustomHeader;
