import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Square extends React.Component {
    
    
    render() {
      return (
        <button className="square" onClick = {()=>
            this.props.Onclick()
        }>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    
    

    renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      Onclick ={() => this.props.OnClick(i)}/>;
    }
  
    render() {
      
      return (
        <div>
          <div className="status"></div>
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
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history : [{
            squares:Array(9).fill(null),
          }
        ],
        stepNumber:0,
        XisNext:true
      }
    }


    HandleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if(calculateWinner(squares)||squares[i]){
        return ;
      }
      if(this.state.XisNext){
        squares[i] = 'X';
      }
      else{
        squares[i] = 'O';
      }
      const next = !this.state.XisNext;
      this.setState({
        history:history.concat([{
          squares:squares,
        }]),
        stepNumber : this.state.stepNumber+1,
        XisNext:next});
    }
    jumpTo(step){
      this.setState({
        history:this.state.history.slice(0,step+1),
        stepNumber:step,
        XisNext:step%2===0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[history.length-1];
      const winner = calculateWinner(current.squares);
      let status;
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key = {move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      if(winner){
        status = 'Winner: '+ winner;
      }
      else{
        status = 'Next player: '+ (this.state.XisNext ? 'X' : 'O') ;
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares = {current.squares} OnClick = {(i)=>this.HandleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );