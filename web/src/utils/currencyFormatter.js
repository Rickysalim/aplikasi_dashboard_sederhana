import currencyFormatter  from 'currency-formatter'

export function currencyFormatterIndonesia(price) {
    return currencyFormatter.format(price, { code: 'IND'})
}