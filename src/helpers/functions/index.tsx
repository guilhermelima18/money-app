const formatCurrency = (value: number) => {
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

const formatStringCurrency = (value: string) => {
  if (!value) return;
  const cleanedValue = value?.replace(/\D/g, "");
  const numberValue = Number(cleanedValue) / 100;

  const formattedValue = numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

const formatDate = (value: string) => {
  if (!value) return;

  const today = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(today);
};

const formatStringDate = (date: string) => {
  if (!date) return;

  const separateDateByBar = date?.split("/");
  let day = separateDateByBar[1];
  let month = separateDateByBar[0];
  const year = separateDateByBar[2];

  if (Number(day) < 10) day = `0${day}`;
  if (Number(month) < 10) month = `0${month}`;

  return `${day}/${month}/${year}`;
};

export { formatCurrency, formatStringCurrency, formatDate, formatStringDate };
