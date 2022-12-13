import { reactive } from "vue";
import { defineStore } from "pinia";
import type { menuState, RouterTable } from "@/types/api/login";

export const useMenuStore = defineStore("menu", () => {
  const menu = reactive<menuState>({
    menuRouter: [],
    menuId: 1,
  });

  const setMenu = (router: RouterTable) => {
    menu.menuRouter = router;
  };

  const setId = (id: number) => {
    menu.menuId = id;
  };

  return { menu, setMenu, setId };
});
