const formatCurrency = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const numberValue = Number(cleanedValue) / 100;

  const formattedValue = numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

export { formatCurrency };
