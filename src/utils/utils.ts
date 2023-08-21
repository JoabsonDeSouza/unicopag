export const listItensIgnore: string[] = ['Require cycle:'];

export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
) => {
  const timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export function formatValueByCurrency(value: number): string {
  try {
    return `R$ ${(value / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    })}`;
  } catch (error) {
    return 'R$ 0,00';
  }
}
