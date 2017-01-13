var React = require('react');
var styles = require('../styles');

function ButtonWrapper(props) {
	if (props.href) {
		return (
			<a type='button' className='btn btn-lg btn-info col-sm-12' href={props.href} style={styles.space}>
				{props.children}
			</a>
		);
	}
	else {
		return (
			<button type='button' className='btn btn-lg btn-info col-sm-12' style={styles.space}>
				{props.children}
			</button>
		);
	}
};

module.exports = ButtonWrapper;