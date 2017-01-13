var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var styles = require('../styles');

var App = React.createClass({
	getInitialState: function() {
		return {
			sheetlist: ['Territory List', 'Master'] 
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
	getUrl: function(sheetlist, sheetName) {

		var key = '1jdG2zHutoYaBry2HtG-iqDbTo79WRHrFsF6H53740-k';
		var sheet = sheetlist.indexOf(sheetName) + 1;
		var url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + sheet + '/public/values?alt=json';
		return url;
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
			var data = {
				sheetlist: sheetlist
			};
			sessionStorage.data = JSON.stringify(data);
		});
	},
	componentWillMount: function() {
		if (sessionStorage.data) {
			var data = JSON.parse(sessionStorage.data);
			if (data.sheetlist) {
				this.setState({
					sheetlist: data.sheetlist
				});
			}
		}
		else
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
				sheetlist: sheetlist
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