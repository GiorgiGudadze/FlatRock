import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
const SearchBar = (props) => {

    const [term, setTerm] = useState('')

    const onSearchChange = (val) =>{
        setTerm(val)
    }

    useEffect(()=>{
        props.setWord(term)
    },[term])

    return ( 
        <div className='searchCnt'>
            <input onChange={(e)=>onSearchChange(e.target.value)} value={term} className="searchCnt_input" type="text" placeholder="Type to filer the table" />
            <SearchIcon/>
        </div>
     );
}
 
export default SearchBar;