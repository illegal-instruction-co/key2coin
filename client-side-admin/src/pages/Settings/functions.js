export function handleChange(state,setState,name,value){
    return setState(state => {return {...state, [name]:value}})
}