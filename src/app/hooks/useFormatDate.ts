import { format, isValid, parseISO } from 'date-fns';
import { useCallback } from 'react';

const useFormatDate = () => {
  const formatDatabaseDate = useCallback((dateTimeString: string): string => {
    if (!dateTimeString) return "";

    try {
      const date = parseISO(dateTimeString);
      if (!isValid(date)) {
        console.warn("Invalid date format:", dateTimeString);
        return "";
      }
      return format(date, 'yyyy-MM-dd');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  }, []);

  return formatDatabaseDate;
};

export default useFormatDate;

