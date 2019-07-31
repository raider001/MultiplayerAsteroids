export class Utils {
    public static numberToHex(value: number): string {
        let hex = Number(value).toString(16);
        if (hex.length < 2) {
             hex = '0' + hex;
        }
        return hex;
    }
}
