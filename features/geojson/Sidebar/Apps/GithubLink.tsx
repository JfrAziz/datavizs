import { Button } from "@mantine/core";
import { Options } from "@components/Options";
import { BrandGithub } from "tabler-icons-react";
import { DATAVIZS_REPOSITORY, DATAVIZS_VERSION } from "@config/app";

export function GithubLink() {
  return (
    <Options title="Datavizs" description={DATAVIZS_VERSION} >
      <Button component="a" target="_blank" href={DATAVIZS_REPOSITORY} variant="outline" leftIcon={<BrandGithub size={14} />}>
        Github
      </Button>
    </Options>
  );
}