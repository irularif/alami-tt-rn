export const moneyFormat = (
  number: string | number = 0,
  prefix: string = "$ "
) => {
  let res = String(number).replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, `$1,`);
  return `${prefix}${res}`;
};
