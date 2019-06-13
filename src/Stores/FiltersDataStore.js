import EventEmitter from 'events';
import actionTypes from '../Actions/ActionTypes'
import dispatcher from '../Dispatcher/Dispatcher'
import mockData from '../mockes'
import eventTypes from '../Events/EventTypes'
import filterHelper from '../filterHelper'

//filteredData - all records with filter applied

//filterResults - filtered data with sorting applied

//allRecords - records from all included columns

class FiltersDataStore extends EventEmitter
{
    constructor()
    {
        super();

        this.tables = [];
        this.columns = [];

        this.tablesState = [];

        //filtered records
        //records which wasn't filtered
        this.allRecords = [];

        this.filteredData = [];
        this.filterResults = this.allRecords;

        this.isSorted = false;
        this.filterValue = "";
        this.filterFunction = null;
        this.filters = filterHelper.getFilters();
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

        this.columns.forEach(col => {
            this.removeRecords(tableName, col.columnName)
        });

        this.emit(eventTypes.onColumnsChanged);
        this.emit(eventTypes.onResultsChanged);
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
        this.emit(eventTypes.onResultsChanged);
    }

    addRecords(tableName, columnName)
    {
        var filteredRecords;

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

        //here we should also apply filter if it turned on
        recordsToAdd.forEach((rec) => this.allRecords.push(rec));

        this.filteredData = this.allRecords;
    }

    removeRecords(tableName, columnName)
    {
        this.allRecords = this.allRecords.filter(rec => 
            rec.tableName !== tableName && rec.columnName !== columnName);

        //only while filters is not implemented, needed to apply sorting
        this.filteredData = this.allRecords;
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

    applySort()
    {
        this.filterResults = Array.from(this.filteredData);

        this.filterResults.sort(this.compareFunction);

        this.setFilterResults(this.filterResults);
    }

    cancelSort()
    {
        this.setFilterResults(this.filteredData);
    }

    setFilterResults(data)
    {
        this.filterResults = data;

        this.emit(eventTypes.onResultsChanged);
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
        var element = this.filteredData.find(r => r.index === index);

        element.checked = !element.checked;
    }

    setFilterValue(value)
    {
        this.filterValue = value;

        console.log(this.filterValue);

        //here we should execute process to filter all data and if needed apply sort and set new data as filter results
    }

    reduce(action)
    {
        switch(action.type)
        {
            case actionTypes.applySort : {
                this.applySort(action.compareFunction);
                break;
            };

            case actionTypes.cancelSort : {
                this.cancelSort();
                break;
            };

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
            }
        }
    }
}

const filterDataStore =  new FiltersDataStore();

dispatcher.register(filterDataStore.reduce.bind(filterDataStore));

filterDataStore.addTables(mockData);

window.filterDataStore = filterDataStore;

export default filterDataStore;