import { Typography } from "@supabase/ui";
import { KeyResult, Okr } from "../types/Okr";

interface OkrDisplayProps {
  okr: Okr | null;
}

export function OkrDisplay({ okr }: OkrDisplayProps): JSX.Element {
  const objective = okr?.name;
  const keyResults = okr?.keyresults?.map(
    (keyResult: KeyResult) => keyResult.description
  );
  return (
    <>
      <Typography.Text>{objective}</Typography.Text>
      <ul>
        {keyResults?.map((keyResult, i) => (
          <li key={i}>
            <Typography.Text>{keyResult}</Typography.Text>
          </li>
        ))}
      </ul>
    </>
  );
}
