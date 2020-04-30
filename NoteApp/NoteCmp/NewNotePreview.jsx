import NotePreview from '../NoteCmp/NotePreview.jsx'

export default function NewNotePreview(props) {
    const {dataType, data} = props
    let DynamicCmp = null;
    DynamicCmp = (dataType, data) => {
        switch (dataType) {
            case 'text':
                return <p className="previewContent">{data}</p>
            case 'image':
                return <img src={data} className="previewContent"></img>
            case 'video':
                return <iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + data} className="previewContent" frameBorder="0" allowFullScreen></iframe> 
            case 'audio':
                return <audio src={data} type="audio/oog" className="previewContent"></audio>
            case 'list':
                return <table className="previewContent"><th>{data}</th></table>
        }
    }

    return (
        <div className="newNotePreview">
         {DynamicCmp(dataType, data)}
        </div>
    )
} 