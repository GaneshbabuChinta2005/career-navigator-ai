declare module 'multer' {
    import { RequestHandler } from 'express';

    namespace multer {
        interface File {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            size: number;
            destination: string;
            filename: string;
            path: string;
            buffer: Buffer;
        }

        interface StorageEngine {
        }

        interface FileFilterCallback {
            (error: Error | null, acceptFile?: boolean): void;
        }

        interface Options {
            dest?: string;
            storage?: StorageEngine;
            fileFilter?: (req: any, file: File, callback: FileFilterCallback) => void;
            limits?: {
                fieldNameSize?: number;
                fieldSize?: number;
                fields?: number;
                fileSize?: number;
                files?: number;
                parts?: number;
                headerPairs?: number;
            };
        }

        interface DiskStorageOptions {
            destination?: string | ((req: any, file: File, callback: (error: Error | null, destination: string) => void) => void);
            filename?: (req: any, file: File, callback: (error: Error | null, filename: string) => void) => void;
        }

        function diskStorage(options: DiskStorageOptions): StorageEngine;
    }

    function multer(options?: multer.Options): {
        single(fieldName: string): RequestHandler;
        array(fieldName: string, maxCount?: number): RequestHandler;
        fields(fields: Array<{ name: string; maxCount?: number }>): RequestHandler;
        none(): RequestHandler;
        any(): RequestHandler;
    };

    export = multer;
}

declare global {
    namespace Express {
        interface Request {
            file?: multer.File;
            files?: multer.File[] | { [fieldname: string]: multer.File[] };
        }
    }
}
