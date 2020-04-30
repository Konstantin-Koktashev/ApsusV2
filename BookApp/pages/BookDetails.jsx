import bookService from '../services/bookService.js';
import LongTxt from '../BookCmps/LongTxt.jsx';
import PageCount from '../BookCmps/PageCount.jsx';
import Reviews from '../BookCmps/Reviews.jsx';
const { Link } = ReactRouterDOM;

export default class BookDetails extends React.Component {
  state = {
    isLongTxtShown: false,
    book: null,
    showMoreInfo: false
  };

  toggleDesc = () => {
    this.setState((prevState) => ({
      isLongTxtShown: !prevState.isLongTxtShown,
    }));
  };

  toggleInfo = () => {
    this.setState((prevState) => ({
      showMoreInfo: !prevState.showMoreInfo,
    }));
    
  };

  componentDidMount() {
    const id = this.props.match.params.theBookId;
    // console.log('this.props.match.params', this.props.match.params);

    bookService.getById(id).then((book) => {
      this.setState({ book });
    });
  }
  removeBook = () => {
    bookService
      .remove(this.state.book.id)
      .then(() => {
        // console.log('Book was removed');
        this.props.history.push('/book');
      })
      .catch((err) => {
        alert('OOPs, try again');
        // console.log('ERR:', err);
      });
  };

  // show more info
  handleClick = (event) => {
    console.log(this.state.showMoreInfo)
    if (!this.state.showMoreInfo && event.target) {
      event.target.style = `transform: translateX(-40px);`
      this.toggleInfo()
    }
    else {
      event.target.style = '';
      this.toggleInfo()
    }
    
 }



 

  render() {
    const { book } = this.state;
    const Loading = <p>Loading...</p>;
    const newDate = new Date();
    const currYear = newDate.getFullYear()

    return !book ? (
      Loading
    ) : (
      <div>
        <div className="actionsOnBook">
          <Link to={`/book/edit/${book.id}`} book={book} className="edit">
            Edit
          </Link>
          <button onClick={() => this.removeBook()}>Delete</button>
        </div>
        <div className="details">
          <div className="left-container">
            <img src={`${book.thumbnail}`} alt="" className="book-img" />
            <div className="sale">
              {' '}
              {book.listPrice.isOnSale ? (
                <img src="/assets/img/sale.svg" className="wobble-hor-top"></img>
              ) : (
                ''
              )}{' '}
            </div>
            <h2> {book.title} </h2>
            <p> {book.subtitle} </p>
            <LongTxt
              text={book.description}
              isLongTxtShown={this.state.isLongTxtShown}
              toggleDesc={this.toggleDesc}
            />
          </div>

          <div className="moreInfo" onClick={ this.handleClick } >
              <p>
                Categories: {`${book.categories[0]}, `} {book.categories[1]}{' '}
              </p>
              <p>Language: {book.language.toUpperCase()} </p>
              <PageCount pageCount={book.pageCount}></PageCount>
              <p>Publishing Year: {book.publishedDate} - {(currYear - book.publishedDate > 10) ? 'Veteran Book' : '' } {(currYear - book.publishedDate < 1) ? 'New!' : ''} </p>
            <p>
              Price -{' '}
              {
                <span className={bookService.setAmountColor(+book.listPrice.amount)}>
                  {book.listPrice.amount}{' '}
                  {bookService.convertToCurrency(book.listPrice.currencyCode)}
                </span>
              }
            </p>
          </div>

          <Reviews></Reviews>
        </div>
      </div>
    );
  }
}
