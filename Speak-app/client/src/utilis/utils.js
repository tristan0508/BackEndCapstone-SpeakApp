export const handleOpen = (state, setState) => {
    if(!state) {
        setState(true)
    } else {
        setState(false)
    }
}
