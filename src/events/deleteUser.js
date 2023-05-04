const deleteUser = (list,id, setList,close) => {

    setList(list.filter(f=>f.newId !== id))
    close()
}
 
export default deleteUser;