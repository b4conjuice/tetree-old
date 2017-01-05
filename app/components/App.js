var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var App = React.createClass({
	fetchData: function(url, props, callback) {
		var objArray = [];

		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				var data = JSON.parse(request.responseText);
				var entries = data.feed.entry;

				Object.keys(entries).forEach(function(key) {
					var entry = entries[key];
					var newObj = {};
					props.forEach(function(prop) {
						newObj[prop] = entry['gsx$' + prop].$t
					});
					objArray.push(newObj);
				});
				callback(objArray);
			}
			else
				console.log('error')
		};
		request.send();
	},
	getUrl: function(sheetName) {
		var SHEETLIST = [
			'Territory List',
			'Master',
			'Paramount 1',
			'Paramount 2',
			'Paramount 3',
			'Paramount 4',
			'Paramount 5',
			'Paramount 6',
			'Paramount 7',
			'Bellflower 1',
			'Bellflower 2',
			'Bellflower 3',
			'Bellflower 4',
			'Bellflower 5',
			'Bellflower 6',
			'Bellflower 7',
			'Bellflower 8',
			'Bellflower 9',
			'Bellflower 10',
			'Bellflower 11',
			'Downey 1',
			'Downey 2',
			'Downey 3',
			'Downey 4',
			'Downey 5',
			'Downey 6',
			'Downey 7'
		];

		var key = '1jdG2zHutoYaBry2HtG-iqDbTo79WRHrFsF6H53740-k';
		var sheet = SHEETLIST.indexOf(sheetName) + 1;
		var url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/values?alt=json';
		return url;
	},
	render: function() {
		var fetchData = this.fetchData;
		var getUrl = this.getUrl;
		var children = React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, {
				fetchData: fetchData,
				getUrl: getUrl
			})
		});
		return (
			<div className='main-container'>
				<h1>
					<Link to='/'>tetree</Link>
				</h1>
				{children}
			</div>
		);
	}

});

module.exports = App;