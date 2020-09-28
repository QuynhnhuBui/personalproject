import {  Dimensions } from "react-native";

export const API_URL = "http://118.69.123.51:5000/api"

export const screen = Dimensions.get('window');
export const isPhone = screen.height / screen.width > 1.5 ? true : false

export const userData = {
  admin: false,
  token: "",
  username: "",
  email: "",
  avatarUrl: null,
  address: null,
  accRole: "user"
};