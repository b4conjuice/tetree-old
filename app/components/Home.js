var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ButtonWrapper = require('./ButtonWrapper');

var Home = React.createClass({
	getInitialState: function() {
		return {
			loading: true,
			sheetColumns: ['city', 'number', 'lastupdated', 'lastcovered'],
			territoryList: [] 
		};
	},
	componentDidMount: function() {
		var self = this;
		var data = JSON.parse(sessionStorage.data);
		if (data.territoryList) {
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
	render: function() {
		if (this.state.loading)
			return (
				<div>Loading</div>
		);
		var territoryList = this.state.territoryList.map(function(territory, index) {
			return (
				<div key={index}>
					<Link to={'/' + territory.city.toLowerCase() + '/' + territory.number}>
						<ButtonWrapper>
							{territory.city} {territory.number}
						</ButtonWrapper>
					</Link>
				</div>
			);
		});
		return (
			<div>
				<h2>Choose a territory</h2>
				<div >
					{territoryList}
				</div>
			</div>
		);
	}

});

module.exports = Home;