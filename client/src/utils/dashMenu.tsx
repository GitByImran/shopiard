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
    icon: <Box size={20} />,
    goto: "/dashboard/admin-order",
  },
  {
    label: "upload products",
    icon: <Upload size={20} />,
    goto: "/dashboard/admin-upload-product",
  },
  {
    label: "manage products",
    icon: <GanttChart size={20} />,
    goto: "/dashboard/admin-manage-product",
  },
  {
    label: "settings",
    icon: <Settings size={20} />,
    goto: "/dashboard/admin-setting",
  },
];

export const User_Dash_Menus = [
  {
    label: "carts",
    icon: <ShoppingCart size={20} />,
    goto: "/dashboard/user-cart",
  },
  {
    label: "all orders",
    icon: <Box size={20} />,
    goto: "/dashboard/user-order",
  },
  {
    label: "payment histories",
    icon: <CreditCard size={20} />,
    goto: "/dashboard/user-payment",
  },
  {
    label: "settings",
    icon: <Settings size={20} />,
    goto: "/dashboard/user-setting",
  },
];
