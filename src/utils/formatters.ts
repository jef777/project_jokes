//Harmonize responce array object keys to uppercase
export const standardizeResponceKeys = <T>(arr: T[]): T[] =>
  arr.map((obj: any) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.charAt(0).toUpperCase() + key.slice(1),
        value,
      ])
    )
  ) as T[];

//check if the a value is present and give a placeholder alternative
export const hasValue = (value: string): string =>
  value && value != ' ' ? value : '------';

//Author timestamp to human readable rate formatter
export const timestampToReadableDate = (timestamp: string): string => {
  const date: Date = new Date(parseInt(timestamp));
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const parsedDate = date.toLocaleDateString('en-GB', options) ?? '----';

  return parsedDate != 'Invalid Date' ? parsedDate : '-----';
};

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//Author name Formatter
export const format_author_name = (author: string): string => {
  if (!author || author == '') {
    return '-----';
  }
  if (isValidEmail(author)) {
    const [username, domain] = author.split('@');
    const extension = domain.split('.');
    return `${username}@***.${extension[1]}`;
  }

  return author;
};

//Convert date to Unix
export const covertDateToUnix = (selected_date: string): string => {
  const date = new Date(selected_date);
  return `${Math.floor(date.getTime() / 1000)}`;
};
