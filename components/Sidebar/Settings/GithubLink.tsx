import { Button } from "@mantine/core";
import { ListItem } from "../Common/ListItem";
import { BrandGithub } from "tabler-icons-react";

export function GithubLink() {
  return (
    <ListItem title="App Name" description="v.0.1" >
      <Button component="a" target="_blank" href="https://github.com" variant="outline" leftIcon={<BrandGithub size={14} />}>
        Github
      </Button>
    </ListItem>
  );
}