var React = require('react');
var ButtonWrapper = require('./ButtonWrapper');

// batch geo map
// <p><iframe src="https://batchgeo.com/map/ff7eb6fc00586a148a300b207637c253" height="550" style={{border:'1px solid #aaa'}}></iframe></p><p><small>View <a href="https://batchgeo.com/map/ff7eb6fc00586a148a300b207637c253">Paramount 1</a> in a full screen map</small></p>
var Map = React.createClass({

	render: function() {
		if (this.props.map) {
			var map = this.props.map;
			var mobile = map.replace('https://batchgeo.com/', "batchgeo://");
			return (
				<div>
					<h3>map</h3>
					<div>
						<ButtonWrapper href={map}>
							batchgeo site
						</ButtonWrapper>
					</div>
					<div>
						<ButtonWrapper href={mobile}>
							batchgeo app
						</ButtonWrapper>
					</div>
				</div>
			);
		}
		else
			return null;
	}

});

module.exports = Map;