navigator.userAgent.indexOf('Firefox') != -1 &&
	browser.devtools.panels.create('HackTools', 'get_started16.png', 'index.html');

navigator.userAgent.indexOf('Chrome') != -1 &&
	chrome.devtools.panels.create(
		'HackTools', // title for the panel tab
		null, //   path to an icon
		'index.html', // html page which is gonna be injecting into the tab's content
		null // callback function here
	);
