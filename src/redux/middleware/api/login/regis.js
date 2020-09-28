
import { API_URL} from '../../../../config/settings';


export function postRegis(data) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "6371b3f93f4b4ce0b5be8ece19a4113a");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ASP.NET_SessionId=2vew5jib3ez0os1l3rk1vw3y");

    var raw = data;

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch(API_URL+"NguoiDungService.svc/ND/DangKyTaiKhoan", requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {return error});
}