import { Card, Typography , Button } from "@mui/material";import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState , useEffect } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';

function swap(arr,i,j){
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
function bsort(arr){
  var i , j;
  for(i = 0 ; i< arr.length ; i++){
    for (j = 0 ; j<arr.length ; j++){
      if (arr[i].averageRating === arr[j].averageRating){
        if (arr[i].budget < arr[j].budget){
          swap(arr, i ,j);
        
        }
      }
      else if (arr[i].averageRating < arr[j].averageRating)
        {
          swap(arr,i,j);
        } 
     
    }
  }
  console.log({arr})
  
}
var arr = [1,2,33,45,11,6];

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const MainComponent = () => {
  const [searchText, setSearchText] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(searchValue, 'i');
    const filteredRows = movieList.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]?.toString());
      });
    });
    setMovieList(filteredRows);
  };
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(movieList);
  useEffect(() => {
    const fetchMovies = async () => {
      const url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '6badb7529emsha748e4001852dd7p17819cjsnf9eb0cfb6df0',
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = JSON.parse(result);
        console.log({data});
        
        // console.log("This is the sorted movie list
        //setMovieList(data);
        bsort(data);

        console.log({data});
        setMovieList(data);
        setLoading(false);
        
        
        
        
      } 
       catch (error) {
        console.error('Error fetching movies:', error);
      } 
    };

    fetchMovies();
  }, []);

 return (
    <div>
    <Card
      sx={{ display: "flex", flexDirection: "column", gap: "2rem", p: "4rem" }}
      variant="outlined"
      
    >
      
      {loading ? (<img src = "Black And White Thinking GIF by Tobias Rothe.gif"></img> ):(
      <div>
        <TextField
    id="search"
    label="Search"
    variant="outlined"
    value={searchText}
    onChange={(event) => setSearchText(event.target.value)}
    onDoubleClick={(event) => requestSearch(event.target.value)}
    style={{ marginBottom: '16px' }}
    />
   
       
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Movie Name </TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Genres</TableCell>
            <TableCell align="right">Rating&nbsp;(g)</TableCell>
            <TableCell align="right">Budget&nbsp;($)</TableCell>
            <TableCell align="right">Runtime&nbsp;(Min)</TableCell>
            <TableCell align="right">More Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movieList === undefined ? (
            false
          ) : (
            movieList?.map((row) => (
              <TableRow
                key={row.originalTitle }
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <a href ={`${row.url}`} >{row.originalTitle}</a>
                </TableCell>
                <TableCell align="right">{row.startYear}</TableCell>
                <TableCell align="right">{row.genres[0]} , {row.genres[1]}</TableCell>
                <TableCell align="right">{row.averageRating}</TableCell>
                <TableCell align="right">{row.budget}</TableCell>
                <TableCell align="right">{row.runtimeMinutes}</TableCell>
                <TableCell align="right"><a href = {`${row.url}`} target = "_blank"><Button>Learn More</Button></a></TableCell>
              </TableRow>
            ))
          )}
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
)}
      
      
     
    </Card>
    </div>
  );
};

export default MainComponent;
