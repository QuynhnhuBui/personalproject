import { API_URL } from "../../../../config/settings";

export function postRegis(isEmail, input) {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Cookie", "ASP.NET_SessionId=ojws1uiawhv2e1uphw2hbqov");

	var raw = JSON.stringify({
		EmailVerified: isEmail,
		PhoneVerified: !isEmail,
		LienLac: input,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(
		API_URL + "NguoiDungService.svc/ND/SendLayLaiMatKhau",
		requestOptions
	)
		.then((response) => response.json())
		.then((result) => {
			return result;
		})
		.catch((error) => {
			return error;
		});
}

export function getOtpApi(input) {
	// console.log("ddaaassa1",input)
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Cookie", "ASP.NET_SessionId=ojws1uiawhv2e1uphw2hbqov");

	// console.log("ddaaassa2",input)
	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		// body: raw,
		redirect: "follow",
	};

	console.log("ddaaassa3", input);
	return fetch(
		API_URL +
			"/NguoiDungService.svc/NDHT/KhoiPhucMatKhau?SoDienThoai=" +
			input.phone +
			"&Email=" +
			input.email,
		requestOptions
	)
		.then((response) => {
			console.log("---1", response);
			return response.json();
		})
		.then((result) => {
			console.log("---1", result);
			return result;
		})
		.catch((error) => {
			console.log("---1", error);
			return error;
		});
}

export function compareOtpApi(input) {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Cookie", "ASP.NET_SessionId=ojws1uiawhv2e1uphw2hbqov");

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		// body: raw,
		redirect: "follow",
	};
	const url =
		API_URL +
		"NguoiDungService.svc/NDHT/XacThucOTP?SoDienThoai=" +
		input.phone +
		"&Email=" +
		input.email +
		"&OTP=" +
		input.otp;
	// console.log("ddd222", url);
	// console.log("ddd3333", input);
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.then((resultCompare) => {
			// {
			// 	"StatusCode": 200,
			// 	"description": null,
			// 	"exMessage": null,
			// 	"resultObject": true,
			// 	"resultType": "JSON",
			// 	"status": "SUCCESS",
			// 	"throwException": false
			// }

			// if (resultCompare.StatusCode === 200 && resultCompare.status === "SUCCESS") {
			// 	return fetch(
			// 		API_URL +
			// 			"NguoiDungService.svc/NDHT/KhoiPhucMatKhau?SoDienThoai=" +
			// 			input.phone +
			// 			"&Email=" +
			// 			input.email,
			// 		{
			// 			method: "GET",
			// 			headers: myHeaders,
			// 			// body: raw,
			// 			redirect: "follow",
			// 		}
			// 	)
			// 		.then((response) => response.json())
			// 		.then((result) => {
			// 			console.log("---111", result);
			// 			return result;
			// 		})
			// 		.catch((error) => {
			// 			console.log("---2222", error);
			// 			return error;
			// 		});
			// } else {
			// 	console.log("---3333", resultCompare);
			return resultCompare;
			// }

			// console.log("---2", result);
		})
		.catch((error) => {
			console.log("---4444", error);
			return error;
		});
}

export function formatPassCCApi(input) {
	console.log("--input", input);
	// return {
	// 	StatusCode: 200,
	// 	description: null,
	// 	exMessage: null,
	// 	resultObject: true,
	// 	resultType: "JSON",
	// 	status: "SUCCESS",
	// 	throwException: false,
	// };
	var raw = JSON.stringify({
		SoDienThoai: input.SoDienThoai,
		Email: input.Email,
		MatKhauMoi: input.MatKhauMoi,
		MatKhauXacNhan: input.MatKhauXacNhan,
		IsQuenMatKhau: input.IsQuenMatKhau,
		MatKhauCu:"",
	});

	var myHeaders = new Headers();
	myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Cookie", "ASP.NET_SessionId=ojws1uiawhv2e1uphw2hbqov");

	return fetch(API_URL + "NguoiDungService.svc/NDHT/DoiMatKhau", {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	})
		.then((response) => response.json())
		.then((result) => {
			console.log("---3", result);
			return result;
		})
		.catch((error) => {
			console.log("---3", error);
			return error;
		});
}
