var React = require('react');

var App = React.createClass({

	render: function() {
		return (
			<div className='main-container'>
				{this.props.children}
			</div>
		);
	}

});

module.exports = App;