import bookService from "../services/bookService.js"

export default class BookEdit extends React.Component {

    state = {
        book: {
            id: '',
            thumbnail: '',
            title: '',
            authors: '',
            amount: ''
        }

    }

    componentDidMount() {
        const bookId = this.props.match.params.theBookId

        if (bookId) {
            bookService.getById(bookId)
                .then(book => {
                    this.setState({ book })
                })
        }
    }

    handleInput = ({target}) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState(prevState => {
            return {
                book: {
                    ...prevState.book,
                    [field]: value
                }
            }
        })
       
    }

    onSaveBook = (ev) => {
        ev.preventDefault()
        bookService.save(this.state.book)
        .then(savedBook => {
            // console.log('Book succesfuly saved:', savedBook);
            this.props.history.push('/book')
        })
        .catch(err => {
            // console.log('OOPs', err);
            
        })
    }
    

    render() {
        const {book} = this.state
        return (
            <div>
                <h1>Add Book:</h1>
            <form onSubmit={ this.onSaveBook}>
               <label> Thumbnail </label> 
                <input autoFocus type="text" value={book.thumbnail} onChange={ this.handleInput } name="thumbnail"/>
               <label> Title </label> 
                <input type="text" value={book.title} onChange={ this.handleInput }  name="title"/>
               <label> Author </label> 
                <input type="text" value={book.authors} onChange={ this.handleInput } name="authors"/>
               <label> Price </label> 
                <input type="number" value={book.amount} onChange={ this.handleInput } name="amount"/>
                <button>Save</button>
            </form>
            </div>
        )
    }
}
