import React, { useState, useContext } from 'react';
import { expenseContext } from '../App';
import { useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatePicker from 'react-datepicker';
import 'react-dates/initialize';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';



const AddExpense = () => {

    const { dispatch } = useContext(expenseContext);
    const history = useHistory();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [dateChange, setDateChange] = useState(new Date());
    const [note, setNote] = useState();
    const [descriptionError, setDescriptionError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [dateError, setDateError] = useState(false);


    const onDescriptionChange = (e) => {
        setDescriptionError(false);
        setDescription(e.target.value);
    }

    const onAmountChange = (e) => {
        setAmountError(false);
        setAmount(e.target.value);
    }

    const onNoteChange = (e) => {
        setNote(e.target.value);
    }

    const onSubmitValue = (e) => {
        e.preventDefault();
        if (description === '') {
            setDescriptionError(true);
        }
        if (amount === 0 || amount === '0') {
            setAmountError(true);
        }
        if (dateChange === null) {
            setDateError(true);
        }
        if (description !== '' && amount !== 0 && new Date(dateChange).getTime() !== 0) {
            const data = {};
            data.description = description;
            data.amount = parseInt(amount);
            data.createdAt = new Date(dateChange).getTime();
            data.note = '' || note;
            data.hide = false;
            console.log(data)
            axios.post('https://expensify-node.herokuapp.com/add-expense', { ...data }).then((res) => dispatch({
                type: 'ADD-EXPENSE',
                payload: res.data
            }))
            dispatch({ type: 'ORDER-BY-DATE' });
            history.push('/');
        }

    }

    return (
        <div className="content-container">
            <form className="form" onSubmit={(e) => onSubmitValue(e)}>
                <div className="page-header">
                    <h1 className="page-header__title">Add Expense</h1>
                </div>
                <div className="input-container">
                    <TextField
                        id="outlined-basic"
                        onChange={(e) => onDescriptionChange(e)}
                        label="Description" type='text' variant="outlined"
                    />
                    {descriptionError && <span className="error">description is required</span>}
                </div>
                <div className="input-container">
                    <TextField
                        id="outlined-basic"
                        onChange={(e) => onAmountChange(e)}
                        label="Amount" type='number' variant="outlined" />
                    {amountError && <span className="error">amount is required</span>}
                </div>
                <div className="center">
                    <DatePicker
                        selected={dateChange}
                        onChange={(date) => {
                            setDateChange(date);
                            setDateError(false);
                        }}
                        className="input-date"
                    />
                    {dateError && <span className="error" style={{ marginLeft: '10px' }}>you have to pick a date</span>}
                </div>
                <div className="center">
                    <textarea
                        className="input-textarea"
                        placeholder="Add a note for your expense (optional)"
                        onChange={(e) => onNoteChange(e)}
                    ></textarea>
                </div>
                <div className="center">
                    <Button variant="contained" type='submit' color="primary" style={{ "display": "inline-block" }}>
                        Save Expense
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddExpense;
