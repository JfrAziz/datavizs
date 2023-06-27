import clsx from "clsx";
import type { Column } from "./types";
import { FC, ReactElement, forwardRef, useState } from "react";
import { FloatingContext, FloatingFocusManager } from "@floating-ui/react";
import type { PolymorphicComponentProps } from "@mantine/core/lib/core/factory/create-polymorphic-component";
import {
  IconPlus,
  IconTrash,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import {
  Text,
  Input,
  Paper,
  Button,
  Divider,
  Popover,
  ButtonProps,
  useCombobox,
  NativeSelect,
} from "@mantine/core";

/**
 * custom menu item element for header menu
 */
const MenuItem: FC<
  PolymorphicComponentProps<"button", ButtonProps> & {
    label: string;
    logo: ReactElement;
    shortcut?: ReactElement;
  }
> = ({ className, children, logo, shortcut, label, ...props }) => {
  return (
    <Button
      fullWidth
      color="gray"
      variant="subtle"
      className={clsx("!px-2", className)}
      classNames={{ label: "flex flex-1 !justify-start" }}
      {...props}
    >
      <div className="flex flex-1 items-center justify-between space-x-4">
        <div className="flex flex-1 items-center justify-start space-x-2">
          {logo}
          <Text size="sm">{label}</Text>
        </div>
        <div>{shortcut}</div>
      </div>
    </Button>
  );
};

/**
 * interface for header menu components, such as open state
 * context, action handlers, etc. some of them is provided by
 * useHederMenu hooks.
 *
 */
interface MenuProps {
  open: boolean;

  context: FloatingContext;

  onColumnDeleted?: () => void;

  onColumnSorted?: (type: "asc" | "desc") => void;

  [key: string]: any;
}

/**
 * menu element for all columns
 */
export const HeaderMenu = forwardRef<HTMLDivElement, MenuProps>(
  ({ context, open, onColumnSorted, onColumnDeleted, ...props }, ref) => {
    if (!open || (!onColumnDeleted && !onColumnSorted)) return null;

    return (
      <FloatingFocusManager context={context} modal={false}>
        <div ref={ref} {...props}>
          <Paper shadow="xs" className="flex flex-row p-1 space-y-1">
            {onColumnSorted && (
              <>
                <MenuItem
                  label="Sort Ascending"
                  onClick={() => onColumnSorted("asc")}
                  logo={<IconSortAscending className="w-4 h-4" />}
                />
                <MenuItem
                  label="Sort Descending"
                  onClick={() => onColumnSorted("desc")}
                  logo={<IconSortDescending className="w-4 h-4" />}
                />
                <Divider size="xs" variant="dashed" />
              </>
            )}
            {onColumnDeleted && (
              <MenuItem
                label="Delete"
                onClick={() => onColumnDeleted()}
                logo={<IconTrash className="w-4 h-4" />}
              />
            )}
          </Paper>
        </div>
      </FloatingFocusManager>
    );
  }
);

/**
 * AddColumnMenu props
 */
interface AddColumnMenu {
  onColumnCreated: (data: Column) => void;
}

/**
 * custom menu for special create/add column header
 *
 * @returns
 */
export const AddColumnMenu: FC<AddColumnMenu> = ({ onColumnCreated }) => {
  const [open, setOpen] = useState(false);

  const [columnName, setColumnName] = useState<string>();

  const [columnType, setColumnType] = useState<"text" | "number">("text");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const onCreate = () => {
    if (!columnName || !columnType) return;

    onColumnCreated({
      title: columnName,
      type: columnType,
    });

    setColumnName("");

    setOpen(false);
  };
  return (
    <div className="flex h-full w-16 flex-col ">
      <Popover opened={open}>
        <Popover.Target>
          <Button size="sm" variant="subtle" onClick={() => setOpen(!open)}>
            <IconPlus className="mr-2 h-4 w-4" />
          </Button>
        </Popover.Target>
        <Popover.Dropdown className="w-48 p-3">
          <div className="flex flex-col space-y-3">
            <Input
              className="h-8"
              defaultValue={columnName}
              placeholder="Column Name"
              onChange={(e) => setColumnName(e.target.value)}
            />
            <NativeSelect
              value={columnType}
              onChange={(event) =>
                setColumnType(event.currentTarget.value as "text" | "number")
              }
              data={["text", "number"]}
            />
            <Button size="sm" onClick={onCreate}>
              <Text>Add Column</Text>
            </Button>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};
