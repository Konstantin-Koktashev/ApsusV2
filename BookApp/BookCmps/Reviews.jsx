import bookService from '../services/bookService.js';

export default class Reviews extends React.Component {
  state = {
    review: {
      userName: '',
      rate: '',
      comment: '',
    },
  };

  // componentDidMount() {
  //   const bookId = this.props.match.params.theBookId;

  //   if (bookId) {
  //     bookService.getById(bookId).then((book) => {
  //       this.setState({ book });
  //     });
  //   }
  // }

  handleInput = ({ target }) => {
    const field = target.name;
    const value = (target.type === 'number') ? parseInt(target.value) : target.value;
    this.setState((prevState) => {
      return {
        review: {
          ...prevState.review,
          [field]: value,
        },
      };
    });
    console.log(target)
  };

  // onSaveBook = (ev) => {
  //   ev.preventDefault();
  //   bookService
  //     .save(this.state.book)
  //     .then((savedBook) => {
  //       // console.log('Book succesfuly saved:', savedBook);
  //       this.props.history.push('/book');
  //     })
  //     .catch((err) => {
  //       // console.log('OOPs', err);
  //     });
  // };

  render() {
    const { review } = this.state;
    return (
      <div className="reviews">
        <h1>Reviews</h1>
        <form onSubmit={this.onSaveBook}>
          <label> Full Name: </label>
          <input
            autoFocus
            type="text"
            value={review.name}
            onChange={this.handleInput}
            name="userName"
          />
          <label> Your Rate (1-5): </label>
          <input
            type="number"
            value={(review.rate < 5 || review.rate > 0) ? review.rate : ''}
            onChange={this.handleInput}
            name="rate"
          />
          <label> Write Your Thoughts: </label>
          <input
            type="text"
            value={review.comment}
            onChange={this.handleInput}
            name="comment"
            className="textarea"
          />
          <button>Save</button>
        </form>
      </div>
    );
  }
}
