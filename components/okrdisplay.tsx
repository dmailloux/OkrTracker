import { Typography } from "@supabase/ui";
import { Okr } from "../types/Okr";
import { KeyResult } from "../types/KeyResult";
import { ActionIcon } from "@mantine/core";
import { deleteKeyResults } from "../database/DeleteKeyResultsAction";
import { Trash } from "tabler-icons-react";

interface OkrDisplayProps {
  okr: Okr | null;
}

export function OkrDisplay({ okr }: OkrDisplayProps): JSX.Element {
  const objective = okr?.name;
  const keyResults: KeyResult[] | undefined = okr?.keyresults?.map(
    (keyResult: KeyResult) => keyResult
  );

  const deleteKeyResult = (keyResult: KeyResult) => {
    deleteKeyResults([keyResult]);
  };

  return (
    <>
      <Typography.Text>{objective}</Typography.Text>
      <ul>
        {keyResults?.map((keyResult: KeyResult, i: number) => (
          <li key={i}>
            <Typography.Text>{keyResult.description}</Typography.Text>
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => deleteKeyResult(keyResult)}
            >
              <Trash size={16} />
            </ActionIcon>
          </li>
        ))}
      </ul>
    </>
  );
}
