import { Paper, Text, Transition } from "@mantine/core";
import type { FC } from "react";

/**
 * just for showing error
 *
 * @param props
 * @returns
 */
export const ErrorBar: FC<{ error?: string }> = ({ error }) => (
  <Transition
    duration={200}
    transition="scale-y"
    timingFunction="ease"
    mounted={error !== undefined}
  >
    {(styles) => (
      <Paper
        bg="red"
        className="p-2 rounded-sm"
        style={{ ...styles, zIndex: 1 }}
      >
        <Text size="sm" fw={600} className="text-white">
          {error}
        </Text>
      </Paper>
    )}
  </Transition>
)