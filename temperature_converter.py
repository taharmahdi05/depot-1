#!/usr/bin/env python3
"""Convert temperatures between Celsius, Fahrenheit, and Kelvin."""


def to_celsius(fahrenheit: float | None = None, kelvin: float | None = None) -> float:
    if kelvin is not None:
        return kelvin - 273.15
    if fahrenheit is not None:
        return (fahrenheit - 32) * 5 / 9
    raise TypeError("Expected fahrenheit or kelvin argument")


def to_fahrenheit(celsius: float, kelvin: float | None = None) -> float:
    if kelvin is not None:
        return kelvin * 9 / 5 - 459.67
    return celsius * 9 / 5 + 32


def to_kelvin(celsius: float, fahrenheit: float | None = None) -> float:
    if fahrenheit is not None:
        return (fahrenheit + 459.67) * 5 / 9
    return celsius + 273.15


def convert(value: float, from_unit: str, to_unit: str) -> float:
    from_unit = from_unit.lower().strip()
    to_unit = to_unit.lower().strip()

    if from_unit == to_unit:
        return value

    if from_unit in ("c", "celsius"):
        c = value
    elif from_unit in ("f", "fahrenheit"):
        c = to_celsius(fahrenheit=value)
    elif from_unit in ("k", "kelvin"):
        c = to_celsius(kelvin=value)
    else:
        raise ValueError(f"Unknown source unit: {from_unit}")

    if to_unit in ("c", "celsius"):
        return c
    if to_unit in ("f", "fahrenheit"):
        return to_fahrenheit(celsius=c)
    if to_unit in ("k", "kelvin"):
        return to_kelvin(celsius=c)
    raise ValueError(f"Unknown target unit: {to_unit}")


def main() -> None:
    unit_names = {
        "c": "Celsius",
        "f": "Fahrenheit",
        "k": "Kelvin",
    }
    units = list(unit_names.keys())

    while True:
        print(f"\nUnits: 'c' Celsius, 'f' Fahrenheit, 'k' Kelvin (or 'q' to quit)")
        from_unit = input(f"Convert from [{units[0]}/{units[1]}/{units[2]}]: ").strip().lower()
        if from_unit == "q":
            break
        if from_unit not in units:
            print(f"Invalid unit. Choose {', '.join(units)}.")
            continue

        to_unit = input(f"Convert to [{', '.join(units)}]: ").strip().lower()
        if to_unit not in units:
            print(f"Invalid unit. Choose {', '.join(units)}.")
            continue

        try:
            value = float(input("Enter temperature value: ").strip())
        except ValueError:
            print("Invalid number.")
            continue

        result = convert(value, from_unit, to_unit)
        print(f"{value} {unit_names[from_unit]} = {result:.2f} {unit_names[to_unit]}")


if __name__ == "__main__":
    main()
