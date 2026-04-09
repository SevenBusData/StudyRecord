export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 如果是今天的日期
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes < 1 ? "刚刚" : `${diffMinutes}分钟前`;
    }
    return `${diffHours}小时前`;
  }

  // 如果是昨天的日期
  if (diffDays === 1) {
    return "昨天";
  }

  // 如果是一周内的日期
  if (diffDays < 7) {
    return `${diffDays}天前`;
  }

  // 格式化日期
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // 如果是同一年，只显示月日
  if (year === now.getFullYear()) {
    return `${month}-${day}`;
  }

  // 显示完整日期
  return `${year}-${month}-${day}`;
};

export const formatDateFull = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
