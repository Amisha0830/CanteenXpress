/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - ISO 4217 currency code (default: "USD").
 * @param {string} locale - BCP 47 locale string (default: "en-US").
 * @returns {string} Formatted currency string, e.g. "$12.99"
 */
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  if (amount == null || isNaN(amount)) return "$0.00";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};