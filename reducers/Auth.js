
const user = (state = {}, action) => {

    switch (action.type) {

        case 'SIGNUP':
            return action.payload

        case 'LOGIN':
            return action.payload

        case 'FB_LOGIN':
            return action.payload;

        default:
            return state;
    }
}
export default user