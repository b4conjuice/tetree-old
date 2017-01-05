var React = require('react');

var Address = React.createClass({

	render: function() {
		var address = this.props.address;
		var streetAddress = address.address + ' ' + address.street
		var mapsLink = 'http://maps.apple.com/?q=' + streetAddress;
		return (
			<div>
				<a href={mapsLink}>
					{streetAddress}
				</a>
			</div>
		);
	}

});

module.exports = Address;