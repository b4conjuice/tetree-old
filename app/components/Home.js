var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ButtonWrapper = require('./ButtonWrapper');

var Home = React.createClass({
	getInitialState: function() {
		return {
			loading: true,
			sheetColumns: ['city', 'number', 'lastupdated', 'lastcovered', 'map'],
			territoryList: [] 
		};
	},
	componentDidMount: function() {
		var self = this;
		var data;
		if (sessionStorage.data)
			data = JSON.parse(sessionStorage.data);
		if (data && data.territoryList) {
			this.setState({
				territoryList: data.territoryList,
				loading: false
			});
		}
		else {
			var url = this.props.getUrl(this.props.sheetlist, 'Territory List');

			this.props.fetchData(url, this.state.sheetColumns, function(territoryList) {

				territoryList.forEach(function(member) {
					member.number = parseInt(member.number);
					member.cityNumber = member.city + ' ' + member.number;
				});
				self.setState({
					territoryList: territoryList,
					loading: false
				});
				if (sessionStorage.data) {
					var data = JSON.parse(sessionStorage.data);
					data.territoryList = territoryList;
					sessionStorage.data = JSON.stringify(data);
				}
				else {
					var data = {
						territoryList: territoryList
					};
					sessionStorage.data = JSON.stringify(data);	
				}
			});
		}
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
		if (this.state.loading)
			return (
				<div>Loading</div>
		);
		var handleClick = this.handleClick
		var territoryList = this.state.territoryList.map(function(territory, index) {
			return (
				<div key={index}>
					<ButtonWrapper onClick={handleClick}>
						{territory.city} {territory.number}
					</ButtonWrapper>
				</div>
			);
		});
		return (
			<div className='text-center'>
				<h2>Choose a territory</h2>
				<div className='col-sm-12'>
					{territoryList}
				</div>
			</div>
		);
	}

});

module.exports = Home;