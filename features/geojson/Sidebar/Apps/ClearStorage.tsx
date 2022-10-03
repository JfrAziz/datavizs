import { Button } from "@mantine/core";
import { useStore } from "@maps/store";
import { Trash } from "tabler-icons-react";
import { Settings } from "@components/Settings";
import { showNotification } from "@mantine/notifications";

export function ClearStorage() {
  const clearStorage = () => {
    useStore.persist.clearStorage()

    useStore.getState().resetState()

    return showNotification({
      title: "Success",
      message: 'Data cleared',
      color: "teal"
    })
  }

  return (
    <Settings title="Clear all Data" description="Reset data to initial state">
      <Button color="red" onClick={clearStorage} leftIcon={<Trash size={14} />}>
        Clear
      </Button>
    </Settings>
  );
}