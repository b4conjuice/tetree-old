var React = require('react');
var ReactRouter = require('react-router');
var ButtonWrapper = require('./ButtonWrapper');

var City = React.createClass({
	getInitialState: function() {
		return {
			city: '',
			territoryList: []
		};
	},
	componentDidMount: function() {
		var city = this.props.location.state.city;
		var territoryList = this.props.location.state.territory;

		// get territoryList from URL

		this.setState({
			city: city,
			territoryList: territoryList
		})
	},
	handleClick: function(e) {
		var cityNumber = e.target.id;
		var city = cityNumber.split(' ')[0];
		var number = cityNumber.split(' ')[1];
		var territoryList = this.state.territoryList;
		var matchingTerritory = {};
		territoryList.forEach(function(territory){
			if (territory.cityNumber === cityNumber) {
				matchingTerritory = territory;
				return;
			}
		})
		var map = matchingTerritory.map;
		this.props.router.push({
			pathname: '/' + city.toLowerCase() + '/' + number,
			state: {
				map: map
			}
		});
	},
	render: function() {
		var handleClick = this.handleClick;
		var territoryList = this.state.territoryList.map(function(territory, index) {
			return (
				
					<ButtonWrapper type='territory' key={index} onClick={handleClick} cityNumber={territory.city + ' ' + territory.number}>
						{territory.number}
					</ButtonWrapper>
			);
		});
		return (
			<div className='text-center'>
				<h2>{this.state.city}</h2>
				<div className='territories container'>
					{territoryList}
				</div>
			</div>
		);
		// return (
		// 	<div>{this.state.city}</div>
		// );
	}

});

module.exports = City;