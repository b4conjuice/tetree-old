var React = require('react');
var Title = require('./Title');
var Map = require('./Map');
var AddressList = require('./AddressList');

var Tetree = React.createClass({
	getInitialState: function() {
		return {
			loading: true,
			sheetColumns: ['address', 'street', 'city', 'territory'],
			territoryName: '',
			addressList: [],
			map: ''
		};
	},
	componentDidMount: function() {
		var self = this;
		var territoryName = this.capitalize(this.props.routeParams.city) + ' ' + this.props.routeParams.territoryNumber;
		var url = this.props.getUrl(this.props.sheetlist, territoryName);
		var map = this.props.location.state.map;

		this.props.fetchData(url, this.state.sheetColumns, function(addressList) {

			addressList.forEach(function(member) {
				member.address = parseInt(member.address);
				member.territory = parseInt(member.territory);
			});
			self.setState({
				loading: false,
				territoryName: territoryName,
				addressList: addressList,
				map: map
			});
		});
	},
	capitalize: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	},
	render: function() {
		if (this.state.loading)
			return (
				<div>Loading</div>
		);
		return (
			<div className='text-center'>
				<Title title={this.state.territoryName} />
				<Map map={this.state.map} />
				<AddressList addressList={this.state.addressList} />
			</div>
		);
	}

});

module.exports = Tetree;