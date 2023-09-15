import React, { Component } from 'react';

class Minesweeper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      bombProbability: 20,
      maxProbability: 200,
      difficulty: 'easy',
      gameOver: false,
    };

    this.createBoard = this.createBoard.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleBombProbabilityChange = this.handleBombProbabilityChange.bind(this);
    this.handleMaxProbabilityChange = this.handleMaxProbabilityChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    const { difficulty } = this.state;
    const numRows = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
    const numCols = numRows;
    const board = [];

    for (let row = 0; row < numRows; row++) {
      const rowData = [];
      for (let col = 0; col < numCols; col++) {
        rowData.push({
          row,
          col,
          isBomb: Math.random() < this.state.bombProbability,
          isRevealed: false,
        });
      }
      board.push(rowData);
    }

    this.setState({ board });
  }

  handleCellClick(row, col) {
    if (this.state.gameOver) return;

    const { board, maxProbability } = this.state;
    const cell = board[row][col];

    if (!cell.isRevealed) {
      cell.isRevealed = true;
      this.setState({ board });

      if (cell.isBomb) {
        this.setState({ gameOver: true });
        alert('Game Over! You clicked on a bomb.');
      }
    }
  }

  handleBombProbabilityChange(event) {
    this.setState({ bombProbability: parseFloat(event.target.value) });
  }

  handleMaxProbabilityChange(event) {
    this.setState({ maxProbability: parseFloat(event.target.value) });
  }

  handleDifficultyChange(event) {
    this.setState({ difficulty: event.target.value }, () => {
      this.createBoard();
    });
  }

  render() {
    const { board, bombProbability, maxProbability, difficulty } = this.state;

    return (
      <div>
        <h1>Minesweeper</h1>
        <label>
          Bomb Probability:
          <input
            type="number"
            step="0.05"
            value={bombProbability}
            onChange={this.handleBombProbabilityChange}
          />
        </label>
        <label>
          Max Probability:
          <input
            type="number"
            step="0.05"
            value={maxProbability}
            onChange={this.handleMaxProbabilityChange}
          />
        </label>
        <label>
          Difficulty:
          <select value={difficulty} onChange={this.handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell) => (
                <div
                  key={`${cell.row}-${cell.col}`}
                  className={`cell ${cell.isRevealed ? 'revealed' : ''}`}
                  onClick={() => this.handleCellClick(cell.row, cell.col)}
                >
                  {cell.isRevealed && cell.isBomb ? '💣' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Minesweeper;
