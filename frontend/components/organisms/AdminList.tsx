import React from "react";
import { styled } from "../../stitches.config";
import { AdminListHeader } from "../molecules/AdminListHeader";
import { AdminListItem } from "../molecules/AdminListItem";

export type Column = {
  title: string;
  key: string;
  link?: (item: any) => string;
  sortFunction?: (a: any, b: any) => number;
  toStringFunction?: (item: any) => string;
};

type Props = {
  columns: Column[];
  data: any[];
  selectedItems?: string[];
  onSelectionChange?: (selectedItems: string[]) => void;
  actions?: {
    title: string;
    onClick: (item: any) => void;
    Icon: React.FC;
  }[];
  defaultOrderKey?: string;
  defaultOrderDirection?: "asc" | "desc";
  uuidKey: string;
};

const AdminListLayout = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
});

export const AdminList: React.FC<Props> = ({
  columns,
  data,
  selectedItems,
  onSelectionChange,
  actions,
  defaultOrderKey,
  defaultOrderDirection,
  uuidKey,
}) => {
  const [order, setOrder] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: defaultOrderKey || columns[0].key,
    direction: defaultOrderDirection || "asc",
  });

  return (
    <>
      <AdminListLayout>
        <AdminListHeader
          selected={selectedItems.length == data.length}
          onSelectionChange={() => {
            if (selectedItems.length == data.length) {
              onSelectionChange([]);
            } else {
              onSelectionChange(data.map((item) => item[uuidKey]));
            }
          }}
          columns={columns}
          order={order}
          setOrder={setOrder}
        ></AdminListHeader>
        {getArrangedData(data, columns, order).map((item) => (
          <AdminListItem
            key={item[uuidKey]}
            data={item}
            selected={selectedItems.includes(item[uuidKey])}
            onSelectionChange={(selected) => {
              if (selected) {
                onSelectionChange([...selectedItems, item[uuidKey]]);
              } else {
                onSelectionChange(
                  selectedItems.filter((uuid) => uuid != item[uuidKey])
                );
              }
            }}
            actions={actions}
            columns={columns}
            uuidKey={uuidKey}
          ></AdminListItem>
        ))}
      </AdminListLayout>
    </>
  );
};

function getArrangedData(data, columns, order) {
  let filteredData = data.sort(
    columns.find((element) => element.key == order.key).sortFunction
  );

  return order.direction == "asc" ? filteredData : filteredData.reverse();
}
