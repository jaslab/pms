export const PostalReducer = (state, action) =>{
    switch(action.type){
        case "ADD":
            return [...state, action.postal]
        case "REMOVE":
            return state.filter(postal => postal.id !== action.id)
        default:
            return state
    }
}