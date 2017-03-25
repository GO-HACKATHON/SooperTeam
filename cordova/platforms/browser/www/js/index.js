/* global mainPage, deviceList, refreshButton, statusDiv */
/* global detailPage, resultDiv, messageInput, sendButton, disconnectButton */
/* global cordova, bluetoothSerial  */
/* jshint browser: true , devel: true*/
'use strict';

var app = {
	initialize: function() {
		var TOUCH_START = 'touchstart';
		if (window.navigator.msPointerEnabled) { // windows phone
			TOUCH_START = 'MSPointerDown';
		}
		document.addEventListener('deviceready', this.onDeviceReady, false);
		refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
		disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
		deviceList.addEventListener('touchstart', this.connect, false);

		this.showMainPage();
	},
	onDeviceReady: function() {
		app.refreshDeviceList();
	},
	refreshDeviceList: function() {
		bluetoothSerial.list(app.onDeviceList, app.onError);
	},
	onDeviceList: function(devices) {
		var option;

		deviceList.innerHTML = "";
		app.setStatus("");

		devices.forEach(function(device) {

			var listItem = document.createElement('li'),
				html = '<b>' + device.name + '</b><br/>' + device.id;

			listItem.innerHTML = html;

			if (cordova.platformId === 'windowsphone') {
			  var button = document.createElement('button');
			  button.innerHTML = "Connect";
			  button.addEventListener('click', app.connect, false);
			  button.dataset = {};
			  button.dataset.deviceId = device.id;
			  listItem.appendChild(button);
			} else {
			  listItem.dataset.deviceId = device.id;
			}
			deviceList.appendChild(listItem);
		});

		if (devices.length === 0) {

			option = document.createElement('option');
			option.innerHTML = "No Bluetooth Devices";
			deviceList.appendChild(option);

			if (cordova.platformId === "ios") { // BLE
				app.setStatus("No Bluetooth Peripherals Discovered.");
			} else { // Android or Windows Phone
				app.setStatus("Please Pair a Bluetooth Device.");
			}

		} else {
			app.setStatus("Menemukan " + devices.length + " device.");
		}

	},
	connect: function(e) {
		var deviceId = e.target.dataset.deviceId;
		if (!deviceId) { // try the parent
			deviceId = e.target.parentNode.dataset.deviceId;
		}

		bluetoothSerial.connect(deviceId, function () {
			app.setStatus("Terkoneksi");
			app.showDetailPage();
		}, app.onError);
	},
	sendData: function(event) {
		var success = function() {};
		var failure = function() {
			alert("Gagal mengirim perintah ke modul.");
		};
		bluetoothSerial.write(event, success, failure);
	},
	disconnect: function(event) {
		sessCmd.innerHTML = "";
		bluetoothSerial.disconnect(app.showMainPage, app.onError);
	},
	showMainPage: function() {
		mainPage.style.display = "";
		detailPage.style.display = "none";
	},
	showDetailPage: function() {
		mainPage.style.display = "none";
		detailPage.style.display = "";
	},
	setStatus: function(message) {
		window.clearTimeout(app.statusTimeout);
		statusDiv.innerHTML = message;
		statusDiv.className = 'fadein';

		// automatically clear the status with a timer
		app.statusTimeout = setTimeout(function () {
			statusDiv.className = 'fadeout';
		}, 5000);
	},
	onError: function(reason) {
		alert("ERROR: " + reason); // real apps should use notification.alert
	}
};