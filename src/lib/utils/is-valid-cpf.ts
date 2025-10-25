export function isValidCPF(cpfDigits: string): boolean {
  if (typeof cpfDigits !== "string") return false;

  // Remove tudo que não é dígito (já deve ser só dígitos quando chamada)
  const cpf = cpfDigits.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  // Rejeita sequências como 00000000000, 11111111111, ...
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const numbers = cpf.split("").map((d) => parseInt(d, 10));

  // Calcula o primeiro dígito verificador (posições 0..8 com pesos 10..2)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += numbers[i] * (10 - i);
  }
  let remainder = sum % 11;
  const firstCheck = remainder < 2 ? 0 : 11 - remainder;
  if (numbers[9] !== firstCheck) return false;

  // Calcula o segundo dígito verificador (posições 0..9 com pesos 11..2)
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += numbers[i] * (11 - i);
  }
  remainder = sum % 11;
  const secondCheck = remainder < 2 ? 0 : 11 - remainder;
  if (numbers[10] !== secondCheck) return false;

  return true;
}