var React = require('react');

var Address = React.createClass({

	render: function() {
		var address = this.props.address;
		return (
			<div>{address.address} {address.street}</div>
		);
	}

});

module.exports = Address;