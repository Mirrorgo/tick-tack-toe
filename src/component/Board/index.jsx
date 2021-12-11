import axios from "axios";
import React, { Component } from "react";
import Square from "../Square";

export default class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    // squares: Array(9).fill("x"),
    isUserTurn: true,
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  };

  luozi = (i, who) => {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) return;
    const { isUserTurn } = this.state;
    // squares[i] = "x";
    squares[i] = isUserTurn ? "x" : "o";
    this.setState({ squares: squares, isUserTurn: !isUserTurn });
  };

  handleClick = (i) => {
    this.luozi(i, "user");
    // const url = "http://api.github.com/search/users?q=Mirrorgo";
    // const url = "https://httpbin.org/get";
    // const url = "http://localhost:3000/api1/request";
    const url = "http://localhost:3000/api1/students";
    axios.get(url).then(
      (response) => {
        // this.luozi(i,'server')
        console.log("成功了", response);
      },
      (error) => {
        console.log("失败了", error);
      }
    );
  };

  renderSquare(i) {
    return (
      // <Square value={this.state.squares[i]} onClick={this.handleClick(i)} />
      <Square
        value={this.state.squares[i]}
        onClick={(params) => {
          this.handleClick(i);
        }}
      />
    );
  }
  render() {
    const winner = this.calculateWinner(this.state.squares);
    // 使用模板字符串
    // const status = `Next player: ${this.state.isUserTurn ? "x" : "o"}`;
    const status = winner
      ? `winner:${winner}`
      : `Next player: ${this.state.isUserTurn ? "x" : "o"}`;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
