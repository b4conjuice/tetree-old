var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ButtonWrapper = require('./ButtonWrapper');

var Home = React.createClass({
	getInitialState: function() {
		return {
			loading: true,
			//sheetColumns: ['city', 'number', 'lastupdated', 'lastcovered', 'map'],
			sheetColumns: ['city', 'key', 'count'],
			territoryList: [],
			cityList: []
		};
	},
	componentDidMount: function() {
		var self = this;
		var data;
		// if (sessionStorage.data)
		// 	data = JSON.parse(sessionStorage.data);
		// if (data && data.territoryList) {
		// 	this.setState({
		// 		territoryList: data.territoryList,
		// 		loading: false
		// 	});
		// }
		// else {
			var url = this.props.getUrl(this.props.sheetlist, 'Territory List');

			this.props.fetchData(url, this.state.sheetColumns, function(territoryList) {
				var cityList = [];
				var cityObj = {};
				var cityKeys = {};
				territoryList.forEach(function(member) {
					//member.number = parseInt(member.number);
					//member.cityNumber = member.city + ' ' + member.number;
					// if (cityList.indexOf(member.city) == -1)
					cityList.push(member.city);
					cityObj[member.city] = {
						key: member.key,
						count: member.count
					}
					cityKeys[member.city] = member.key;
				});
				self.setState({
					territoryList: territoryList,
					loading: false,
					cityList: cityList
				});
				// if (sessionStorage.data) {
				// 	var data = JSON.parse(sessionStorage.data);
				// 	data.territoryList = territoryList;
				// 	sessionStorage.data = JSON.stringify(data);
				// }
				// else {
				// 	var data = {
				// 		territoryList: territoryList
				// 	};
				// 	sessionStorage.data = JSON.stringify(data);	
				// }
			});
		// }
	},
	handleClick: function(e) {
		var city = e.target.id;
		// var cityNumber = e.target.id;
		// var city = cityNumber.split(' ')[0];
		// var number = cityNumber.split(' ')[1];
		var territoryList = this.state.territoryList;
		var matchingTerritory = [];
		territoryList.forEach(function(territory){
			//if (territory.cityNumber === cityNumber) {
			if (territory.city == city ) {
				matchingTerritory.push(territory);
				//return;
			}
		});
		// var map = matchingTerritory.map;
		this.props.router.push({
			pathname: '/' + city.toLowerCase(),
			state: {
				city: city,

				territory: matchingTerritory
				//map: map
			}
		});
	},
	render: function() {
		if (this.state.loading)
			return (
				<div>Loading</div>
		);
		var handleClick = this.handleClick;
		// var territoryList = this.state.territoryList.map(function(territory, index) {
		// 	return (
		// 		<div key={index}>
		// 			<ButtonWrapper onClick={handleClick}>
		// 				{territory.city} {territory.number}
		// 			</ButtonWrapper>
		// 		</div>
		// 	);
		// });
		// return (
		// 	<div className='text-center'>
		// 		<h2>Choose a territory</h2>
		// 		<div className='col-sm-12'>
		// 			{territoryList}
		// 		</div>
		// 	</div>
		// );
		var cityList = this.state.cityList.map(function(city, index) {
			return (
				<div key={index}>
					<ButtonWrapper type='city' onClick={handleClick}>
						{city}
					</ButtonWrapper>
				</div>
			);
		});
		return (
			<div className='text-center'>
				<h2>Choose a city</h2>
				<div className='col-sm-12'>
					{cityList}
				</div>
			</div>
		);
	}

});

module.exports = Home;