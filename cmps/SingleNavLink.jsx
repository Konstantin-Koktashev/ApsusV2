
const {  NavLink } = ReactRouterDOM;
export  function SingleNavLink(props){
   const {url,name,onCategoryChange,closeSideMenu}=props
   

const linkProps = (onCategoryChange === undefined) ? {exact: true, to: url} : null

const handleClick = () => {
  var nameLowerCase=name.toLowerCase()
    if (closeSideMenu !== undefined) {
        closeSideMenu()
    }
    (onCategoryChange===undefined) ? {exact: true, to: url} : onCategoryChange(nameLowerCase)
}

return (
    <NavLink onClick={handleClick} {...linkProps}>
        {name}
    </NavLink>
)
    
}
