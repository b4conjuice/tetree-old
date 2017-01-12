var React = require('react');
var ButtonWrapper = require('./ButtonWrapper');

var Address = React.createClass({

	render: function() {
		var address = this.props.address;
		var streetAddress = address.address + ' ' + address.street
		var mapsLink = 'http://maps.apple.com/?q=' + streetAddress;
		return (
			<div>
				<ButtonWrapper href={mapsLink}>
					{streetAddress}
				</ButtonWrapper>
			</div>
		);
	}

});

module.exports = Address;