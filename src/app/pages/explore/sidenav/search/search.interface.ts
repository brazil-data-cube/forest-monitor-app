export interface Search {
    satellite?: string[];
    bbox?: {
        north?: number;
        west?: number;
        east?: number;
        south?: number;
    };
    cloudCover?: number;
    start_date?: Date;
    last_date?: Date;
}
