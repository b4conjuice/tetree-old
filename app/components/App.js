var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var styles = require('../styles');
require('../style.scss');

var App = React.createClass({
	getInitialState: function() {
		return {
			sheetlist: ['Territory List', 'Master'],
			keys: {}
		};
	},
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
	getUrl: function(sheetlist, sheetName, city) {
		var sheet = sheetlist.indexOf(sheetName) + 1;
		if (sheet < 1) {
			console.log('sheet not found. default to first sheet');
			sheet = 3;
		}
		var key = ''
		if (city == undefined)
			key = '1Vgeg3FKAf9veuoEI3H591Hx4Te1YARCIEEtAkE3waGg';// '1jdG2zHutoYaBry2HtG-iqDbTo79WRHrFsF6H53740-k';
		else {
			key = this.getKey(city);
			sheet = parseInt(sheetName) + 3;
		}
		var url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/values?alt=json';
		return url;
	},
	setCityInfo: function(cities) {

	},
	setKeys: function(keys) {
		this.setState({
			keys: keys
		});
		console.log(this.state.keys);
	},
	getKey: function(city) {
		var keys = {
			paramount: '1WXHx6HYhOFsmwOjRldn4PyIQMVLQGjdI328vvRGF-2w',
			bellflower: '1ndQQ-pypMXV-WdkzY75pF9PysAip_x1qTMfkRJxiDjM',
			downey: '1qQx0JnimgNS3zrjdnEEjotVPjNTgt1tDmcInXR2es6g'
		};
		return keys[city];
	},
	getSheetList: function() {
		var self = this;
		var key = '1jdG2zHutoYaBry2HtG-iqDbTo79WRHrFsF6H53740-k';
		var sheet = 0 + 1;
		var url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/values?alt=json';
		this.fetchData(url, ['city', 'number'], function(territoryList) {
			var sheetlist = self.state.sheetlist;
			territoryList.forEach(function(territory) {
				sheetlist.push(territory.city + ' ' + territory.number);
			});
			self.setState({
				sheetlist: sheetlist
			});
			// add sheetlist to sessionStorage
			// var data = {
			// 	sheetlist: sheetlist
			// };
			// sessionStorage.data = JSON.stringify(data);
		});
	},
	componentDidMount: function() {
		// if (sessionStorage.data) {
		// 	var data = JSON.parse(sessionStorage.data);
		// 	if (data.sheetlist) {
		// 		this.setState({
		// 			sheetlist: data.sheetlist
		// 		});
		// 	}
		// 	else
		// 		this.getSheetList();
		// }
		//else
			this.getSheetList();
	},
	render: function() {
		var fetchData = this.fetchData;
		var getUrl = this.getUrl;
		var sheetlist = this.state.sheetlist;
		var children = React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, {
				fetchData: fetchData,
				getUrl: getUrl,
				sheetlist: sheetlist,
				setKeys: this.setKeys
			})
		});
		return (
			<div className='main-container'>
				<div className='page-header text-center'>
					<h1>
						<Link to='/'>tetree</Link>
					</h1>
				</div>
				{children}
			</div>
		);
	}

});

module.exports = App;