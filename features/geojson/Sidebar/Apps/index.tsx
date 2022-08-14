import { DarkMode } from "./DarkMode";
import { GithubLink } from "./GithubLink";
import { ControlOptions } from "./ControlOptions";

export function AppsSettings() {
  return (
    <div>
      <DarkMode />
      <ControlOptions />
      <GithubLink />
    </div>
  );
}