var React = require('react');
var styles = require('../styles');

function ButtonWrapper(props) {
	if (props.href) {
		return (
			<a type='button' className='btn btn-lg col-sm-12' href={props.href} style={styles.space}>
				{props.children}
			</a>
		);
	}
	else if (props.onClick) {
		return (
			<button id={props.children[0] + ' ' + props.children[2]} type='button' className='btn btn-lg col-sm-12' onClick={props.onClick} style={styles.space}>
				{props.children}
			</button>
		);
	}
	else {
		return (
			<button type='button' className='btn btn-lg col-sm-12' style={styles.space}>
				{props.children}
			</button>
		);
	}
};

module.exports = ButtonWrapper;