export const truncateText = (text: string | undefined): string => {
    if (text && text.length > 20) {
      return text.substring(0, 20) + '...';
    }
    return text || '';
  };

//   M of multiple
export const truncateTextM = (text1: string | undefined, text2: string | undefined): string => {
    const concatenatedText = (text1 || '') + ' ' + (text2 || '');
  
    if (concatenatedText.length > 20) {
      return concatenatedText.substring(0, 20) + '...';
    }
  
    return concatenatedText;
  };