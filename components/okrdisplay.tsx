import { Okr } from "../types/Okr";
import { KeyResult } from "../types/KeyResult";
import { ActionIcon, Card, Group, List, Text } from "@mantine/core";
import { deleteKeyResults } from "../database/DeleteKeyResultsAction";
import { Trash } from "tabler-icons-react";
import { deleteObjective } from "../database/DeleteObjectiveAction";
import { useMutation, useQueryClient } from "react-query";

interface OkrDisplayProps {
  okr: Okr;
}

export function OkrDisplay({ okr }: OkrDisplayProps): JSX.Element {
  const queryClient = useQueryClient();
  const objectiveMutation = useMutation(deleteObjective, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("okrs");
    },
  });
  const keyResultsMutation = useMutation(deleteKeyResults, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("okrs");
    },
  });
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

      await keyResultsMutation.mutateAsync(keyResultIdsToDelete);
    }
    // then delete objective
    await objectiveMutation.mutateAsync(okr.id);
  };

  const deleteKeyResult = async (keyResult: KeyResult) => {
    const keyResultIdToDelete: string | undefined = keyResult?.id;
    if (keyResultIdToDelete != null) {
      await keyResultsMutation.mutateAsync([keyResultIdToDelete]);
    }
  };

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" withBorder radius="md">
        <Group spacing="xs">
          <Text weight={500}>{objective}</Text>
          <ActionIcon
            color="red"
            variant="hover"
            onClick={() => deleteOkr(okr)}
          >
            <Trash size={16} />
          </ActionIcon>
        </Group>
        <ul>
          {keyResults?.map((keyResult: KeyResult, i: number) => (
            <li key={i}>
              <Group>
                <Text>{keyResult.description}</Text>
                <ActionIcon
                  color="red"
                  variant="hover"
                  onClick={() => deleteKeyResult(keyResult)}
                >
                  <Trash size={16} />
                </ActionIcon>
              </Group>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
