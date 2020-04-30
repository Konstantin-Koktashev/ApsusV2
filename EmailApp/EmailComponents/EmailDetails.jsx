import { EmailServices } from '../EmailAppServices.js';
import { GoBack } from '../../cmps/GoBackBtn.jsx';

export class EmailDetails extends React.Component {
  state = {
    email: {
      sender: '',
      topic: '',
      body: '',
    },
  };
  async componentDidMount() {
    const id = this.props.match.params.emailId;
    const email = await EmailServices.getEmailById(id);
    (email!==undefined)?  this.setState({ email }):this.setState({email:{sender:'Email was Deleted',topic:'Was Deleted',body:'Was Deleted'}})
  }
  render() {
    const { email } = this.state;

    return (
      
      <div className="full-email">
        <section className="sender-name">Sent By:{email.sender}</section>
    <section className="email-subject">{email.subject}</section>
        <section className="email-body">{email.body}</section>
        <GoBack backBtnSecondClass="email-go-back"></GoBack>
      </div>
    );
  }
}
