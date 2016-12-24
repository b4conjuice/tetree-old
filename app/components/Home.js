var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
	getInitialState: function() {
		return {
			sheetColumns: ['city', 'number', 'lastupdated', 'lastcovered'],
			territoryList: [] 
		};
	},
	componentDidMount: function() {
		var self = this;
		var url = this.props.getUrl('Territory List');

		this.props.fetchData(url, this.state.sheetColumns, function(territoryList) {

			territoryList.forEach(function(member) {
				member.number = parseInt(member.number);
			});
			self.setState({
				territoryList: territoryList
			});
		});
	},
	render: function() {
		var territoryList = this.state.territoryList.map(function(territory, index) {
			return (
				<div key={index}>
					<Link to={'/' + territory.city.toLowerCase() + '/' + territory.number}>
						{territory.city} {territory.number}
					</Link>
				</div>
			);
		});
		return (
			<div>
				<h2>Choose a territory</h2>
				{territoryList}
			</div>
		);
	}

});

module.exports = Home;