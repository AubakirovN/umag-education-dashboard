import { Grid, Stack, Text } from "@mantine/core";

export interface CustomCardProps {
  colSpan: number;
  colNames: string[];
  colValues: (string | JSX.Element)[];
}

export function CustomCard({ colSpan, colNames, colValues }: CustomCardProps) {
  const cols = [];
  if (colSpan < 1 || colSpan > 12) {
    throw new Error("colSpan must be a number between 1 and 12");
  }
  if (colNames.length !== colValues.length) {
    throw new Error("colNames and colValues must have the same length");
  } else {
    for (let i = 0; i < colNames.length; i++) {
      cols.push(
        <Grid.Col key={`col-${i}`} span={colSpan}>
          <Stack>
            <div>
              <Text fw={700}>{colValues[i]}</Text>
              <Text size="sm" color="dimmed">
                {colNames[i]}
              </Text>
            </div>
          </Stack>
        </Grid.Col>
      );
    }
  }
  return <Grid>{cols}</Grid>;
}
