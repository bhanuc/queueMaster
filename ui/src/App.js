import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';

function ListItem(props) {
  const {tasks} = props.value;
  const key = props.queueName;
  return <tr>
  <td>{key}</td>
  <td>{tasks.taken}</td>
  <td>{tasks.buried}</td>
  <td>{tasks.ready}</td>
  <td>{tasks.done}</td>
  <td>{tasks.delayed}</td>
  <td>{tasks.total}</td>
</tr>;
}

function QueuesList(props) {
  const queues = props.queues;

  const listItems = Object.keys(queues).map((queueName) =>
    <ListItem key={queueName} value={queues[queueName]} queueName={queueName}/>
  );
  return (
    <Table responsive striped bordered condensed hover>
    <thead>
      <tr>
        <th>Name</th> 
        <th>Taken</th>
        <th>Buried</th>
        <th>Ready</th>
        <th>Done</th>
        <th>Delayed</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {listItems}
      </tbody>
  </Table>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    const that = this;
    that.state = {queues: {}}
    axios.get('http://localhost:4000/v1/queues')
    .then(function (response) {
      const queues = response.data[0];
      that.setState({queues});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tarantool QueueMaster</h1>
        </header>
        <QueuesList queues={this.state.queues} />
      </div>
    );
  }
}

export default App;
