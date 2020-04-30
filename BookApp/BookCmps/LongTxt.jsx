
export default function LontTxt(props) {

    const {isLongTxtShown, text, toggleDesc} = props;
    const parseLongTxt = () => {
        let newTxt = text;
        
        
        if (text.length > 100 && !isLongTxtShown)  {
            newTxt = text.slice(0, 99) + '...';
        } 
        return newTxt;
        
    }
    const currText = parseLongTxt();
    return (
                <div className="description" onClick={toggleDesc}>
                <p> {currText}  </p>
                </div>
            )
    
} 


