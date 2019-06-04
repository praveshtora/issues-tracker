import React, { Component, Fragment, PureComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Fab
} from "@material-ui/core";
import AddBoard from "./AddBoard";
import "./../../App.css";
import { SERVER_URL, USER_ID } from "../../constants";

export default class DashboardList extends Component {
  constructor() {
    super();
    this.state = {
      boards: [{ title: "Hello" }, { title: "Jhon" }],
      isOpen: false
    };
    this.fetchBoards = this.fetchBoards.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.openAddBoard = this.openAddBoard.bind(this);
  }

  openAddBoard = () => {
    console.log("open");
  };

  componentDidMount() {
    this.fetchBoards();
  }

  fetchBoards = async function() {
    try {
      const response = await fetch(SERVER_URL + "dashboard/getList/" + USER_ID);
      const boards = await response.json();
      this.setState({ boards });
    } catch (err) {
      console.log(err);
    }
  };

  saveBoard = async function(boardData) {
    try {
      const response = await fetch(SERVER_URL + "dashboard/add/" + USER_ID, {
        method: "post",
        body: JSON.stringify(boardData),
        headers: { "Content-Type": "application/json" }
      });
      const res = await response.json();
      alert(res.message);
      this.fetchBoards();
    } catch (err) {
      console.log(err);
    }
  };

  handleClickOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };
  handleSaveData = data => {
    this.saveBoard(data);
  };
  render() {
    const cardBoard = this.state.boards.map((board, index) => {
      return (
        <div className="float-left">
          <CustomCard key={index} title={board.title} />
        </div>
      );
    });
    return (
      <Fragment>
        <div className="center">
          <h2>Board List</h2>
          <div className="float-left">
            <CustomCard>
              <Fab color="primary" className="fab" onClick={this.openAddBoard}>
                <label>+</label>
              </Fab>
              <div>
                <label>Add Board</label>
              </div>
            </CustomCard>
          </div>
          {cardBoard}
          <AddBoard
            setClick={click => (this.openAddBoard = click)}
            saveData={this.handleSaveData}
          />
        </div>
      </Fragment>
    );
  }
}

const CustomCard = function(props) {
  return (
    <Card className="card">
      <CardContent>
        <Typography className="title" color="textSecondary">
          {props.title}
        </Typography>

        <Typography variant="body2" component="p">
          {props.children}
        </Typography>
      </CardContent>
      {props.children ? (
        ""
      ) : (
        <CardActions style={{ justifyContent: "center" }}>
          <Button size="small">View Board</Button>
        </CardActions>
      )}
    </Card>
  );
};
