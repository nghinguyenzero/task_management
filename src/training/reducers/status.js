var initialState = false;

var statusReducer = (state = initialState, action) => {
    if (action.type === "TOGGLE_STATUS") {
        state = !state;
    }
    return state;
}

export default statusReducer;