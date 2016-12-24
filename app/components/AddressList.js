var React = require('react');
var Address = require('./Address');

var AddressList = React.createClass({

	render: function() {
		var territoryList = this.props.territoryList;
		var addressList = territoryList.map(function(address, index) {
			return <Address key={index} address={address} />
		});
		return (
			<div>{addressList}</div>
		);
	}

});

module.exports = AddressList;