import EventEmitter from 'events';
import ActionTypes from '../Actions/ActionTypes'
import dispatcher from '../Dispatcher/Dispatcher'
import mockData from '../mockes'
import EventTypes from '../Events/EventTypes'
import filterHelper from '../filterHelper'

class FiltersDataStore extends EventEmitter
{
    constructor()
    {
        super();

        this.tables = [];
        this.columns = [];
        this.tablesState = [];
        this.allRecords = [];
        this.sortedRecords = [];
        this.filterResults = [];

        this.isSortOn = false;
        this.isTablesDropdownOpened = false;
        this.isColumnsDropdownOpened = false;

        this.filterValue = "";

        this.applyFilter = this.applyFilter.bind(this);

        this.filters = filterHelper.getFilters().map(f => {
            var filter = {...f};
            filter.active = false;

            return filter;
        })

        this.isTablesDropdownOpened = false;

        this.activeFilter = this.filters[0];
        this.activeFilter.active = true;
    }

    //edit - avoid hardcoding of dropdown names
    isDropdownOpened(name)
    {
        if (name === "CONTEXTS")
        {
            return this.isTablesDropdownOpened;
        }
        else if (name === "DIMENSIONS")
        {
            return this.isColumnsDropdownOpened;
        }
    }

    //edit - avoid toogle dependence from dropdown names
    toggleDropdown(name)
    {
        if (name === "CONTEXTS")
        {
            this.isTablesDropdownOpened = !this.isTablesDropdownOpened;
        }
        else if (name === "DIMENSIONS")
        {
            this.isColumnsDropdownOpened = !this.isColumnsDropdownOpened;
        }

        this.emit(EventTypes.onDropdownToggled);
    }

    getColumns = () => this.columns;

    getFilters = () => this.filters;

    getTables = () => this.tablesState;

    getFilterResults = () => this.filterResults;

    addTables (tablesToAdd) 
    {
        var self = this;

        if (tablesToAdd && tablesToAdd instanceof Array)
        {
            tablesToAdd.forEach(function(table){
        
                if (table && table.tableName)
                {
                    self.tablesState.push({
                        tableName: table.tableName,
                        checked: false
                    });

                    //push all data related to the table
                    self.tables.push(table);
                }
            });
        }

        this.emit(EventTypes.onTablesChanged);
    }

    //when table checked to true
    addColumns (tableName, columns)
    {
        var self = this;

        columns.forEach(function (col) {
            if (col.columnName)
            {
                self.columns.push({
                    tableName,
                    columnName: col.columnName,
                    checked: false
                })
            }
        })

        this.emit(EventTypes.onColumnsChanged);
    }

    //when table checked to false
    removeColumns(tableName)
    {
        this.columns = this.columns.filter((col) => col.tableName !== tableName);

        var tableToExclude = this.tables.find(t => t.tableName === tableName);

        tableToExclude.data.forEach(col => {
                this.removeRecords(tableName, col.columnName)
            })

        this.emit(EventTypes.onColumnsChanged);
    }

    toggleFilter(filterType)
    {
        var activeFilter;
        this.isSelectOpened = !this.isSelectOpened;

        this.activeFilter.active = false;
        activeFilter = this.filters.find(f => f.filterType === filterType);

        if (activeFilter === false)
        {
            return;
        }

        this.activeFilter = activeFilter;
        this.activeFilter.active = true;

        this.updateFilterResults();

        this.emit(EventTypes.onFilterChanged);
        this.emit(EventTypes.onSelectToggled);
    }

    toggleSelect()
    {
        this.isSelectOpened = !this.isSelectOpened;

        this.emit(EventTypes.onSelectToggled);
    }

    toggleColumn(tableName, columnName)
    {
        var column = this.columns.find( col => 
            (col.tableName === tableName && col.columnName === columnName));

        if (!column)
        {
            return;
        }

        column.checked = !column.checked;

        if (column.checked)
        {
            this.addRecords(tableName, columnName);
        }
        else
        {
            this.removeRecords(tableName, columnName)
        }

        this.emit(EventTypes.onColumnsChanged);
    }

    addRecords(tableName, columnName)
    {
        var records = this.tables
            .find(t => (t.tableName === tableName))
            .data
            .find(c => (c.columnName === columnName))
            .data;

        if (!records && !records instanceof Array)
        {
            return;
        }

        var recordsToAdd = records.map(rec => ({
            tableName,
            columnName,
            data: rec,
            checked: false
        }));

        recordsToAdd.forEach((rec) => this.allRecords.push(rec));

        this.updateSortedRecords();

        this.updateFilterResults();
    }

    updateSortedRecords = () => this.sortedRecords = this.allRecords.slice().sort(this.compareFunction);

    removeRecords(tableName, columnName)
    {
        this.allRecords = this.allRecords.filter(rec => 
            !(rec.tableName === tableName && rec.columnName === columnName));

        this.updateSortedRecords();
        this.updateFilterResults();
    }

    updateFilterResults()
    {
        var filterResults = this.isSortOn ? this.sortedRecords : this.allRecords;

        if (this.filterValue !== "")
        {
            filterResults = filterResults.filter(this.applyFilter);
        }

        this.filterResults = filterResults;

        this.emit(EventTypes.onResultsChanged);
    }

    applyFilter = (value) => this.activeFilter.filterFunction(this.filterValue, value);

    compareFunction(first, second)
    {
        if (first.data > second.data)
        {
            return 1;
        }

        if (first.data < second.data)
        {
            return -1;
        }

        return 0;
    }

    toggleTable(tableName)
    {
        var table = this.tables.find((t) => (t.tableName === tableName));

        var tableState = this.tablesState.find(t => (t.tableName === tableName));

        tableState.checked = !tableState.checked;
        
        if (table)
        {
            if (tableState.checked === true)
            {
                this.addColumns(tableName, table.data);
            }
            else
            {
                this.removeColumns(table.tableName)
            }
        }

        this.emit(EventTypes.onTablesChanged);
    }

    toggleRecord(index)
    {
        var element = this.filterResults.find(r => r.index === index);

        element.checked = !element.checked;
    }

    setFilterValue(value)
    {
        this.filterValue = value;

        this.updateFilterResults();

        this.emit(EventTypes.onFilterValueChanged);
    }

    toggleSort()
    {
        this.isSortOn = !this.isSortOn;

        this.emit(EventTypes.onSortToggled);

        this.updateFilterResults();
    }

    reduce(action)
    {
        switch(action.type)
        {
            case ActionTypes.toggleRecord : 
                this.toggleRecord(action.index);
                break;
            
            case ActionTypes.toggleTable :
                this.toggleTable(action.tableName);
                break;

            case ActionTypes.toggleColumn :
                this.toggleColumn(action.tableName, action.columnName);
                break;

            case ActionTypes.setFilterValue :
                this.setFilterValue(action.value);
                break;

            case ActionTypes.toggleSelect : 
                this.toggleSelect();
                break;

            case ActionTypes.toggleFilter :
                this.toggleFilter(action.filterType);
                break;

            case ActionTypes.toggleSort :
                this.toggleSort();
                break;

            case ActionTypes.toggleDropdown :
                this.toggleDropdown(action.name);
                break;

            default: break;
        }
    }
}

const filterDataStore =  new FiltersDataStore();

dispatcher.register(filterDataStore.reduce.bind(filterDataStore));

filterDataStore.addTables(mockData);

window.filterDataStore = filterDataStore;

export default filterDataStore;