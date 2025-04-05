import {
  IconBinaryTree,
  IconBuilding,
  // IconBuildingHospital,
  // IconCalendarTime,
  // IconChartLine,
  IconDoor,
  IconHome2,
  // IconShoppingCart,
  // IconUser,
  IconUserCircle,
  TablerIconsProps,
} from "@tabler/icons-react";

export type AppNavbarLink = {
  translationKey: string;
  link: string;
};

export type AppNavbarCategory = {
  icon: (props: TablerIconsProps) => JSX.Element;
  translationKey: string;
  children?: AppNavbarLink[];
  link?: string;
};

export const appNavbarCategories: AppNavbarCategory[] = [
  {
    translationKey: "appNavbar.users",
    icon: IconUserCircle,
    link: "/app/users",
  },
  {
    translationKey: "appNavbar.courses",
    icon: IconBinaryTree,
    link: "/app/courses",
  },
  {
    translationKey: "appNavbar.blocks",
    icon: IconDoor,
    link: "/app/blocks",
  },
  {
    translationKey: "appNavbar.lessons",
    icon: IconBuilding,
    link: "/app/lessons",
  },
  {
    translationKey: "appNavbar.tests",
    icon: IconHome2,
    link: "/app/tests",
  },
  // {
  //   translationKey: "appNavbar.departments",
  //   icon: IconBinaryTree,
  //   link: "/app/admin/departments",
  // },
  // {
  //   translationKey: "appNavbar.cabinets",
  //   icon: IconDoor,
  //   link: "/app/admin/cabinets",
  // },
  // {
  //   translationKey: "appNavbar.petOwners",
  //   icon: IconUserCircle,
  //   link: "/app/admin/pet-owners",
  // },
];

export const linksMockdata = [
  "Записи",
  "Пациенты",
  "Врачи",
  "Кабинеты",
  "Заявки",
  "Оплата",
];
