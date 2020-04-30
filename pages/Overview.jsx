import { PinnedNotes } from '../NoteApp/NoteCmp/PinnedNotes.jsx';
import { EmailServices } from '../EmailApp/EmailAppServices.js';
import { EmailOverView } from './OverviewCmps/EmailOverView.jsx';
import {BookApp} from '../BookApp/BookApp.jsx';
import { StorageServices } from '../services/StorageService.js';
import { Books } from '../BookApp/BookCmps/BookToPreview.jsx';
const Router = ReactRouterDOM.HashRouter;
const { NavLink } = ReactRouterDOM;
export class Overview extends React.Component {
  state = {
    emails: null,
    notes: null
  };
  componentDidMount() {
    this.setState({ emails: EmailServices.getOverviewEmails() });
   this.loadNotes()
  }

  

  onRemove = (id) => {
    EmailServices.remove(id);
    this.setState({ emails: EmailServices.getOverviewEmails() });
  };

 loadNotes = () => {
  const newNotes = StorageServices.load('notes')
  this.setState({ notes: newNotes });
  
 }
  
  render() {
    const { emails } = this.state;
    const { notes } = this.state;
    
    return (
      <div className="overview">
        <h1>Welcome To Apsus</h1>
        <section className="all-apps">
          <EmailOverView></EmailOverView>

          <section className="note-app-board">
            <div className="board-header">
              <NavLink exact to="/note" className='pure-material-button-contained'>
                Open App
              </NavLink>
              { notes && <PinnedNotes notes={notes}/>}
            </div>
          </section>
          <section className="book-app-board">
            <div className="board-header">
            
              <NavLink exact to="/book" className=''>
                <span className="pure-material-button-contained">

                BookApp
                </span>
               <Books></Books>
              </NavLink>
            </div>
           
          </section>
        </section>
      </div>
    );
  }
}
