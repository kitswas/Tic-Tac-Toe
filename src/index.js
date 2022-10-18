import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';

function Square(props) {
	return (
		<button className="square bg-gradient-to-tr from-amber-300 to-yellow-200 focus:from-amber-500 focus:to-yellow-100 h-1/3 w-1/3 md:h-64 md:w-64 md:text-9xl sm:h-32 sm:w-32 sm:text-6xl xs:h-16 xs:w-16 xs:text-3xl text-black" onClick={props.onClick} >
			{props.value}
		</button>
	);
}

class Board extends React.Component {

	renderSquare(i) {
		return (<Square
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
		/>);
	}

	render() {
		return (
			<div className='outline-double outline-amber-600 outline-4 p-0 w-fit h-fit'>
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
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		let status;
		if (winner) {
			status = `Winner: ` + winner;
		}
		else if (current.squares.every((x) => x != null)) {
			status = `It's a Tie!`;
		}
		else {
			status = `Next player: ` + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<main>
				<h1 className="flex justify-center font-bold text-2xl p-2 bg-black">Tic-Tac-Toe</h1>
				<div className="game items-center justify-center w-full">
					<div className="game-info">
						<div className='m-1'>
							<p className='text-rose-300 flex flex-wrap'>
								Feeling Bored? Want to interact with the person sitting across you?
							</p>
							<p className='text-sky-300 flex flex-wrap'>
								Lack pen and paper?
							</p>
							<p className='text-lime-300 flex flex-wrap'>
								Play Tic-Tac-Toe!
							</p>
						</div>
						<div className='m-1'>{status}</div>
						<div className='flex flex-wrap'>
							<button
								className='bg-blue-500 m-1 p-1 text-white rounded'
								onClick={() => this.undo()}
							>Undo</button>
							<button
								className='bg-blue-500 m-1 p-1 text-white rounded'
								onClick={() => this.redo()}
							>Redo</button>
						</div>
					</div>
					<div className="game-board">
						<Board
							squares={current.squares}
							onClick={(i) => this.handleClick(i)}
						/>
					</div>
				</div>
			</main >
		);
	}

	redo() {
		if (this.state.stepNumber < this.state.history.length - 1)
			this.jumpTo(this.state.stepNumber + 1);
	}

	undo() {
		if (this.state.stepNumber > 0)
			this.jumpTo(this.state.stepNumber - 1);
	}
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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