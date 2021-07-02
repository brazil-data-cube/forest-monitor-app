import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

/** Service to search items in STAC */
@Injectable({ providedIn: 'root' })
export class SearchService {

    /** base url of STAC */
    private urlForestAPI = window['__env'].urlForestAPI;

    private API_KEY = window['__env'].planetAPIKey;

    /** start http service client */
    constructor(private http: HttpClient) { }

    /**
     * get Items in STAC Search
     */
    public async searchSTAC(query: string): Promise<any> {
        const urlSuffix = `/stac-compose/search?${query}`;
        const response = await this.http.get(`${this.urlForestAPI}${urlSuffix}`).toPromise();
        return response;
    }

    public async searchPlanetItems(start_date: Date, end_date: Date, coordinates: any): Promise<any> {
        const url = `https://api.planet.com/data/v1/quick-search?_sort=acquired desc`;

        const query = {
            filter:  {
                type: 'AndFilter',
                config: [
                    {
                        type: 'DateRangeFilter',
                        field_name: 'acquired',
                        config: {
                            gt: start_date,
                            lte: end_date
                        }
                    },
                    {
                        type: 'GeometryFilter',
                        field_name: 'geometry',
                        config: {
                            type: 'Polygon',
                            coordinates: coordinates
                        }
                    }
                ]

            },
            item_types: ['REOrthoTile', 'PSScene4Band', 'SkySatCollect']
        };

        const response = await this.http.post(`${url}`, query, {
            headers: {
                Authorization: `api-key ${this.API_KEY}`
            }
        }).toPromise();
        return response;
    }

    public async searchPlanetMosaicQuads(mosaicId: string, bbox: string) {
        const url = `https://api.planet.com/basemaps/v1/mosaics/${mosaicId}/quads`;

        const params = {
            api_key: this.API_KEY,
            bbox
        };

        const response: any = await this.http.get(url, { params }).toPromise();

        return response.items;
    }

    public async searchPlanet(start_date: Date, end_date: Date, bbox: string, percentCloud: number): Promise<any> {
        const url = `https://api.planet.com/basemaps/v1/mosaics?api_key=${this.API_KEY}`;

        const response: any = await this.http.get(`${url}`).toPromise();

        const output = [];

        for (const mosaic of response.mosaics) {
            const mosaicDate = moment(mosaic.first_acquired, 'YYYY-MM-DD');

            if (mosaicDate.isSameOrAfter(moment(start_date)) && mosaicDate.isSameOrBefore(moment(end_date))) {
                const res = await this.searchPlanetMosaicQuads(mosaic.id, bbox);

                if (res.length === 0) {
                    continue;
                }

                // Adapting the planet result as STAC object like

                // Find thumbnail nearest the percent coverage
                const bestThumbnail = res.reduce((prev, curr) => (
                    (Math.abs(curr.precent_covered - percentCloud) < Math.abs(prev.percent_covered - percentCloud) ? curr : prev)
                ));

                mosaic.assets = {
                    thumbnail: {
                        href: bestThumbnail ? bestThumbnail._links.thumbnail : ''
                    }
                };
                mosaic.type = 'feature';
                mosaic.properties = {
                    collection: mosaic.name,
                    datetime: `${mosaic.first_acquired}`
                };
                output.push(mosaic);
            }
        }

        return {
            meta: { found: output.length },
            mosaics: output
        };
    }

}
