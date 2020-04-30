import EditNote from './NoteCmp/EditNote.jsx';
import {PinnedNotes} from './NoteCmp/PinnedNotes.jsx';
import Gallery from './NoteCmp/Gallery.jsx';
import NoteAppServices from './service/NoteServices.js';
import NewNotePreview from './NoteCmp/NewNotePreview.jsx';
import utilService from '../services/utilService.js';
import { NavLinks } from '../cmps/NavLinks.jsx';
import { Filter } from '../cmps/Filter.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
const { createBrowserHistory } = History;
const history = createBrowserHistory();

export class NoteApp extends React.Component {
  state = {
    notes: [],
    pinnedNotes: [],
    showSideBar: false,
    filterBy: '',

  };
  componentDidMount() {
    this.loadNotes();
    
  }

  loadNotes() {
    NoteAppServices.query(this.state.filterBy).then((notes) => {
      this.setState({ notes });
    });
  }


  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.loadNotes());
  };

  

  render() {
    const { notes } = this.state;
    const links = [
      { id: utilService.makeId(), url: '/note', name: 'MAIN' },
      { id: utilService.makeId(), url: '/note/edit', name: 'EDIT' },
      { id: utilService.makeId(), url: '/note/pinned', name: 'PINNED' },
      
    ];

    return (
      <div className="NotePage">
      

        <div className="NoteSearchBar">
          <Filter
            onSetFilter={this.onSetFilter}
            placeHolder="Search By content"
          ></Filter>

          <NavLinks
            links={links}
            navClass=""
            openClass=""
            closeClass=""
          ></NavLinks>
        </div>

        <h1>Manage your notes</h1>

        <div className="addBtnContainer">
        <Link to="/note/edit">
          <button className="addNoteBtn">
            +
          </button>{' '}
        </Link>
      </div>
      

        <Switch>
          <Route
            render={(props) => {
              return <EditNote history={history} />;
            }}
            path="/note/edit"
          />

              <Route 
                render={(props) => {
                  return <PinnedNotes notes={notes}/>
                }}
                path="/note/pinned"
              />

             


          <Route
            render={(props) => {
              return notes && <Gallery notes={notes} />;
            }}
            path="/note"
            />

            </Switch>
      
      </div>
    );
  }
}
