var filters = [];

var fullMatchFilter = {
    label: "**",
    filterType: "FULL_MATCH",

    filterFunction: function(filterValue, record) {   
        return record.data === filterValue;
    }
}

filters.push(fullMatchFilter);

var partialMatchFilter = {
    label: "*_",
    filterType: "PARTIAL_MATCH",

    filterFunction: function(filterValue, record) {
        return record.data.includes(filterValue);
    }
}

filters.push(partialMatchFilter);

var startWithFilter = {
    label: '""',
    filterType: "STARTS_WITH",

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
        this.filters = filters;
    }

    getFilters()
    {
        return this.filters;
    }
}

var filterHelper = new FilterHelper();

export default filterHelper;