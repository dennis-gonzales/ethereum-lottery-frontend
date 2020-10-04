import React, { Component } from 'react';
import './App.css';
import web3 from './web3.js';
import lottery from './lottery.js';

class App extends Component {
  
  state = {
    balance: '0',
    manager: '',
    players: [],
    value: '0',
    status: 'Idle'
  }

  componentDidMount = async () => {
    console.log(web3.version);
    web3.eth.getAccounts().then(console.log);

    const balance = await web3.eth.getBalance(lottery._address);
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();

    this.setState({ balance, manager, players });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ status: 'Waiting for the transaction response...' });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ status: 'You have successfully joined the lottery!' });
  }

  pickWinner = async (e) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ status: 'Picking a Winner...' });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ status: 'A winner has been found...' });
  }
  
  render = () => {
    return (
      <div>
        <h2>Welcome to the Lottery</h2>
        <p>Contract address: { lottery._address }</p>
        <p>Contract balance: { web3.utils.fromWei(this.state.balance, 'ether') }</p>
        <p>Manager: { this.state.manager }</p>
        <p>Players in-game: { this.state.players.length }</p>
        <p>Game Status: { this.state.status }</p>

        <hr />

        <form onSubmit={ this.onSubmit }>
          <h5>Try your luck</h5>
          <div>
            <label>Ether to send: </label>
            <input
              value={ this.state.value }
              onChange={ event => this.setState({ value: event.target.value }) }
            />
          </div>
          <button>Click me!</button>
        </form>

        <hr />

        <h4>Pick a winner</h4>
        <button onClick={ this.pickWinner }>Pick Winner</button>
      </div>
    );
  }
}

export default App;
