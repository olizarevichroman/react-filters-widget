import EventEmitter from 'events';
import actionTypes from '../Actions/ActionTypes'
import dispatcher from '../Dispatcher/Dispatcher'
import mockData from '../mockes'
import eventTypes from '../Events/EventTypes'
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

        this.emit(eventTypes.onDropdownToggled);
    }

    getColumns()
    {
        return this.columns;
    }

    getFilters()
    {
        return this.filters;
    }

    getTables()
    {
        return this.tablesState;
    }

    getFilterResults()
    {
        return this.filterResults;
    }

    addTables(tablesToAdd)
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

        this.emit(eventTypes.onTablesChanged);
    }

    //when table checked to true
    addColumns(tableName, columns)
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

        this.emit(eventTypes.onColumnsChanged);
    }

    //when table checked to false
    removeColumns(tableName)
    {
        this.columns = this.columns.filter((col) => col.tableName !== tableName);

        var tableToExclude = this.tables.find(t => t.tableName === tableName);

        tableToExclude.data.forEach(col => {
                this.removeRecords(tableName, col.columnName)
            })

        this.emit(eventTypes.onColumnsChanged);
    }

    toggleFilter(index)
    {
        this.isSelectOpened = !this.isSelectOpened;

        this.activeFilter.active = false;
        this.activeFilter = this.filters[index];
        this.activeFilter.active = true;

        this.updateFilterResults();

        this.emit(eventTypes.onFilterChanged);
        this.emit(eventTypes.onSelectToggled);
    }

    toggleSelect()
    {
        this.isSelectOpened = !this.isSelectOpened;

        this.emit(eventTypes.onSelectToggled);
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

        this.emit(eventTypes.onColumnsChanged);
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

    updateSortedRecords()
    {
        this.sortedRecords = this.allRecords.slice().sort(this.compareFunction);
    }

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

        this.emit(eventTypes.onResultsChanged);
    }

    applyFilter(value)
    {
        return this.activeFilter.filterFunction(this.filterValue, value);
    }

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

        this.emit(eventTypes.onTablesChanged);
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
    }

    toggleSort()
    {
        this.isSortOn = !this.isSortOn;

        this.emit(eventTypes.onSortToggled);

        this.updateFilterResults();
    }

    reduce(action)
    {
        switch(action.type)
        {
            case actionTypes.toggleRecord : {
                this.toggleRecord(action.index);
                break;
            };
            
            case actionTypes.toggleTable : {
                this.toggleTable(action.tableName);
                break;
            }

            case actionTypes.toggleColumn : {
                this.toggleColumn(action.tableName, action.columnName);
                break;
            };

            case actionTypes.setFilterValue : {
                this.setFilterValue(action.value);
                break;
            };

            case actionTypes.toggleSelect : {
                this.toggleSelect();
                break;
            };

            case actionTypes.toggleFilter : {
                this.toggleFilter(action.index);
                break;
            };

            case actionTypes.toggleSort : {
                this.toggleSort();
                break;
            };

            case actionTypes.toggleDropdown : {
                this.toggleDropdown(action.name);
                break;
            }
        }
    }
}

const filterDataStore =  new FiltersDataStore();

dispatcher.register(filterDataStore.reduce.bind(filterDataStore));

filterDataStore.addTables(mockData);

window.filterDataStore = filterDataStore;

export default filterDataStore;