import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  item: {
    '& + &': {
      paddingTop: theme.spacing.xl,
      marginTop: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles