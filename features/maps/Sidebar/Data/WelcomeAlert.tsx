import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react"

export const WelcomeAlert = () => {
  return (
    <Alert icon={<AlertCircle size={16} />} title="Get Started" variant="outline">
      Import data from existing collection or upload your own data to get started.
      All processing is done in the browser, so your data stays private.
    </Alert>
  )
}