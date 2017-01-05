var React = require('react');
var Address = require('./Address');

var AddressList = React.createClass({

	render: function() {
		var territoryList = this.props.addressList;
		var addressList = territoryList.map(function(address, index) {
			return <Address key={index} address={address} />
		});
		return (
			<div>
				<h2>address list</h2>
				{addressList}
			</div>
		);
	}

});

module.exports = AddressList;