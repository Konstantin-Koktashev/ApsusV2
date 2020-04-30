import NewNotePreview from './NewNotePreview.jsx'
import NoteAppServices from '../service/NoteServices.js';
import NoteServices from '../service/NoteServices.js';
const { Link } = ReactRouterDOM;

export default class EditNote extends React.Component{

    state = {
        formType: 'text',
        isTyping: false,
        newNote: null,
        noteBgc: 'lightgreen'
    }


    changeFormType = (ev) => {
        this.setState({formType: ev.target.name})
       
    }

    inputChangeHnadler = ({target}) => {
        
        (target.value !== '') ? this.setState({isTyping: true})  : this.setState({isTyping: false});
        this.state.newNote = {
            dataType: this.state.formType,
            data: target.value,
            bgc: this.state.noteBgc
        } 
        
    }
 
    onSaveNote = (ev) => {
        ev.preventDefault()
        if (this.state.newNote) {
            
            NoteAppServices.save(this.state.newNote)
            .then(savedNote => {
                
            })
            .catch(err => {
                
     
            })
        } else return
    }

    onSetBgc = (ev) => {
        ev.preventDefault()
        this.setState({noteBgc: ev.target.name})
        
    }
    


    render(){
        const { newNote } = this.state
       
        return (

            <div className="insertNoteContainer">

            <div className="noteForm">
                
                <input type='text' placeholder={NoteServices.setPlaceHolder(this.state.formType)} onChange={this.inputChangeHnadler} maxLength="180"></input>

                <div className="btns">
                    <button name="text" onClick={this.changeFormType} style={this.state.formType === 'text' ? {color: "green", fontSize: "1.3rem"} : {}}>Text</button>
                    <button name="image" onClick={this.changeFormType} style={this.state.formType === 'image' ? {color: "green", fontSize: "1.3rem"} : {}}>Image</button>
                    <button name="video" onClick={this.changeFormType} style={this.state.formType === 'video' ? {color: "green", fontSize: "1.3rem"} : {}}>Video</button>
                    <button name="audio" onClick={this.changeFormType} style={this.state.formType === 'audio' ? {color: "green", fontSize: "1.3rem"} : {}}>Audio</button>
                    <button name="list" onClick={this.changeFormType} style={this.state.formType === 'list' ? {color: "green", fontSize: "1.3rem"} : {}}>List</button>
                </div>
            </div>

            <div className="notePreview" style={{backgroundColor: this.state.noteBgc}}>
               <div className="changeColor">
                   <button name="lightgreen" className="lightGreen" onClick={this.onSetBgc}></button>
                   <button name="lightsalmon" className="lightSalmon" onClick={this.onSetBgc}></button>
                   <button name="lightpink" className="lightPink" onClick={this.onSetBgc}></button>
                   <button name="lightblue" className="lightBlue" onClick={this.onSetBgc}></button>
                   <button name="lightyellow" className="lightYellow" onClick={this.onSetBgc}></button>
                   <button name="lightslategray" className="lightSlategray" onClick={this.onSetBgc}></button>
               </div>
               {newNote &&  <NewNotePreview data={newNote.data} dataType={newNote.dataType}></NewNotePreview>}    
            </div>

                

                
                <button className="addNoteBtn" onClick={this.onSaveNote}><Link to="/note">+</Link></button>
             
                
            </div>
        )
    }

}
