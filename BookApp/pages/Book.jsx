const { Link } = ReactRouterDOM

import bookService from '../services/bookService.js';
import BookList from '../BookCmps/BookList.jsx';
import BookFilter from '../BookCmps/BookFilter.jsx';

export default class Book extends React.Component {
  state = {
    books: [],
    filterBy: null,
    bookIdToEdit: null
  };
  
  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    bookService.query(this.state.filterBy)
    .then(books => {
        this.setState({ books })
    })
  }

  
onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.loadBooks())
}
onDelete = (bookId) => {
  bookService.remove(bookId)
  .then(()=>{
      this.loadBooks()
  })
}

  render() {
      const {books} = this.state
      
    return (
      <section>
        
                { <BookFilter onSetFilter={ this.onSetFilter } /> }
                { books &&
                    <BookList books={ books } /> }
      </section>
    );
  }
}
