import { NavLinks } from "./NavLinks.jsx";
import utilService from '../services/utilService.js'

const { Link } = ReactRouterDOM;

export class Header extends React.Component {
  state = {
    isMainPage: true,
  };

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
        url: '/about',
        name: 'About',
      },
      {
        id: utilService.makeId(),
        url: '/signup',
        name: 'SignUp',
      },
      {
        id: utilService.makeId(),
        url: '/login',
        name: 'Login',
      },
    ];
    let headerBtnClass = this.state.isMainPage ? '' : 'show';
    return (
        <header>
        <NavLinks
          links={links}
          navClass=""
          openClass=""
          closeClass=""
        ></NavLinks>
          <section className="title-and-button">
          <h3>
            <span>Appsus</span>
          </h3>
          <Link
            to="/app"
            className={`secondary-call-to-action-btn ${headerBtnClass}`}
          >App</Link>
          </section>
        </header>
    );
  }
}
