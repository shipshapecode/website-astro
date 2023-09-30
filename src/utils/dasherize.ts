export function dasherize(string: string) {
  return string
    .replace(
      // eslint-disable-next-line no-useless-escape
      /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]/g,
      ''
    )
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
