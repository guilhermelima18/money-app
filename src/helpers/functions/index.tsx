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
export { formatCurrency, formatStringCurrency };
