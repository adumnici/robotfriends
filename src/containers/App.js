import React, {Component} from 'react';
import CardList from '../components/CardList';
import {Robots} from '../components/Robots' 
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from'../components/Boundry'

class App extends Component {
	constructor () {
		super ()
		this.state = {
			Robots: [],
			searchfield:''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> {return response.json()})
			.then(users=> {this.setState({ Robots:users})
			})
	}
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}
	render () {
		const filteredRobot = this.state.Robots.filter(Robots =>{
		return Robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
			if (!this.state.Robots.length) {
			return <h1>The robots are stuck in traffic</h1>
			} else {
				return(
					<div className ="tc">
						<h1 className="f1">RoboFriends</h1>
						<SearchBox searchChange ={this.onSearchChange}/>
						<Scroll>
							<ErrorBoundry>
								<CardList Robots={filteredRobot}/>
							</ErrorBoundry>
						</Scroll>
					</div>
				)
			}
}
}

export default App;