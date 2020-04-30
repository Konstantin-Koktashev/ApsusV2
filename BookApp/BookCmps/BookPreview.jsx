import bookService from '../services/bookService.js';
const { Link } = ReactRouterDOM


export default function BookPreview(props) {
    const { book } = props
    let {amount, currencyCode} = book.listPrice;
    
    return (
        <Link to={`/book/${book.id}/${book.title}` }>
        <article className="book-preview" >
            <img src={ `${book.thumbnail}` } alt="" />
            <p className="title">{ book.title }</p>
            <p>By { book.authors[0]}</p>
            <p className={bookService.setAmountColor(+amount)}> { amount } {bookService.convertToCurrency(currencyCode)}</p>
        </article>
        </Link>
         
    )
}

