


export default function NotePreview(props) {
  const { note } = props;
  let DynamicCmp = null;
    DynamicCmp = (dataType, data ) => {
        switch (dataType) {
            case 'text':
                return <p className="previewContent">{data} </p>
            case 'image':
                return <img src={data} className="previewContent"></img>
            case 'video':
                return <iframe width="100%" height="100%" src={data} className="previewContent" frameBorder="0" allowFullScreen></iframe> 
            case 'audio':
                return <audio src={data} type="audio/oog" className="previewContent"></audio>
            case 'list':
                return <table className="previewContent"><ul>{data}</ul></table>
        }
    }

  return (
      
    // <Link to={`/note/${note.id}/${note.title}` }>
    <div className="note-preview">
     {DynamicCmp(note.dataType, note.data)} 
     
    </div>
    // </Link>
  );
}
