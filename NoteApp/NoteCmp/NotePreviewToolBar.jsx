
import NoteService from '../service/NoteServices.js'
import {StorageServices} from '../../services/StorageService.js'
export function NotePreviewToolBar(props) {
    const {note} = props
    let paintBarIsShown = false;

    let onPinNote = null;
    let onDeleteNote = null;
    let onPaintNote = null;
    let onSetBgc = null;


    
    onPinNote = (ev) => {
        ev.preventDefault();
        const icon = ev.target;
        console.log(note)
       if (!note.isPinned) {
           note.isPinned = true;
           icon.style = "border: rgb(107, 107, 107) solid 1px;border-radius: 50%;"
           NoteService.save(note);
        }  else {
            note.isPinned = false;
            icon.style = "";
            NoteService.save(note);
       } 
       
    }

    onDeleteNote = (ev) => {
        ev.preventDefault()
        
        const pinnedNotes = StorageServices.load('pinnedNotes')
        if (pinnedNotes) {
            const pinnedNoteIdx = pinnedNotes.findIndex((pinnedNote) => pinnedNote.id === note.id);
            pinnedNotes.splice(pinnedNoteIdx, 1)
            StorageServices.store('pinnedNotes', pinnedNotes);
        }
        
        NoteService.remove(note.id);

        window.location.reload();
    }

    onPaintNote = (ev) => {
        ev.preventDefault()
       const colorBar = document.querySelector(`#${note.id}`);
       
       if (!paintBarIsShown) {
        colorBar.style = "transform: translateX(0px);" 
        paintBarIsShown = true
       } else {
        colorBar.style = "transform: translateX(-50px);" 
        paintBarIsShown = false
       }
    } 

    onSetBgc = (ev) => {
        ev.preventDefault()
        note.bgc = ev.target.name;
        NoteService.save(note);
        window.location.reload();
    }
    
    return (
        <div className="noteToolBar">
        <button onClick={onPinNote}><img src="/assets/img/noteicons/pin icon.svg" className="pin-icon" ></img></button>
        <button onClick={onDeleteNote}><img src="/assets/img/noteicons/delete icon.png" className="delete-icon"></img> </button>
        <button onClick={onPaintNote}><img src="/assets/img/noteicons/paint icon.png" className="paint-icon"></img> </button>

        <div className="changeColor" id={note.id}>
                   <button name="lightgreen" className="lightGreen" onClick={onSetBgc}></button>
                   <button name="lightsalmon" className="lightSalmon" onClick={onSetBgc}></button>
                   <button name="lightpink" className="lightPink" onClick={onSetBgc}></button>
                   <button name="lightblue" className="lightBlue" onClick={onSetBgc}></button>
                   <button name="lightyellow" className="lightYellow" onClick={onSetBgc}></button>
                   <button name="lightslategray" className="lightSlategray" onClick={onSetBgc}></button>
               </div>

        </div>
    )
}