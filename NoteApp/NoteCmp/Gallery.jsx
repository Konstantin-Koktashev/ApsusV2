import NotePreview from './NotePreview.jsx';
import { NotePreviewToolBar } from './NotePreviewToolBar.jsx';
import EditNote from './EditNote.jsx';

const { Link} = ReactRouterDOM 

export default function Gallery(props) {
  return (
    <div className="gallery">

      {props.notes.map((note) => (
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
  );
}
