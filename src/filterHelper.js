var filters = [];

var fullMatchFilter = {
    label: "**",
    filterFunction: function(filterValue, record) {   
        return record.data === filterValue;
    }
}

filters.push(fullMatchFilter);

var partialMatchFilter = {
    label: "*_",
    filterFunction: function(filterValue, record) {
        return record.data.includes(filterValue);
    }
}

filters.push(partialMatchFilter);

var startWithFilter = {
    label: '""',
    filterFunction: function(filterValue, record)
    {
        return record.data.startsWith(filterValue);
    }
}

filters.push(startWithFilter);


class FilterHelper
{
    constructor()
    {
        this.initializeFilters();
    }

    initializeFilters()
    {
        this.filters = filters.map((f, index) => {
            var filter = {...f};
            filter.index = index

            return filter;
        })
    }

    getFilters()
    {
        return this.filters;
    }
}

var filterHelper = new FilterHelper();

export default filterHelper;