import React, { useState, useContext } from 'react';
import { expenseContext } from '../App';
import { useHistory, useParams } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatePicker from 'react-datepicker';
import 'react-dates/initialize';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const EditExpense = () => {
    const { state, dispatch } = useContext(expenseContext);
    const history = useHistory();
    const { id } = useParams();
    const currentExpense = state.find((expense) => expense._id === id)

    const [description, setDescription] = useState(currentExpense.description);
    const [amount, setAmount] = useState(currentExpense.amount);
    const [dateChange, setDateChange] = useState(currentExpense.createdAt);
    const [note, setNote] = useState(currentExpense.note);

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const onAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const onNoteChange = (e) => {
        setNote(e.target.value);
    }
    const deleteExpense = () => {
        axios.delete(`https://expensify-node.herokuapp.com/delete-expense/${currentExpense._id}`).then((res) => dispatch({
            type: 'REMOVE-EXPENSE',
            id: res.data._id
        }))
        history.push('/')
    }
    const onSubmitValue = (e) => {
        e.preventDefault();
        currentExpense.description = description;
        currentExpense.amount = parseInt(amount);
        currentExpense.createdAt = dateChange;
        currentExpense.note = note;
        axios.patch(`https://expensify-node.herokuapp.com/update-expense/${currentExpense._id}`, { ...currentExpense }).then((res) => dispatch({
            type: 'EDIT-EXPENSE',
            payload: res.data
        }))
        dispatch({ type: 'ORDER-BY-DATE' })
        history.push('/');
    }

    return (
        <div className="content-container">
            <form className="form" onSubmit={(e) => onSubmitValue(e)}>
                <div className="page-header">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
                <div className="input-container">
                    <TextField
                        id="outlined-basic"
                        onChange={(e) => onDescriptionChange(e)}
                        label="Description" type='text' variant="outlined"
                        value={description}
                    />
                    {!description && (<span className="error">description is required</span>)}
                </div>
                <div className="input-container">
                    <TextField
                        id="outlined-basic"
                        onChange={(e) => onAmountChange(e)}
                        label="Amount" type='number' variant="outlined"
                        value={amount}
                    />
                    {!amount && (<span className="error">amount is required</span>)}
                </div>
                <div className="center">
                    <DatePicker
                        selected={dateChange}
                        onChange={(date) => setDateChange(date)}
                        className="input-date"
                    />
                </div>
                <div className="center">
                    <textarea
                        className="input-textarea"
                        placeholder="Add a note for your expense (optional)"
                        onChange={(e) => onNoteChange(e)}
                        value={note}
                    ></textarea>
                </div>
                <div className="button button-move">
                    <Button variant="contained" type='submit' color="primary" style={{ "display": "inline-block" }}>
                        Save Expense
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteExpense()}
                    >
                        Remove Expense
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditExpense;