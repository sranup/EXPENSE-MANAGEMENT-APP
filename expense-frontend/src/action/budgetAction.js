import axios from "axios"

export const asyncGetBudget = () => {
    return (dispatch) => {
        axios.get('http://localhost:3100/user/budget', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const budget = response.data
                dispatch(setBudget(budget))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const setBudget = (budget) => {
    return {
        type: "SET_BUDGET",
        payload: budget
    }
}

export const asyncUpdateBugdet = (id, data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3100/user/budget/${id}`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const updatedBudget = response.data
                dispatch(budgetUpdate(updatedBudget))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const budgetUpdate = (updatedBudget) => {
    return {
        type: "UPDATED_BUDGET",
        payload: updatedBudget
    }
}