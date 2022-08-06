import { Button } from "@mantine/core";
import { Options } from "@components/Options";
import { BrandGithub } from "tabler-icons-react";

export function GithubLink() {
  return (
    <Options title="Datavizs" description="v.0.1" >
      <Button component="a" target="_blank" href="https://github.com/jfraziz/datavizs" variant="outline" leftIcon={<BrandGithub size={14} />}>
        Github
      </Button>
    </Options>
  );
}