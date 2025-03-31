// import { getFullName } from "@/core/utils/getFullName";
// import { getAppointmentServiceInfo } from "@/core/utils/getAppointmentServiceInfo";
import { EventHoveringArg } from "@fullcalendar/core/index.js";
// import { Dictionary } from "@fullcalendar/core/internal";
import { Flex, createStyles } from "@mantine/core";

interface CalendarHoverItemProps {
  hoveredItem: EventHoveringArg | null;
}

const useStyles = createStyles(() => ({
  hoverItem: {
    position: "absolute",
    flexDirection: "column",
    maxWidth: 200,
    backgroundColor: "thistle",
    padding: 10,
    fontSize: 14,
    zIndex: 9999,
  },
}));

export const CalendarHoverItem = ({ hoveredItem }: CalendarHoverItemProps) => {
  const { classes } = useStyles();
  if (hoveredItem && hoveredItem?.event.display !== "background") {
    // const appointment: Dictionary = hoveredItem.event.extendedProps;
    // const doctorFullName = getFullName(appointment?.employee);
    return (
      <Flex
        className={classes.hoverItem}
        left={hoveredItem.jsEvent.pageX + 5}
        top={hoveredItem.jsEvent.pageY + 5}
      >
        <div></div>
        {/* <div>{doctorFullName}</div> */}
        {/* <div>{getAppointmentServiceInfo(appointment)}</div> */}
      </Flex>
    );
  }
};
