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

export function toggleSort()
{
    dispatcher.dispatch({
        type: actionTypes.toggleSort
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

export function toggleSelect()
{
    dispatcher.dispatch({
        type: actionTypes.toggleSelect
    })
}

export function toggleDropdown(name)
{
    dispatcher.dispatch({
        type: actionTypes.toggleDropdown,
        name
    })
}