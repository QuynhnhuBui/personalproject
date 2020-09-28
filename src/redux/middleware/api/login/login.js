import {userData, API_URL} from '../../../../config/settings';

export function postLogin(user, password) {
  const url =
    API_URL +
    (userData.isCitizen === true
      ? '/NguoiDungService.svc/ND/DangNhap'
      : 'NguoiDungService.svc/NDHT/DangNhapCongChuc');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', '6371b3f93f4b4ce0b5be8ece19a4113a');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', 'ASP.NET_SessionId=0qizyohvnj5f5p0cusiw4oh4');

  var raw = JSON.stringify({UserName: user, Password: password});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  console.warn("111111",requestOptions)

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.warn("ddddddss",result)
      return result;
    })
    .catch((error) => {

      return error;
    });
}
