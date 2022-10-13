import { Button } from "@mantine/core";
import { Settings } from "@components/Settings";
import { BrandGithub } from "tabler-icons-react";
import { DATAVIZS_REPOSITORY, DATAVIZS_VERSION } from "@config/app";

export function GithubLink() {
  return (
    <Settings title="Datavizs" description={DATAVIZS_VERSION} >
      <Button component="a" target="_blank" href={DATAVIZS_REPOSITORY} variant="outline" leftIcon={<BrandGithub size={14} />}>
        Github
      </Button>
    </Settings>
  );
}