
const post = (state = {}, action) => {
    switch (action.type) {
       
     
         case 'GETPOST':
          
            return {
                     ...state,
                feed:action.payload,
            }
    
        default:
            return state;
    }
}
export default post;