import { Center, Group, Text, UnstyledButton } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useStyles } from "./Table.styles";

interface ThProps extends React.PropsWithChildren { 

}

export const Th = ({ children }: ThProps)  => {
  const { classes } = useStyles();
  return (
    <th className={classes.th}>
      <UnstyledButton className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Trash size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}