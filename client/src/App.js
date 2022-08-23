import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const [bookList, setBookList] = useState([]);

  const [newReview, setNewReview] = useState('');

  // Display all books
  useEffect(()=>
  {
    Axios.get('http://localhost:3001/api/get').then((response)=>
    {
      setBookList(response.data);
    });
  }, []);

  // Add book to database
  const submitBook = ()=>
  {
    Axios.post('http://localhost:3001/api/insert', {
      title: title,
      author: author,
      genre: genre,
      rating: rating,
      review: review
    });

    setBookList([...bookList, {
      title: title,
      author: author,
      genre: genre,
      rating: rating,
      review: review
    }]);
  };

  // Delete book
  const deleteBook = (bookTitle)=>
  {
    Axios.delete(`http://localhost:3001/api/delete/${bookTitle}`);
  };

  // Update book review
  const updateBook = (bookTitle)=>
  {
    Axios.put('http://localhost:3001/api/update', {title: bookTitle, review: newReview});

    setNewReview('');
  }

  return (
    <div className="App">
      <h1>Bookshelf</h1>

      <form className='form' onSubmit={
        (e)=>{e.preventDefault(); 
        e.target.reset()}
        }>

        <label id='title'>Title</label>
        <input type='text' name='title' onChange={
          (e)=>{setTitle(e.target.value)}
          } />

        <label id='author'>Author</label>
        <input type='text' name='author' onChange={
          (e)=>{setAuthor(e.target.value)}
          } />

        <label id='genre'>Genre</label>
        <input type='text' name='genre' onChange={
          (e)=>{setGenre(e.target.value)}
          } />

        <label id='rating'>Rating</label>
        <input type='number' name='rating' onChange={
          (e)=>{setRating(e.target.value)}
          } />

        <label id='review'>Review</label>
        <input type='review' name='review' onChange={
          (e)=>{setReview(e.target.value)}
          } />

        <button onClick={submitBook}>Submit</button>
      </form>

      {bookList.map((val)=>
      {
        const allBooks =
        <div className='bookCard'>
          <div className='container'>
            <h2>{val.title}</h2>
            <h3>{val.author}</h3>
            <p>Genre: {val.genre}</p>
            <p>Rating: {val.rating}</p>
            <p>Review: {val.review}</p>
            <input type='text' onChange={(e)=>{setNewReview(e.target.value)}} />
            <button onClick={()=> {updateBook(val.title)}}>Update</button>
            <button onClick={()=> {deleteBook(val.title)}}>Delete</button>
          </div>

        </div>;
          return allBooks;
      })}
    </div>
  );
}

export default App;