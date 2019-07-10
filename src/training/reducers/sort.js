var initialState = {
    by: 'name',
    value: 1 //A-Z
}

var sortReducer = (state = initialState, action) => {
    if (action.type === "SORT") {
        var { by, value } = action.sort;
        return { by, value };
    } return state;
    
}

export default sortReducer;