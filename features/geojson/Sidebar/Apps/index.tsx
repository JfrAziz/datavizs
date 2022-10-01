import { ClearStorage } from "./ClearStorage";
import { DarkMode } from "./DarkMode";
import { GithubLink } from "./GithubLink";

export function AppsSettings() {
  return (
    <div>
      <DarkMode />
      <GithubLink />
      <ClearStorage />
    </div>
  );
}