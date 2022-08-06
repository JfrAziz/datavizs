import { Button } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";
import { Options } from "@components/Common/Options";

export function GithubLink() {
  return (
    <Options title="Datavizs" description="v.0.1" >
      <Button component="a" target="_blank" href="https://github.com/jfraziz/datavizs" variant="outline" leftIcon={<BrandGithub size={14} />}>
        Github
      </Button>
    </Options>
  );
}