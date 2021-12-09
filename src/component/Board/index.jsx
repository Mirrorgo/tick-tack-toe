import React, { Component } from "react";
import Square from "../Square";

export default class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    // squares: Array(9).fill("x"),
    xIsNext: true,
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

  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) return;
    const { xIsNext } = this.state;
    // squares[i] = "x";
    squares[i] = xIsNext ? "x" : "o";
    this.setState({ squares: squares, xIsNext: !xIsNext });
  };

  renderSquare(i) {
    return (
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
    // const status = `Next player: ${this.state.xIsNext ? "x" : "o"}`;
    const status = winner
      ? `winner:${winner}`
      : `Next player: ${this.state.xIsNext ? "x" : "o"}`;
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
