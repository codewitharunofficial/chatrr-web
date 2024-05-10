import { SearchRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react'
import { useSearch } from '../Contexts/SearchContext';

const Search = ({chats, messages}) => {

  const [isSearching, setIsSearching] = useSearch();
  const [keywords, setKeyWords] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (e) => {
       setIsSearching(true);
    
  }

  return (
    <div style={{width: '80%', padding: 5, border: '1px solid gray', borderRadius: 30, marginTop: 3}}>
      <input onChange={(e) => {setKeyWords(e.target.value); handleChange()}} style={{width: '90%', outline: 'none', borderRadius: 30, paddingInline: 10, border: "none"}} placeholder='search' type="text" />
      <SearchRounded sx={{":hover": {color: "blue", cursor: "pointer"}}} />
    </div>
  )
}

export default Search;
