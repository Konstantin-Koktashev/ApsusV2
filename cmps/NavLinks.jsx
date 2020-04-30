
const Router = ReactRouterDOM.HashRouter;
const {Link} = ReactRouterDOM;
import {SingleNavLink} from './SingleNavLink.jsx'


export class NavLinks extends React.Component {
    state={
        
        hamburgerMenue:{
            id:1
        }
        ,closeBtn:{
            id:2
        },

        isSideMenueShown:false,
        isMainPage:true,

    }
    

    handleClick=(id)=>{
        (id===1)?this.setState({isSideMenueShown:true}):this.setState({isSideMenueShown:false})  
    }
    closeSideMenu=()=>{
     this.setState({isSideMenueShown:false})
    }
    render(){
      let classToSelect = (this.state.isSideMenueShown)? 'show-menue':''
        const {links,navClass,openClass,closeClass,onCategoryChange,closeSideMenu}=this.props
        return (
          <React.Fragment>
              <div className="mobile-navigation">
          <section className="nav-bar">
        <div className={`logon-hamburger-wrapper ${openClass}`}>
          <button className="hambuger-menue" onClick={() =>this.handleClick(this.state.hamburgerMenue.id)}>
              	&#x2630;
          </button>
          </div>
    <nav className={`${classToSelect} ${navClass}`}>
      <section className="nav-links">
      <button className={`close-nav-btn ${closeClass}`} onClick={() =>this.handleClick(this.state.closeBtn.id)}>
            <span>X</span>
        </button>
    {links.map(link => <SingleNavLink key={ link.id }  url={link.url}  name={link.name} onCategoryChange={onCategoryChange} closeSideMenu={this.closeSideMenu} />) }
      </section>
    </nav>
    </section>
    </div>
    <div className="desktop-nav-bar">
    {links.map(link => <SingleNavLink key={ link.id }  url={link.url}  name={link.name} onCategoryChange={onCategoryChange} closeSideMenu={closeSideMenu}/>) }

    </div>
    </React.Fragment>
  );
}
}


