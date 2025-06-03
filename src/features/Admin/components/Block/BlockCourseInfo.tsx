import { Button, Flex, Text } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface BlockCourseInfoProps {
  block: any;
}

export const BlockCourseInfo = ({ block }: BlockCourseInfoProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const data: any[] = useMemo(() => block?.courses || [], [block?.courses]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Название курса",
        accessorKey: "title",
        Cell: ({ cell }) => {
          return (
            <Button
              p={0}
              variant="subtle"
              onClick={() => navigate(`/app/courses/${cell.row.original?.id}`)}
            >
              {cell.row.original.title}
            </Button>
          );
        },
      },
      {
        header: "Номер блока",
        accessorKey: "pivot.block_number",
      },
      {
        header: "Проходной балл",
        accessorKey: "pivot.pass_count",
      },
      {
        header: "Максимум попыток",
        accessorKey: "pivot.max_attempts",
      },
    ],
    [t]
  );

  const table = useMantineReactTable({
    columns,
    data,
    enablePinning: true,
    manualPagination: true,
    mantineLoadingOverlayProps: {
      loaderProps: {
        variant: "dots",
      },
    },
    localization: MRT_Localization_RU,
  });

  return (
    <>
      <Flex direction="column" align="center">
        <Text fz={24}>Содержание в курсах</Text>
      </Flex>
      <MantineReactTable table={table} />
    </>
  );
};
