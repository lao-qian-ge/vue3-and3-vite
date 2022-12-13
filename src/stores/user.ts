import { reactive } from "vue";
import { defineStore } from "pinia";
import type { UserState } from "@/types/api/login";
import { login, info, menu, logout } from "@/api/login";
import type { LoginFrom } from "@/types/views/login";
import { message } from "ant-design-vue";
import { generator } from "@/utils/parsingRouter";
import type { RouteRecordRaw } from "vue-router";

export const useUser = defineStore(
  "user",
  () => {
    const userInfo = reactive<UserState>({
      token: "",
      name: "",
      avatar: "",
      roles: [],
    });

    const loginUser = (params: LoginFrom) => {
      return new Promise((resolve, reject) => {
        login(params)
          .then((r) => {
            const data = r.data.data;
            userInfo.token = data.token;
            userInfo.name = data.name;
            userInfo.avatar = data.avatar;
            userInfo.roles = data.roles;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    const logoutUser = () => {
      return new Promise((resolve) => {
        logout().then(() => {
          userInfo.token = "";
          userInfo.name = "";
          userInfo.avatar = "";
          userInfo.roles = [];
          resolve({});
        });
      });
    };

    const getUserInfo = () => {
      return new Promise((resolve, reject) => {
        info()
          .then((r) => {
            const { name, avatar, roles } = r.data.data;
            userInfo.name = name;
            userInfo.avatar = avatar;
            userInfo.roles = roles;
            resolve(r);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    const getMenu = (): Promise<RouteRecordRaw[]> => {
      return new Promise((resolve) => {
        menu()
          .then((e) => {
            const routeTable = e.data.data;
            userInfo.routers = routeTable;
            resolve(generator(routeTable));
          })
          .catch((err) => {
            message.error(err.message || err.data.message);
          });
      });
    };

    return { userInfo, loginUser, logoutUser, getUserInfo, getMenu };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
          paths: ["userInfo"],
        },
      ],
    },
  }
);
