
export default function PageCount(props) {
    
    let txt = '';

    if (props.pageCount > 500) {
      txt = `Over 500 pages! - Long Reading`
    }
    else if (props.pageCount > 200) {
      txt = `Over 200 pages - Decent Reading`
    }
    else if (props.pageCount > 100) {
      txt = `Over 100 pages - Light Reading`
    }
    else {
        txt = `Less than 100 pages... You can look alredy for your next one!`
    }
    
    return (
        <p>
           {txt} 
        </p>
    )
}
