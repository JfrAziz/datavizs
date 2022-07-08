import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Introduce yourself!"
        >
          {/* Modal content */}
        </Modal>

        <Group position="center">
          <Button onClick={() => setOpened(true)}>Open Modal</Button>
        </Group>
      </div>
    </>
  )
}

export default Home
