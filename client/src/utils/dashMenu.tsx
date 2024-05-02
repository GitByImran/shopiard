import {
  Box,
  CreditCard,
  GanttChart,
  Home,
  Settings,
  ShoppingCart,
  Upload,
} from "lucide-react";

export const Admin_Dash_Menus = [
  {
    label: "manage orders",
    icon: <Box />,
    goto: "/dashboard/admin-order",
  },
  {
    label: "upload products",
    icon: <Upload />,
    goto: "/dashboard/admin-upload-product",
  },
  {
    label: "manage products",
    icon: <GanttChart />,
    goto: "/dashboard/admin-manage-product",
  },
  {
    label: "settings",
    icon: <Settings />,
    goto: "/dashboard/admin-setting",
  },
];

export const User_Dash_Menus = [
  {
    label: "carts",
    icon: <ShoppingCart />,
    goto: "/dashboard/user-cart",
  },
  {
    label: "all orders",
    icon: <Box />,
    goto: "/dashboard/user-order",
  },
  {
    label: "payment histories",
    icon: <CreditCard />,
    goto: "/dashboard/user-payment",
  },
  {
    label: "settings",
    icon: <Settings />,
    goto: "/dashboard/user-setting",
  },
];
