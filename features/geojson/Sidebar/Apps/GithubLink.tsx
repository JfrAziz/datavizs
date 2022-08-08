import { Button } from "@mantine/core";
import { Options } from "@components/Options";
import { DATAVIZS_VERSION } from "@config/app";
import { BrandGithub } from "tabler-icons-react";

export function GithubLink() {
  return (
    <Options title="Datavizs" description={DATAVIZS_VERSION} >
      <Button component="a" target="_blank" href="https://github.com/jfraziz/datavizs" variant="outline" leftIcon={<BrandGithub size={14} />}>
        Github
      </Button>
    </Options>
  );
}