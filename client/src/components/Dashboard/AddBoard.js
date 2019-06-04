import React, { Fragment, Component, PureComponent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SERVER_URL, USER_ID } from "./../../constants";
const AddBoard = function(props) {
  const [open, setOpen] = React.useState(false);
  function handleClickOpen() {
    setOpen(true);
  }
  let lifeCycle = "";
  let boardData = {};
  props.setClick(handleClickOpen);

  function handleClose() {
    props.saveData(boardData);
    setOpen(false);
  }

  function getData(data) {
    boardData = data;
    console.log(boardData);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Board</DialogTitle>
      <DialogContent>
        <BoardForm setData={getData} />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddBoard;

class BoardForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { board: { title: "", lifeCycles: [] }, lifeCycle: "" };
  }

  handleTitleOnChange = evt => {
    const val = evt.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        board: { ...prevState.board, title: val }
      };
    }, this.props.setData(this.state.board));
  };
  handleLifeCycleOnChange = evt => {
    const lifeCycle = evt.target.value;
    this.setState({ lifeCycle: lifeCycle });
  };
  handleAddLifeCycleClick = () => {
    this.setState(prevState => {
      prevState.board.lifeCycles.push(prevState.lifeCycle);
      return {
        lifeCycle: "",
        board: {
          ...prevState.board
        }
      };
    }, this.props.setData(this.state.board));
  };

  handleRemoveLifeCycleClick = index => {
    this.setState(prevState => {
      prevState.board.lifeCycles.splice(index, 1);
      return {
        ...prevState,
        board: {
          ...prevState.board
        }
      };
    }, this.props.setData(this.state.board));
  };
  render() {
    const lifecyclesList = this.state.board.lifeCycles.map((lc, index) => {
      return (
        <div key={index}>
          {lc}{" "}
          <button onClick={() => this.handleRemoveLifeCycleClick(index)}>
            X
          </button>
        </div>
      );
    });
    return (
      <Fragment>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          onChange={this.handleTitleOnChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="Lifecycle"
          type="text"
          fullWidth
          onChange={this.handleLifeCycleOnChange}
          value={this.state.lifeCycle}
        />{" "}
        <button onClick={this.handleAddLifeCycleClick}>Add</button>
        {lifecyclesList}
      </Fragment>
    );
  }
}
