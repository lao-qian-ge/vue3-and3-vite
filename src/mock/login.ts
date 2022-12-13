export default [
  {
    type: "post",
    url: "/api/login",
    response: () => {
      return {
        code: 200,
        message: "登陆成功2",
        data: {
          name: "请相信光",
          avatar:
            "https://cdn-mpublic.tradeplus.cc/lianshan/prod/image/wate_67fcc38fb66f61a1409627db37f21ac9.JPG",
          roles: ["admin"],
          token: "Token123456",
        },
      };
    },
  },
  {
    type: "post",
    url: "/api/info",
    response: () => {
      return {
        code: 200,
        message: "登陆成功2",
        data: {
          name: "请相信光",
          avatar:
            "https://cdn-mpublic.tradeplus.cc/lianshan/prod/image/wate_67fcc38fb66f61a1409627db37f21ac9.JPG",
          roles: ["admin"],
          token: "Token123456",
        },
      };
    },
  },
  {
    type: "post",
    url: "/api/logout",
    response: () => {
      return {
        code: 200,
        message: "退出成功",
      };
    },
  },
];
