/**
 * @param {string} param
 * @returns {string|null}
 */
export const CheckIfGetParamExistsInUrl = (param: string): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
};
