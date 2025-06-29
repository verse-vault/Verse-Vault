'use strict';
const path = require('path');
const {app, Menu, shell} = require('electron');
const {
	is,
	appMenu,
	aboutMenuItem,
	openUrlMenuItem,
	openNewGitHubIssue,
	debugInfo,
} = require('electron-util');
const config = require('./config.js');

const showPreferences = () => {
	// Show the app's preferences here
};



const debugSubmenu = [
	{
		label: 'Show Settings',
		click() {
			config.openInEditor();
		},
	},
	{
		label: 'Show App Data',
		click() {
			shell.openItem(app.getPath('userData'));
		},
	},
	{
		type: 'separator',
	},
	{
		label: 'Delete Settings',
		click() {
			config.clear();
			app.relaunch();
			app.quit();
		},
	},
	{
		label: 'Delete App Data',
		click() {
			shell.moveItemToTrash(app.getPath('userData'));
			app.relaunch();
			app.quit();
		},
	},
];

const macosTemplate = [
	appMenu([
		{
			label: 'Preferences…',
			accelerator: 'Command+,',
			click() {
				showPreferences();
			},
		},
	]),
	{
		role: 'fileMenu',
		submenu: [
			{
				label: 'Custom',
			},
			{
				type: 'separator',
			},
			{
				role: 'close',
			},
		],
	},
	{
		role: 'editMenu',
	},
	{
		role: 'viewMenu',
	},
	{
		role: 'windowMenu',
	},
];

// Linux and Windows
const otherTemplate = [
	{
		role: 'fileMenu',
		submenu: [
			{
				label: 'Custom',
			},
			{
				type: 'separator',
			},
			{
				label: 'Settings',
				accelerator: 'Control+,',
				click() {
					showPreferences();
				},
			},
			{
				type: 'separator',
			},
			{
				role: 'quit',
			},
		],
	},
	{
		role: 'editMenu',
	},
	{
		role: 'viewMenu',
	},
];

const template = is.macos ? macosTemplate : otherTemplate;



module.exports = Menu.buildFromTemplate(template);
