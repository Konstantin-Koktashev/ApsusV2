// import { NavBar } from './cmps/NavBar.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/about.jsx';
import { Overview } from './pages/Overview.jsx';
import { EmailApp } from './EmailApp/EmailApp.jsx';
import { NoteApp } from './NoteApp/NoteApp.jsx';
import { BookApp } from './BookApp/BookApp.jsx';
import { NavLinks } from './cmps/NavLinks.jsx';
import utilService from './services/utilService.js';
import { Header } from './cmps/header.jsx';
import { eventBus } from './services/eventBusService.js';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, NavLink } = ReactRouterDOM;
const history = History.createBrowserHistory();

// const History = History.createBrowserHistory();

export class App extends React.Component {
  constructor() {
    super();
    this.state = { screenWidth: null };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions());
}


updateWindowDimensions() {
  this.setState({ screenWidth: window.innerWidth },()=>{
    eventBus.emit('screenResized',this.state.screenWidth)
   });
}

  render() {
    const links = [
      {
        id: utilService.makeId(),
        url: '/',
        name: 'Home',
      },
      {
        id: utilService.makeId(),
        url: '/faq',
        name: 'FAQ',
      },
      {
        id: utilService.makeId(),
        url: "/about",
        name: 'About',
      },
      {
        id: utilService.makeId(),
        url: "/signup",
        name: 'SignUp'
      },
      {
        id: utilService.makeId(),
        url: "/login",
        name: 'Login'
      },
    ];

    return (
      <Router>
        <Header></Header>
        <Switch>
          <div className="wrapper">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route component={EmailApp} path="/email" />
            <Route component={NoteApp} path="/note" />
            <Route  component={BookApp} path="/book" />
            <Route exact component={Overview} path="/app" />
            <footer>Footer</footer>
          </div>
        </Switch>
      </Router>
    );
  }
}
