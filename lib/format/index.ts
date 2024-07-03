export namespace Format {
  /**
   * Returns a 1-2 letter string (both letters are capitalized) containing
   * the initials of the name passed in. If the string is empty, the function
   * will return null.
   */
  export function initials(name: string): string | null {
    if (name.length === 0) {
      return null;
    }
    const [first, last] = name.split(" ");
    if (!first && !last) {
      return name[0].toUpperCase();
    }
    return (
      (first?.charAt(0)?.toUpperCase() ?? "") +
      (last?.charAt(0)?.toUpperCase() ?? "")
    );
  }

  const TB = 1_000_000_000_000;
  const GB = 1_000_000_000;
  const MB = 1_000_000;
  const KB = 1_000;
  const B = 1;

  export function fileSize(size: number): string {
    let divisor: number = B;
    let suffix = "B";
    if (size > TB) {
      divisor = TB;
      suffix = "TB";
    } else if (size > GB) {
      divisor = GB;
      suffix = "GB";
    } else if (size > MB) {
      divisor = MB;
      suffix = "MB";
    } else if (size > KB) {
      divisor = KB;
      suffix = "KB";
    }
    return `${(size / divisor).toPrecision(3)}${suffix}`;
  }
}
