import EventEmitter from 'events';
import actionTypes from '../Actions/ActionTypes'
import dispatcher from '../Dispatcher/Dispatcher'
import mockData from '../mockes'
import eventTypes from '../Events/EventTypes'

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
        
        this.filteredData = [];
        this.filterResults = [];

        //records which wasn't filtered
        this.allRecords = [];
    }

    getColumns()
    {
        return this.columns;
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
                    columnName: col.columnName
                })
            }
        })

        this.emit(eventTypes.onColumnsChanged);
    }

    //when table checked to false
    removeColumns(tableName)
    {
        this.columns = this.columns.filter((col) => col.tableName !== tableName);

        this.emit(eventTypes.onColumnsChanged);
    }


    toggleColumn(tableName, columnName)
    {
        //we should exclude records contained in the current column
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

    applyFilter(filterFunction)
    {
        var newData = this.allRecords.filter(filterFunction);

        this.setFilterResults(newData);
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
            }
        }
    }
}

const filterDataStore =  new FiltersDataStore();

dispatcher.register(filterDataStore.reduce.bind(filterDataStore));

filterDataStore.addTables(mockData);

window.filterDataStore = filterDataStore;

export default filterDataStore;