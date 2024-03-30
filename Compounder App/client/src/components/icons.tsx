import { ReactNode } from "react";
import { TbLayoutGrid, TbWallet, TbArrowsExchange, TbUser } from "react-icons/tb";
import { iconSize } from "@/constants/styles";

type Icons = {
  [key: string]: ReactNode;
};

export const icons: Icons = {
  dashboard: <TbLayoutGrid size={iconSize} />,
  holdings: <TbWallet size={iconSize} />,
  transactions: <TbArrowsExchange size={iconSize} />,
  profile: <TbUser size={iconSize} />,
}