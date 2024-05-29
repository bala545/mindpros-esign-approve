import React, { useCallback, useMemo, useState, useRef } from 'react';
import { getData } from './data';
import customerPopup from './customerPopup.js';
import vehiclePopup from './vehiclePopup.js';
import StatusTooltip from './tooltipStatus.js';
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-alpine.css"; // Theme
import ActionCellRenderer from './ActionCellRenderer';
import './style.css';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import { ModuleRegistry } from "@ag-grid-community/core";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    FiltersToolPanelModule,
    ColumnsToolPanelModule,
    RangeSelectionModule,
    GridChartsModule,
    SideBarModule,
    MasterDetailModule,
    SetFilterModule,
    MenuModule,
]);

const toolTipValueGetter = (params) => ({ value: params.value });

const AllStatus = (params) => {
    const value = params.value || ""; // Default to an empty string if params.value is undefined
    return (
        <span className={'badge ' + value.split(" ").join("")}>
            {value}
        </span>
    );
};

const DataGrid = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const data = useMemo(() => getData(), []);
    const [rowData] = useState(data, []);
    const paginationPageSize = 20; // Set this to a value in the paginationPageSizeSelector array
    const paginationPageSizeSelector = [5, 10, 20]; // Define the page size options
    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: false,
        resizable: true,
        sortable: true,
        enableValue: false,
        enableRowGroup: true,
        enablePivot: true
    };

    let columnApi;

    const onGridReady = (params) => {
        columnApi = params.columnApi;
        gridRef.current.api.expandAll();
    };

    const gridOptions = {
        defaultColDef: defaultColDef,
        animateRows: true,
        autoGroupColumnDef: {
            cellRendererParams: {
                suppressCount: true,
            }
        },
    };

    const PullUpRO = () => {
        let overlayRO = document.querySelector('.overlay');
        overlayRO.classList.toggle("show");
    }

    const modalPop = (props) => {
        let modal = document.querySelector('.modal');
        modal.classList.remove('edit-customer', 'edit-vehicle');
    }

    function ROLink(params) {
        return (
            <span className="ROLink" onClick={PullUpRO}> 
                {params.value}
            </span>
        );
    }

    function TimeRenderer(params) {
        return (
            <span className= "ApptTime">
                {params.value}
            </span>
        );
    }

    const createROColDefs = () => {
        return [
            {
                headerName: "",
                width: 40,
                checkboxSelection: true,
                headerCheckboxSelection: true, // This enables the header checkbox
                headerCheckboxSelectionFilteredOnly: true, // This selects only filtered rows
                sortable: false,
                suppressMenu: true,
                filter: false,
                pinned: true
            },
            { field: 'Domain', 
                cellStyle: { color: '#2B6BDD' },
                headerName: 'Domain',
                pinned: 'left',
                flex: 1,
                lockPinned: true,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRendererParams: {
                    onEdit: (row) => onEdit(row),
                    onDelete: (row) => onDelete(row)
                }
            },
            { field: 'Project', 
                headerName: 'Project', 
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                valueParser: 'Project',
                cellRenderer: AllStatus, 
                tooltipComponent: StatusTooltip,
                tooltipValueGetter: toolTipValueGetter,
            },
            { field: 'System', 
                headerName: 'System', 
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: customerPopup,
                editable: false,
                colId: 'system',
                onCellClicked: (params) => {
                    if (
                    params.event.target.dataset.action == 'toggle' &&
                    params.column.getColId() == 'system'
                    ) {
                    const cellRendererInstances = params.api.getCellRendererInstances({
                        rowNodes: [params.node],
                        columns: [params.column],
                    });
                    if (cellRendererInstances.length > 0) {
                        const instance = cellRendererInstances[0];
                        instance.togglePopup();
                    }
                    }
                },
            },
            { field: 'Record Type', 
                headerName: 'Record Type',
                flex: 1,
                suppressHeaderFilterButton: true 
            },
            { field: 'Record Name',
              headerName: 'Record Name',
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'],
                cellRenderer: vehiclePopup,
                editable: false,
                colId: 'recordname',
                onCellClicked: (params) => {
                    if (
                    params.event.target.dataset.action == 'toggle' &&
                    params.column.getColId() == 'recordname'
                    ) {
                    const cellRendererInstances = params.api.getCellRendererInstances({
                        rowNodes: [params.node],
                        columns: [params.column],
                    });
                    if (cellRendererInstances.length > 0) {
                        const instance = cellRendererInstances[0];
                        instance.togglePopup();
                    }
                    }
                },
            },
            { field: 'ApprovalTask',
                headerName: 'Approval Task', 
                tooltipField: 'Approval Task',
                flex: 1,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'] 
            },
            { field: 'AssignedDate', 
                headerName: 'Assigned Date',
                resizable: false,
                flex: 1,
                filter: 'agTextColumnFilter',
                menuTabs: ['filterMenuTab'] 
            },
            {
                field: '',
                headerName: 'Actions',
                resizable: false,
                cellRenderer: 'actionCellRenderer',
                flex: 1,
                cellStyle: { 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center' 
                },
                filter: 'agSetColumnFilter',
                menuTabs: ['filterMenuTab'],
                chartDataType: 'series'
            }
        ];
    };

    const [columnDefs, setColumnDefs] = useState(createROColDefs());

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
        );
    }, []);

    const icons = {
        sortAscending: '<i class="fa fa-sort-asc"/>',
        sortDescending: '<i class="fa fa-sort-desc"/>',
        filter: '<i class="fa fa-filter"/>'
    };

    const sideBar = useMemo(() => {
        return {
            toolPanels: [
                {
                    id: 'customStats',
                    labelDefault: 'My Day',
                    labelKey: 'customStats',
                    iconKey: 'chart',
                    toolPanel: 'agColumnsToolPanel',
                    minWidth: 180,
                    maxWidth: 400,
                    width: 250
                },
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                        suppressValues: true,
                        suppressPivots: true,
                        suppressPivotMode: true,
                        suppressColumnFilter: true,
                        suppressColumnSelectAll: true,
                        suppressColumnExpandAll: true,
                    },
                    minWidth: 180,
                    maxWidth: 400,
                    width: 250
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                    minWidth: 180,
                    maxWidth: 400,
                    width: 250
                }
            ],
            position: 'left',
            defaultToolPanel: '[]'
        };
    }, []);

    const changeView = useCallback((myValue) => {
        if (myValue.includes('Not Dispatched')) {
            var hardcodedFilter = {
                Project: {
                    type: 'set',
                    values: ['Not Dispatched'],
                }
            };
            gridRef.current.api.setFilterModel(hardcodedFilter);
        }

        if (myValue.includes('My Customer Pay ROs')) {
            var hardcodedFilter = {
                Advisor: {
                    type: 'set',
                    values: ['Eric Sanders'],
                },
                Actions: {
                    type: 'set',
                    values: ['C'],
                }
            };
            gridRef.current.api.setFilterModel(hardcodedFilter);
        }

        if (myValue.includes('Cashier View')) {
            gridRef.current.api.updateGridOptions({ 'columnDefs': createCashierColDefs() });
        }

        if (myValue.includes('Appt View')) {
            gridRef.current.api.updateGridOptions({ 'columnDefs': AppointmentsView() });
            gridRef.current.api.expandAll();
        }

        if (myValue.includes('Repair Orders')) {
            gridRef.current.api.updateGridOptions({ 'columnDefs': createROColDefs() });
        }

        if (myValue.includes('Counter Person  View')) {
            gridRef.current.api.updateGridOptions({ 'columnDefs': createCPColDefs() });
            gridRef.current.api.expandAll();
        }

        if (myValue.includes('All ROs')) {
            gridRef.current.api.setFilterModel(null);
        }
    }, []);

    const clearFilters = useCallback(() => {
        gridRef.current.api.setFilterModel(null);
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div>
                    <div className="button-group">
                        <select onChange={e => changeView(e.target.value)}>
                            <option value="Repair Orders">Repair Orders</option>
                            <option value="Counter Person  View">Parts Counter</option>
                            <option value="Cashier View">Cashier View</option>
                            <option value="Appt View">Appointment View</option>
                        </select>
                        <select onChange={e => changeView(e.target.value)}>
                            <option value="All ROs">All Repair Orders</option>
                            <option value="Not Dispatched">Not Dispatched</option>
                            <option value="My Customer Pay ROs">My Customer Pay ROs</option>
                        </select>
                        <button onClick={clearFilters}>Reset Filters</button>
                        <input
                            type="text"
                            id="filter-text-box"
                            placeholder="Search"
                            onInput={onFilterTextBoxChanged}
                        />
                    </div>
                </div>
                <div className="ag-theme-alpine" style={{ height: 800 }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        gridOptions={gridOptions}
                        defaultColDef={defaultColDef}
                        enableRangeSelection={true}
                        rowSelection={'multiple'}
                        sideBar={sideBar}
                        icons={icons}
                        rowHeight={40}
                        groupDisplayType={'groupRows'}
                        enableCharts={true}
                        tooltipShowDelay={0}
                        tooltipHideDelay={2000}
                        groupRowsSticky={true}
                        onGridReady={onGridReady}
                        masterDetail={true}
                        suppressRowClickSelection={true}
                        frameworkComponents={{
                            actionCellRenderer: ActionCellRenderer,
                        }}
                        pagination={true}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                    >
                    </AgGridReact>
                </div>
            </div>
            <div className="overlay" onClick={PullUpRO}>
            </div>
            <div className="modal" onClick={modalPop}></div>
        </div>
    );
};

export default DataGrid;
