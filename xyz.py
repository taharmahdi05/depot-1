#!/usr/bin/env python3
"""Currency converter between various currencies."""

USD_TO_EUR = 0.91
USD_TO_GBP = 0.78
USD_TO_JPY = 155.0
USD_TO_CAD = 1.37
USD_TO_CHF = 0.92
USD_TO_DZD = 150.0


def to_usd(amount: float, from_currency: str) -> float:
    from_currency = from_currency.upper().strip()
    if from_currency == "USD":
        return amount
    if from_currency == "EUR":
        return amount / USD_TO_EUR
    if from_currency == "GBP":
        return amount / USD_TO_GBP
    if from_currency == "JPY":
        return amount / USD_TO_JPY
    if from_currency == "CAD":
        return amount / USD_TO_CAD
    if from_currency == "CHF":
        return amount / USD_TO_CHF
    if from_currency == "DZD":
        return amount / USD_TO_DZD
    raise ValueError(f"Unknown currency: {from_currency}")


def from_usd(amount: float, to_currency: str) -> float:
    to_currency = to_currency.upper().strip()
    if to_currency == "USD":
        return amount
    if to_currency == "EUR":
        return amount * USD_TO_EUR
    if to_currency == "GBP":
        return amount * USD_TO_GBP
    if to_currency == "JPY":
        return amount * USD_TO_JPY
    if to_currency == "CAD":
        return amount * USD_TO_CAD
    if to_currency == "CHF":
        return amount * USD_TO_CHF
    if to_currency == "DZD":
        return amount * USD_TO_DZD
    raise ValueError(f"Unknown currency: {to_currency}")


def convert(amount: float, from_currency: str, to_currency: str) -> float:
    usd_amount = to_usd(amount, from_currency)
    result = from_usd(usd_amount, to_currency)
    return result


def main() -> None:
    currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "CHF", "DZD"]

    while True:
        print(f"\nCurrencies: {', '.join(currencies)} (or 'q' to quit)")
        from_curr = input("Convert from: ").strip().upper()
        if from_curr == "Q":
            break
        if from_curr not in currencies:
            print(f"Invalid currency. Choose {', '.join(currencies)}.")
            continue

        to_curr = input("Convert to: ").strip().upper()
        if to_curr not in currencies:
            print(f"Invalid currency. Choose {', '.join(currencies)}.")
            continue

        try:
            amount = float(input("Enter amount: ").strip())
        except ValueError:
            print("Invalid number.")
            continue

        result = convert(amount, from_curr, to_curr)
        print(f"{amount} {from_curr} = {result:.2f} {to_curr}")


if __name__ == "__main__":
    main()