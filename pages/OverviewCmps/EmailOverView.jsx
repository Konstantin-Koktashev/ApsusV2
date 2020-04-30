import { EmailServices } from "../../EmailApp/EmailAppServices.js";

EmailServices
const { NavLink } = ReactRouterDOM;

export class EmailOverView extends React.Component{
    state={
        emails:null
    }
    componentDidMount(){
        this.setState({emails:EmailServices.getOverviewEmails()})
    }
    onRemove=(id)=>{
        EmailServices.remove(id)
        this.setState({emails:EmailServices.getOverviewEmails()})      
    }
    render(){
        const {emails}=this.state
        return (
            <section className="email-app-board">         
                    <NavLink exact to="/email" className='pure-material-button-contained'>Open App</NavLink>
                    { emails && emails.map(email => {
                        const {sender,subject,isRead}=email
                          let imgUrl = isRead
                          ? 'EmailApp/emailicons/read.svg'
                          : 'EmailApp/emailicons/unread.svg';
                        return (
                            <article className="important-overview" key={email.id}>
                            <div className="overview-icon read-unread-img-container">
                                <img src={imgUrl} alt=""/>
                                <img src="EmailApp/emailicons/delete.svg" onClick={()=>this.onRemove(email.id)}/>
                            </div>
                                <NavLink to={`/email/${email.id}`} >
                            <div className="overview-text email-text" onClick={()=>EmailServices.setEmailToRead(email.id)}>
                            <h4>{sender}</h4>
                            <h6>{subject}</h6>
                        <p>{EmailServices.getShortTxt(email.body)}</p>
                        </div>
                        </NavLink>
              </article>
                        );
                    }) }
                    
                    {!emails && <div>No Important Emails</div>}
            </section>

        );
    }

}