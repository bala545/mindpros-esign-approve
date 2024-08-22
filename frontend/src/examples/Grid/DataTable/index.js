import React, { useCallback, useMemo, useState, useRef,useEffect } from 'react';
import { getData } from './data';
import customerPopup from './customerPopup.js';
import vehiclePopup from './vehiclePopup.js';
import StatusTooltip from './tooltipStatus.js';
// import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "@ag-grid-community/styles/ag-theme-alpine.css"; // Theme
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
import { useNavigate } from 'react-router-dom';
import CustomHeader from './CustomHeader';
import CustomButtonComponent from "./customButtonComponent.js";
import '@ag-grid-community/styles/ag-grid.css'; // Core CSS
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { Button } from '@mui/base/Button';
import axios from 'axios';
import { debounce } from 'lodash';
import { useEvent } from '../../../useEvent';
// import { isApprovalQueueClicked } from '../../../App';

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



const DataGrid = ({onParentAQ}) => {

    const navigate = useNavigate();
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const [rowData, setRowData] = useState([]);
    const data = useMemo(() => getData(), []); 
    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getrecords');
            setRowData(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // useEffect(() => {
    //     setRowData(data);
    // }, [data]);
    const handleAQRow = () => {
        onParentAQ();
    };
    const onGridReady = params => {
        window.addEventListener('resize', debounce(() => {
            try {
                params.api.sizeColumnsToFit();
            } catch (error) {
                console.error('ResizeObserver error:', error);
            }
        }, 200));
    };
    const paginationPageSize = 20; // Set this to a value in the paginationPageSizeSelector array
    const paginationPageSizeSelector = [5, 10, 20]; // Define the page size options
    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: 'agTextColumnFilter',
        resizable: true,
        filter:true,
        sortable: true,
        enableValue: false,
        enableRowGroup: true,
        enablePivot: true,
        floatingFilter: true,
        headerComponentFramework: CustomHeader, // Use custom header component
    };

    let columnApi;

    // const onGridReady = (params) => {
    //     columnApi = params.columnApi;
    //     gridRef.current.api.expandAll();
    // };

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
                filter: 'agTextColumnFilter',
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
            { field: 'Record_Type', 
                headerName: 'Record Type',
                filter: 'agTextColumnFilter',
                flex: 1,
                suppressHeaderFilterButton: true 
            },
            { field: 'Record_Name',
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
                    // if (cellRendererInstances.length > 0) {
                    //     const instance = cellRendererInstances[0];
                    //     instance.togglePopup();
                    // }
                    handleAQRow();
                    navigate('/billing',{ state: { rowData: params.data } });
                    }
                },
            },
            { field: 'Approval_Status',
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
                cellRenderer: CustomButtonComponent,
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
                <div className="button-group" style={{ display: 'flex', alignItems: 'center',padding:'1rem' }}>
                    <select
                        onChange={(e) => changeView(e.target.value)}
                        style={{ marginRight: '10px',borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="Repair Orders">Pending</option>
                        <option value="Counter Person View">Approval</option>
                        <option value="Cashier View">Incomplete</option>
                        <option value="Appt View">Reject</option>
                    </select>
                
                    <Button onClick={clearFilters}
                        style={{
                          
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}>Reset Filters</Button>
               
                </div>
                <div className="ag-theme-quartz" style={{ height: 800 }}>
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
