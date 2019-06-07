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
        
        this.filteredData = mockResults.map((e, index) => ({data: e, index, checked: false}));
        this.filterResults = this.filteredData;

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

    applySort(compareFunction)
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

        this.emit("onResultsChanged");
    }

    toggleRecord(index)
    {
        var element = this.filteredData.find(r => r.index === index);

        element.checked = !element.checked;

        this.setFilterResults(this.filterResults);
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
            }
        }
    }
}

const filterDataStore =  new FiltersDataStore();

dispatcher.register(filterDataStore.reduce.bind(filterDataStore));

export default filterDataStore;