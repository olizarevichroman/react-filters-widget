import dispatcher from '../Dispatcher/Dispatcher';
import ActionTypes from './ActionTypes'

export function includeColumn(tableId, columnId)
{
    dispatcher.dispatch({
        type: ActionTypes.includeColumn,
        tableId,
        columnId
    })
}

export function toggleTable(tableName)
{
    dispatcher.dispatch({
        type: ActionTypes.toggleTable,
        tableName
    })
}

export function toggleColumn(tableName, columnName)
{
    dispatcher.dispatch({
        type: ActionTypes.toggleColumn,
        tableName,
        columnName
    })
}

export function addTable(table)
{
    dispatcher.dispatch({
        type: ActionTypes.addTable,
        table
    })
}

export function setFilterResults(results)
{
    dispatcher.dispatch({
        type: ActionTypes.setFilterResults,
        results
    })
}

export function toggleSort()
{
    dispatcher.dispatch({
        type: ActionTypes.toggleSort
    })
}

export function toggleRecord(index)
{
    dispatcher.dispatch({
        type: ActionTypes.toggleRecord,
        index
    })
}

export function setFilterValue(value)
{
    dispatcher.dispatch({
        type: ActionTypes.setFilterValue,
        value
    })
}

export function toggleFilter(filterType)
{
    dispatcher.dispatch({
        type: ActionTypes.toggleFilter,
        filterType
    })
}

export function toggleSelect()
{
    dispatcher.dispatch({
        type: ActionTypes.toggleSelect
    })
}

export function toggleDropdown(name)
{
    dispatcher.dispatch({
        type: ActionTypes.toggleDropdown,
        name
    })
}