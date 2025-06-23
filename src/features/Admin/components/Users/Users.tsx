import { Button, Flex } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
// import { useEffect, useState } from "react";
import { AddUserModal } from "./AddUserModal";
import { ImportUserModal } from "./ImportUserModal";
import { getUsers } from "@/core/api";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru";
// import { getUsers } from "@/core/api";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [changes, setChanges] = useState(false);
  const data: any[] = useMemo(() => users || [], [users]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [totalRowCount, setTotalRowCount] = useState(0);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "ФИО",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Номер телефона",
        accessorKey: "phone",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enablePinning: true,
    manualPagination: true,
    rowCount: totalRowCount,
    mantineLoadingOverlayProps: {
      loaderProps: {
        variant: "dots",
      },
    },
    localization: MRT_Localization_RU,
    state: {
      pagination: pagination,
      isLoading,
    },
    positionToolbarAlertBanner: "bottom",
    onPaginationChange: setPagination,
  });

  const getData = async () => {
    setIsLoading(true);
    const params = {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    };
    try {
      const response = await getUsers(params);
      setUsers(response?.data);
      setTotalRowCount(response?.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [changes, pagination]);

  return (
    <>
      <Flex justify="flex-end" gap={10}>
        <Button variant="outline" onClick={() => setImportModal(true)}>
          Импорт пользователей
        </Button>
        <Button variant="subtle" onClick={() => setAddModal(true)}>
          + Добавить пользователя
        </Button>
      </Flex>
      <MantineReactTable table={table} />
      <AddUserModal
        modal={addModal}
        onClose={() => setAddModal(false)}
        setChanges={setChanges}
      />
      <ImportUserModal
        modal={importModal}
        onClose={() => setImportModal(false)}
      />
    </>
  );
};
