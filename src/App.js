import React, { createContext, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/dashboard';
import AddExpense from './Components/addExpense';
import Navbar from './Components/navbar';
import reducer from './Components/reducer';
import EditExpense from './Components/editExpense';
import axios from 'axios';


const expenseContext = createContext(null);
export { expenseContext };

function App() {

  const expenses = [];
  const [state, dispatch] = useReducer(reducer, expenses);

  useEffect(() => {
    axios.get('https://expensify-node.herokuapp.com/get-all-expense').then((res) => dispatch({
      type: "INITIALIZE-EXPENSE",
      payload: res.data
    }))
    dispatch({ type: "ORDER-BY-DATE" })
  }, [])


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <expenseContext.Provider value={{ state, dispatch }}>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route exact path='/add-expense'>
              <AddExpense />
            </Route>
            <Route exact path='/edit-expense/:id'>
              <EditExpense />
            </Route>
          </expenseContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
