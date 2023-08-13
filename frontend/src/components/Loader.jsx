import { Spinner } from "react-bootstrap";

const Loader = (props) => {
  return (
    <Spinner animation="border" role="status" style={
      {
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }
    } {...props}></Spinner>
  )
}

export default Loader