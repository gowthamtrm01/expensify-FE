
const reducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE-EXPENSE":
            return action.payload
        case "ADD-EXPENSE":
            return [...state, action.payload];
        case "REMOVE-EXPENSE":
            return state.filter((expense) => expense._id !== action.id);
        case "EDIT-EXPENSE":
            return state.map((expense) => {
                if (expense._id === action.payload._id) {
                    return action.payload;
                }
                return expense;
            })
        case "SEARCH-EXPENSE":
            return [...action.payload];
        case "ORDER-BY-AMOUNT":
            return state.sort((a, b) => {
                if (a.amount < b.amount) {
                    return 1
                } else if (a.amount > b.amount) {
                    return -1
                } else {
                    return 0
                }
            });
        case "ORDER-BY-DATE":
            return state.sort((a, b) => {
                if (a.createdAt < b.createdAt) {
                    return 1
                } else if (a.createdAt > b.createdAt) {
                    return -1
                } else {
                    return 0
                }
            })
        default:
            return state;
    }
}

export default reducer;