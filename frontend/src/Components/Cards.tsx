
function Cards(props) {
  return (
    <div className="card">
        <div className="card-header">
            {props.id}
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <a className="btn btn-primary" onClick={props.handleCardfn}>{props.btnlabel}</a>
        </div>
    </div>
  )
}

export default Cards