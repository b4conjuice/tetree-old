var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Choose a territory</h1>
				<Link to='/paramount1'>
					paramount 1
				</Link>
				<Link to='/paramount2'>
					paramount 2
				</Link>
			</div>
		);
	}

});

module.exports = Home;