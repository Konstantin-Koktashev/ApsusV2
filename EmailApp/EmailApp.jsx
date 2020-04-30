import { EmailList } from './EmailComponents/EmailList.jsx';
import { EmailCompose } from './EmailComponents/EmailCompose.jsx';
import { EmailDetails } from './EmailComponents/EmailDetails.jsx';
import { EmailServices } from './EmailAppServices.js';
import { Filter } from '../cmps/Filter.jsx';
import { NavLinks } from '../cmps/NavLinks.jsx';
import utilService from '../services/utilService.js';
// import { EmailInbox } from './EmailInbox.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const { createBrowserHistory } = History;
const history = createBrowserHistory();

export class EmailApp extends React.Component {
  state = {
    emails: null,
    filterBy: '',
    catagory:''
  };
  componentDidMount() {
    this.loadEmails();
  }
  async loadEmails(catagory) {
    if (catagory) {
      const emails = await EmailServices.getEmailByCatagory(catagory);
      this.setState({ emails: emails });
    } else {
      EmailServices.query(this.state.filterBy).then((emails) => {
        this.setState({ emails });
      });
    }
  }
  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.loadEmails());
  };
  onDelete = (emailId) => {
    EmailServices.remove(emailId);
    this.loadEmails();
  };
  toggleImportance = (emailId) => {
    EmailServices.toggleEmailImportance(emailId);
    this.loadEmails(this.state.catagory);
  };
  onReadEmail = (emailId) => {
    EmailServices.setEmailToRead(emailId);
    this.loadEmails();
  };
  onCategoryChange =async  (catagory) => {
    const emails=await EmailServices.getEmailByCatagory(catagory)
    debugger
    this.setState({emails,catagory})
  };
  render() {
    const { emails } = this.state;
    const location = this.props.location.pathname;
    const links = [
      { id: utilService.makeId(), url: 'email/inbox', name: 'Inbox' },
      { id: utilService.makeId(), url: 'email/starred', name: 'Starred' },
      { id: utilService.makeId(), url: 'email/send', name: 'Sent' },
      { id: utilService.makeId(), url: 'email/drafts', name: 'Drafts' },
    ];

    return (
      <div className="email-wrapper">
          <NavLinks
onCategoryChange={this.onCategoryChange}
  links={links}
  navClass="email-navbar"
  openClass="email-open-nav"
  closeClass="email-close-nav"
></NavLinks>

        <Switch>
          <Route
            render={(props) => <EmailCompose {...props} />}
            path="/email/compose"
          />
          <Route
            render={(props) => <EmailInbox {...props} />}
            path="/email/inbox"
          />

          <Route
            render={(props) => {
              return (
                
                emails && (
                  <div className="main-email-app-body">
                  <section className="filter-search-bar">

                  <Filter
                    onSetFilter={this.onSetFilter}
                    placeHolder="Search By Sender,subject,Id"
                  ></Filter>
                </section>
                  <EmailList
                    emails={emails}
                    toggleImportance={this.toggleImportance}
                    onReadEmail={this.onReadEmail}
                    onCategoryChange={this.onCategoryChange}
                    onDelete={this.onDelete}
                  />
                  </div>
                )
              );
            }}
            path="/email"
          />
        </Switch>
      </div>
    );
  }
}
