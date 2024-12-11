import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns';

export const getTimeAgo = (posted) => {
  const now = new Date();

  const diffInMinutes = differenceInMinutes(now, posted);
  const diffInHours = differenceInHours(now, posted);
  const diffInDays = differenceInDays(now, posted);

  if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  }

  return 'Now';
};
