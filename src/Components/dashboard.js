import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expenseContext } from '../App';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpenseSummary from './expenseSummary';



const Dashboard = () => {

    const history = useHistory();
    const [sortBy, setSortBy] = useState('amount');
    const { state, dispatch } = useContext(expenseContext);

    useEffect(() => {
        dispatch({ type: "ORDER-BY-DATE" })
    }, [])

    const conversion = (amount) => {
        let number = amount
        number = number.toString();
        let lastThree = number.substring(number.length - 3);
        const otherNumbers = number.substring(0, number.length - 3);
        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
            const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            return res
        } else {
            return number
        }
    }

    const onSelectChange = (e) => {
        setSortBy(e.target.value);
        if (sortBy === 'amount') {
            dispatch({ type: "ORDER-BY-AMOUNT" })
        } else if (sortBy === 'date') {
            dispatch({ type: "ORDER-BY-DATE" })
        }
    }

    const onSearchChange = (e) => {
        const value = e.target.value;
        if (value) {
            const filterObj = state.map((expense) => {
                if (!expense.description.toLowerCase().includes(value.toLowerCase())) {
                    expense.hide = true;
                    return expense;
                }
                return expense;
            })
            dispatch({
                type: "SEARCH-EXPENSE",
                payload: filterObj
            })
        } else {
            const allExpense = state.map((expense) => {
                expense.hide = false;
                return expense;
            })
            dispatch({
                type: "SEARCH-EXPENSE",
                payload: allExpense
            })
        }
    }

    return (
        <div className="content-container">
            <ExpenseSummary />
            <div className="button">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/add-expense')}
                >
                    Add Expense
                </Button>
            </div>
            <div className="search-bar">
                <TextField
                    id="filled-basic"
                    label="search expenses"

                    variant="filled"
                    onChange={(e) => { onSearchChange(e) }}
                />
                <div className="selector">
                    <FormControl variant="filled">
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={sortBy}
                            onChange={(e) => onSelectChange(e)}
                        >
                            <MenuItem value={'amount'}>Date</MenuItem>
                            <MenuItem value={'date'}>Amount</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div>
                <div className="list-header">
                    <div className='list-title'>Expense</div>
                    <div className='list-title' >Amount</div>
                </div>
                {state.length === 0 ? <p className="center">No Expenses</p> :
                    state.map((expense, index) => {
                        if (expense.hide) {
                            return undefined
                        } else {
                            return (
                                <Link className="link" to={`/edit-expense/${expense._id}`} key={index} >
                                    <div className="list-change">
                                        <h3 className="list-item__title">{expense.description}</h3>
                                        <span className="list-item__sub-title">{moment(expense.createdAt).format('MMMM Do,YYYY')}</span>
                                    </div>
                                    <h3 className="list-item__data">₹ {conversion(expense.amount)}</h3>
                                </Link>
                            )
                        }
                    })
                }
            </div>
        </div>
    );
}

export default Dashboard;
