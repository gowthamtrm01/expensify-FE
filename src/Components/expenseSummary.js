import React, { useContext } from 'react';
import { expenseContext } from '../App';

const ExpenseSummary = () => {

    const { state } = useContext(expenseContext);

    const total = (expenses) => {
        let number = expenses.map((expense) => expense.amount).reduce((sum, value) => sum + value, 0);
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

    return (
        <div>
            <h1>Viewing <b>{state.length}</b> {state.length === 1 ? 'expense' : 'expenses'} totalling <b>₹ {total(state)}</b></h1>
        </div>
    )
}

export default ExpenseSummary;