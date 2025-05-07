// components/MenuItem.tsx
import type { MenuItem as MenuItemType } from "../types";

type MenuItemProps = {
  item: MenuItemType;
  addItem: (item: MenuItemType) => void;
};

export default function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    <button
      className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between mb-5"
      onClick={() => addItem(item)}
    >
      <p>{item.name}</p>
      <p className="font-bold">${item.price}</p>
    </button>
  );
}
