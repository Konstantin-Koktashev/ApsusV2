import {StorageService, StorageServices} from '../../services/StorageService.js'
import NotePreview from './NotePreview.jsx'
import {NotePreviewToolBar} from './NotePreviewToolBar.jsx'

export function PinnedNotes(props) {

        const { notes } = props
        const pinnedNotes = notes.filter((note) => {return note.isPinned})
        
        return (
            <div className="pinnedNotesContainer">
               {pinnedNotes.map((note) => (
        <div
          key={note.id}
          style={{ backgroundColor: note.bgc }}
          className="noteBg"
        >
          {' '}
          <NotePreview key={note.id} note={note} />{' '}
          <NotePreviewToolBar note={note} />{' '}
          
        </div>
      ))}
    </div>
           
        )

}