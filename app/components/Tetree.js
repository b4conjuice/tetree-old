var React = require('react');
var Title = require('./Title');
var Map = require('./Map');
var AddressList = require('./AddressList');

var Tetree = React.createClass({

	render: function() {
		return (
			<div>
				<Title title={this.props.routeParams.tetreeName} />
				<Map />
				<AddressList />
			</div>
		);
	}

});

module.exports = Tetree;