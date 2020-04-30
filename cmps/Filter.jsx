export  class Filter extends React.Component {
    state = {
        searchStr:''
    }
    handleChange = (ev) => {
        ev.preventDefault()
        const value = ev.target.value
        this.setState({searchStr:value},()=>{
            this.onFilter()
        })
    }
    onFilter = () => {
       
        this.props.onSetFilter(this.state.searchStr)
    }
    render() {
        const {searchStr } = this.state
        const placeHolder=this.props.placeHolder
        return (
                <form >
                    <label htmlFor=""></label>
                    <input type="text" name='search-box' value={ searchStr } onChange={ this.handleChange } placeholder={placeHolder} />
                </form>
        )
    }
}