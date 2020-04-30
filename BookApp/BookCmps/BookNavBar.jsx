const { NavLink } = ReactRouterDOM


export default function NavBar(props) {
    return <nav>
        <ul>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/book'>Our Books</NavLink></li>
        </ul>
        <button onClick={() => {
            console.log('PROPS', props);
            
            props.history.goBack();
        }}>Back</button>
    </nav>
}