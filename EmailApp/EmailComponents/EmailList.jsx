const { NavLink } = ReactRouterDOM;


import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList(props){
    return(
        <div className="email-list">
        { props.emails.map(email => <EmailPreview key={ email.id } email={ email }  toggleImportance={props.toggleImportance} onReadEmail={props.onReadEmail} onDelete={props.onDelete}/>) }
        <NavLink  exact to ='/email/compose' className="compose-email-btn">
        <img src="EmailApp/emailicons/composeEmail.svg" alt="" />
        </NavLink>
    </div>
    )
}