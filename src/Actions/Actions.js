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

export function includeTable(tableId)
{
    dispatcher.dispatch({
        type: actionTypes.includeTable,
        tableId
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