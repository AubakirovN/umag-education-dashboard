import { useEffect, useState } from "react";
import { ServicesOutputDto } from "../types";

export const useServiceFormEdited = (
  original: ServicesOutputDto[],
  copy: ServicesOutputDto[]
) => {
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const edited = original.some((item: ServicesOutputDto, index: number) => {
      const copyItem = copy[index];
      return (
        item.name !== copyItem.name ||
        item.codeName !== copyItem.codeName ||
        item.recommendedPrice !== copyItem.recommendedPrice ||
        item?.departmentName !== copyItem?.departmentName ||
        item.price !== copyItem.price ||
        item.isProvidedInMedcenter !== copyItem.isProvidedInMedcenter ||
        item.time !== copyItem.time
      );
    });
    setIsEdited(edited);
  }, [original, copy]);
  return isEdited;
};
