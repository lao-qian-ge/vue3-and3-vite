import request from "@/request";
import type { LoginFrom } from "@/types/views/login";
import type { ConfigType, ResponseData } from "@/types/api/public";
import type { RouterData, UserState } from "@/types/api/login";

/**
 * @desc: 登录
 * @param { Object } data 输入的账号密码
 */
export const login = (data: LoginFrom): ConfigType<ResponseData<UserState>> => {
  return request<ResponseData<UserState>>({
    url: "/login",
    method: "post",
    data,
  });
};

/**
 * @desc: 获取用户信息
 * @returns data
 */
export const info = (): ConfigType<ResponseData<UserState>> => {
  return request({
    url: "/info",
    method: "get",
  });
};

/**
 * @desc: 获取菜单
 */
export const menu = (): ConfigType<RouterData> => {
  return request({
    url: "/menu",
    method: "get",
  });
};

/**
 * @desc: 退出登录
 */
export const logout = (): ConfigType => {
  return request({
    url: "/logout",
    method: "post",
  });
};
