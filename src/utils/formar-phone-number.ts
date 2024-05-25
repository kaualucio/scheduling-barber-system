export const formatPhoneNumber = (phone: string) => {
  // Regex para números de telefone brasileiros de 10 ou 11 dígitos
  const regex = /^(\d{2})(\d{4,5})(\d{4})$/;

  // Substitui usando a regex para adicionar a formatação desejada
  const formatedPhone = phone.replace(regex, function(match, p1, p2, p3) {
      return `(${p1}) ${p2}-${p3}`;
  });

  return formatedPhone;
}