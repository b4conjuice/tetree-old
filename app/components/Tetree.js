var React = require('react');
var Title = require('./Title');
var Map = require('./Map');
var AddressList = require('./AddressList');

var Tetree = React.createClass({
	getInitialState: function() {
		return {
			sheetColumns: ['address', 'street', 'city', 'territory'],
			territoryName: '',
			addressList: []
		};
	},
	componentDidMount: function() {
		var self = this;
		var territoryName = this.capitalize(this.props.routeParams.city) + ' ' + this.props.routeParams.territoryNumber;
		var url = this.props.getUrl(this.props.sheetlist, territoryName);

		this.props.fetchData(url, this.state.sheetColumns, function(addressList) {

			addressList.forEach(function(member) {
				member.address = parseInt(member.address);
				member.territory = parseInt(member.territory);
			});
			self.setState({
				territoryName: territoryName,
				addressList: addressList
			});
		});
	},
	capitalize: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	},
	render: function() {
		return (
			<div>
				<Title title={this.state.territoryName} />
				<Map />
				<AddressList addressList={this.state.addressList} />
			</div>
		);
	}

});

module.exports = Tetree;