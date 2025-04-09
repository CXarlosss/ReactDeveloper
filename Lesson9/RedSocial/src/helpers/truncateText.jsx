export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };
  