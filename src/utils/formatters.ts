//Harmonize responce array object keys to lowercase
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
export const hasValue = (value: any): any =>
  value && value != ' ' ? value : '------';

//Author timestamp to human readable rate formatter
export const timestampToReadableDate = (timestamp: any) => {
  const date: Date = new Date(timestamp);
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
export const format_author_name = (author: any): string => {
  if (!author || author == '') {
    return '-----';
  }
  if (isValidEmail(author)) {
    const [username, domain] = author.split('@');
    const [domainName, extension] = domain.split('.');
    return `${username}@***.${extension}`;
  }

  return author;
};

//Convert date to Unix
export const covertDateToUnix = (selected_date: string): string => {
  const date = new Date(selected_date);
  return `${Math.floor(date.getTime() / 1000)}`;
};
