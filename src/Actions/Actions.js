import dispatcher from '../Dispatcher/Dispatcher';
import actionTypes from './ActionTypes'

export function includeColumn(tableId, columnId)
{
    dispatcher.dispatch({
        type: actionTypes.includeColumn,
        tableId,
        columnId
    })
}

export function toggleTable(tableName)
{
    dispatcher.dispatch({
        type: actionTypes.toggleTable,
        tableName
    })
}

export function toggleColumn(tableName, columnName)
{
    dispatcher.dispatch({
        type: actionTypes.toggleColumn,
        tableName,
        columnName
    })
}

export function addTable(table)
{
    dispatcher.dispatch({
        type: actionTypes.addTable,
        table
    })
}

export function setFilterResults(results)
{
    dispatcher.dispatch({
        type: actionTypes.setFilterResults,
        results
    })
}

export function applyFilter(filterFunction)
{
    dispatcher.dispatch({
        type: actionTypes.applyFilter,
        filterFunction
    })
}

export function applySort(compareFunction)
{
    dispatcher.dispatch({
        type: actionTypes.applySort,
        compareFunction
    })
}

export function cancelSort()
{
    dispatcher.dispatch({
        type: actionTypes.cancelSort,
    })
}

export function toggleRecord(index)
{
    dispatcher.dispatch({
        type: actionTypes.toggleRecord,
        index
    })
}

export function setFilterValue(value)
{
    dispatcher.dispatch({
        type: actionTypes.setFilterValue,
        value
    })
}

export function toggleFilter(index)
{
    dispatcher.dispatch({
        type: actionTypes.toggleFilter,
        index
    })
}