import { Typography } from "@supabase/ui";
import { Okr } from "../types/Okr";
import { KeyResult } from "../types/KeyResult";
import { ActionIcon } from "@mantine/core";
import { deleteKeyResults } from "../database/DeleteKeyResultsAction";
import { Trash } from "tabler-icons-react";
import { deleteObjective } from "../database/DeleteObjectiveAction";

interface OkrDisplayProps {
  okr: Okr;
}

export function OkrDisplay({ okr }: OkrDisplayProps): JSX.Element {
  const objective = okr?.name;
  const keyResults: KeyResult[] | undefined = okr?.keyresults?.map(
    (keyResult: KeyResult) => keyResult
  );

  const deleteOkr = async (okr: Okr) => {
    // first delete key results
    if (okr.keyresults != null && okr.keyresults.length > 0) {
      const keyResultIdsToDelete = okr.keyresults
        .filter((x) => x.id != null)
        .map((x) => x.id);

      await deleteKeyResults(keyResultIdsToDelete);
    }
    // then delete objective
    await deleteObjective(okr.id);
  };

  const deleteKeyResult = async (keyResult: KeyResult) => {
    const keyResultIdToDelete: string | undefined = keyResult?.id;
    if (keyResultIdToDelete != null) {
      await deleteKeyResults([keyResultIdToDelete]);
    }
  };

  return (
    <>
      <Typography.Text>{objective}</Typography.Text>
      <ActionIcon color="red" variant="hover" onClick={() => deleteOkr(okr)}>
        <Trash size={16} />
      </ActionIcon>
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
