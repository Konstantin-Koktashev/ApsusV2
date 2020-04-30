const { Link } = ReactRouterDOM

export default class BookFilter extends React.Component {
    state = {
        filter: {
            name: '',
            maxPrice: '',
            minPrice: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }
    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }
    render() {
        const { name, maxPrice, minPrice } = this.state.filter
        return (
            <div className="filter">
                <div className="headline">
                <Link to="/book/add" className="addBook">Add Book</Link>
                <h1>Find your favorite books!</h1>
                </div>
                <form>
                    <div>
                    <label htmlFor="">By Name</label>
                    <input type="text" name='name' value={ name } onChange={ this.handleChange } />
                    </div>
                    <div>
                    <label htmlFor="">min price</label>
                    <input type="number" name='minPrice' value={ minPrice } onChange={ this.handleChange } />
                    </div>
                    <div>
                    <label htmlFor="">max price</label>
                    <input type="number" name='maxPrice' value={ maxPrice } onChange={ this.handleChange } />
                    </div>
                </form>
            </div>
        )
    }
}