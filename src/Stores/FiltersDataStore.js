import EventEmitter from 'events';
import actionTypes from '../Actions/ActionTypes'
import dispatcher from '../Dispatcher/Dispatcher'

const mock = ["Editor", "Test", "Test story", "Cross","Editor", "Test", "Test story", "Cross"];

const mockResults = [
    "(All)", "Pre Roll", "Axfs", "ewr435345", "Tewrewr", "Rrewfdsf", "Xasdfas","12214g", "vvvv","34324", "scvbcvb", "sadfmtyuty"
]

class FiltersDataStore extends EventEmitter
{
    constructor()
    {
        super();

        this.tables = mock;
        this.columns = mock;

        //filtered records
        this.filterResults = mockResults;
        this.filteredData = mockResults;

        //records which wasn't filtered
        this.allRecords = mockResults;
    }

    getColumns()
    {
        return this.columns;
    }

    getTables()
    {
        return this.tables;
    }

    getFilterResults()
    {
        return this.filterResults;
    }

    addTable(table)
    {
        this.tables.push(table);

        this.emit("onTablesChanged");
    }

    includeColumn(tableId, columnId)
    {


        this.emit("onColumnsChanged");
    }

    applySort(compareFunction)
    {
        var newArray = Array.from(this.filteredData);

        newArray.sort(compareFunction);

        this.setFilterResults(newArray);
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

        this.emit("onResultsChanged");
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
            }
        }
    }
}

const filterDataStore =  new FiltersDataStore();

dispatcher.register(filterDataStore.reduce.bind(filterDataStore));

export default filterDataStore;