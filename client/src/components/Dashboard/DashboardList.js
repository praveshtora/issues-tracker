import React, { Component, Fragment } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Fab
} from "@material-ui/core";

import "./../../App.css";
import { SERVER_URL } from "../../constants";
export default class DashboardList extends Component {
  constructor() {
    super();
    this.state = { boards: [{ title: "Hello" }, { title: "Jhon" }] };
    this.fetchBoards = this.fetchBoards.bind(this);
  }

  componentDidMount() {
    this.fetchBoards();
  }

  fetchBoards = async function() {
    try {
      const response = await fetch(
        SERVER_URL + "dashboard/getList/5cf57ee8f619f130977dd3c9"
      );
      const boards = await response.json();
      this.setState({ boards });
    } catch (err) {
      console.log(err);
    }
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
              <Fab color="primary" className="fab">
                <label>+</label>
              </Fab>
              <div>
                <label>Add Board</label>
              </div>
            </CustomCard>
          </div>
          {cardBoard}
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
