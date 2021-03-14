export function handleChange(setState,name,value){
    return setState(state => {return {...state, [name]:value}})
}