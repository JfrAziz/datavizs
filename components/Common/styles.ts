import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  options: {
    '& + &': {
      paddingTop: theme.spacing.xl,
      marginTop: theme.spacing.xl,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },
  },
  divider: {
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  dividerLabel: {
    '&::after, &::before': {
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    }
  }
}));
