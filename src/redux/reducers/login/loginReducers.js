import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  POST_LOGOUT,
} from '../../actions/login/LoginActions';
import { data, userData, CDData } from '../../../config/settings';
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';
const initialState = {
  description: null,
  result: null,
  status: null,
  loading: false,
};

const loginReducers = (login = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {
        description: null,
        status: null,
        result: null,
        loading: true,
      };
    case POST_LOGOUT:
      return {
        description: null,
        status: null,
        result: null,
        loading: false,
      };
    case POST_LOGIN_SUCCESS:
      if (userData.isCitizen === false && !objectIsNull(action.response.resultObject)) {
        userData.SoDienThoai = action.response.resultObject.SoDienThoai;
        userData.HoVaTen = action.response.resultObject.HoVaTen;
        userData.Email = action.response.resultObject.Email;
        userData.TenChucVu = action.response.resultObject.TenChucVu;
        userData.TenDonVi = action.response.resultObject.TenDonVi;
        userData.NguoiDungGuidID = action.response.resultObject.NguoiDungGuidID;
        userData.TenPhongBan = action.response.resultObject.TenPhongBan;
        userData.DonViID = action.response.resultObject.DonViID;

      }
      if (userData.isCitizen === true && !objectIsNull(action.response.resultObject)) {


        CDData.AnhDaiDien = action.response.resultObject.AnhDaiDien
        CDData.DiaChi = action.response.resultObject.DiaChi
        CDData.Email = action.response.resultObject.Email
        CDData.HoTen = action.response.resultObject.HoTen
        CDData.MaXacNhan = action.response.resultObject.MaXacNhan
        CDData.NgayCap = action.response.resultObject.NgayCap
        CDData.NgaySinh = action.response.resultObject.NgaySinh
        CDData.NgaySinhMaXacNhan = action.response.resultObject.NgaySinhMaXacNhan
        CDData.NguoiDungID = action.response.resultObject.NguoiDungID
        CDData.NoiCap = action.response.resultObject.NoiCap
        CDData.Password = action.response.resultObject.Password
        CDData.SoDienThoai = action.response.resultObject.SoDienThoai
        CDData.SoGiayToTuyThan = action.response.resultObject.SoGiayToTuyThan
        CDData.UserName = action.response.resultObject.UserName



        // CDData.SoDienThoai = action.response.resultObject.SoDienThoai;
        // CDData.HoTen = action.response.resultObject.HoTen;
        // CDData.Email = action.response.resultObject.Email;
        // CDData.NguoiDungID = action.response.resultObject.NguoiDungID;
        // CDData.SoGiayToTuyThan = action.response.resultObject.SoGiayToTuyThan;
      }
      return {
        description: action.response.description,
        status: action.response.StatusCode,
        result: action.response.resultObject,
        loading: false,
      };

    case POST_LOGIN_ERROR:
      return {
        description: 'Loi mang',
        status: -1,
        result: null,
        loading: false,
      };

    default:
      return login;
  }
};

export default loginReducers;
