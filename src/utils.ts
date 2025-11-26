import { Injectable } from "@nestjs/common";


@Injectable()
export class Utils {
    constructor() { }

    isValidObject(data: any): boolean {
        return !!(data && typeof data === "object" && Object.keys(data).length > 0);
    }

    isValidArray<T>(arr: T[]): boolean {
        return Array.isArray(arr) && arr.length > 0;
    }
}
