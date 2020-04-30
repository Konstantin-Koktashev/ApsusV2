import { EmailServices } from '../EmailAppServices.js';
const history = History.createBrowserHistory();

export class EmailCompose extends React.Component {
  state = {
    email: {
      sendTo: '',
      subject: '',
      body: '',
    },
  };
  handleInput = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => {
      return {
        email: {
          ...prevState.email,
          [field]: value,
        },
      };
    });
  };
  sendEmail = async (ev) => {
    ev.preventDefault();
    const { email } = this.state;
    await EmailServices.save(email,undefined,undefined,true);
    this.setState({ email: { sendTo: '', subject: '', body: '' } });
    history.goBack();
  };
  render() {
    const { email } = this.state;

    return (
      <form onSubmit={this.sendEmail} className="email-compose-form">
        <section className="email-send-to">
          <label htmlFor=""></label>
          <input
            type="text"
            value={email.sendTo}
            name="sendTo"
            onChange={this.handleInput}
            placeholder="To"
          />
        </section>
        <section className="email-topic">
          <label htmlFor=""></label>
          <input
            type="text"
            value={email.subject}
            name="subject"
            onChange={this.handleInput}
            placeholder="Subject"
          />
        </section>
        <section className="email-body">
          <label htmlFor=""></label>
          <textarea name="body" onChange={this.handleInput} placeholder="Compose Email" value={email.body}></textarea>
          <button type="submit">Send</button>
        </section>
      </form>
    );
  }
}
