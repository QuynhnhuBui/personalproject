
import { API_URL} from '../../../../config/settings';


export function postOtp(data) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
    myHeaders.append("Cookie", "ASP.NET_SessionId=fg2cxjsgqjtyr5swsk2c022d");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    return fetch(API_URL + "NguoiDungService.svc/ND/CongDan_XacThucOTP?phone=" + data.phone + "&email=" + data.email + "&maxacnhan=" + data.otp, requestOptions)
        .then(response => response.json())
        .then(result => {return result})
        .catch(error => {return error});
}

export function postOtpRegis(data) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
    myHeaders.append("Cookie", "ASP.NET_SessionId=tq2hq3i3xtn3c3nzeawrh2e2");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    return fetch(API_URL + "NguoiDungService.svc/ND/CongDan_DangKy_XacThucOTP?phone=" + data.phone + "&email=" + data.email + "&maxacnhan=" + data.otp, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {return error});   
}