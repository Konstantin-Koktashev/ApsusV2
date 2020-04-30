const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, NavLink } = ReactRouterDOM;
const history = History.createBrowserHistory();

// import BookNavBar from './BookCmps/BookNavBar.jsx';
import Book from './pages/Book.jsx';
import BookDetails from './pages/BookDetails.jsx';
import BookEdit from './pages/BookEdit.jsx';
// import AboutUs from './pages/AboutUs.jsx';

export class BookApp extends React.Component {
  render() {
    return (
      <Router>

        <section className="bookApp-content">
        <main className="bookMain">
          <Switch>
            {/* <Route exact component={AboutUs} path="/about" /> */}
            <Route exact component={BookEdit} path="/book/add" />
            <Route component={BookEdit} path="/book/edit/:theBookId" />
            <Route
              component={BookDetails}
              path="/book/:theBookId/:theBookName"
            />
            <Route component={Book} path="/book" />
            {/* <Route component={Home} path="/" /> */}
          </Switch>
        </main>
        </section>
      
      </Router>
    );
  }
}
