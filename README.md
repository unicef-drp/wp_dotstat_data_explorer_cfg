# wp_dotstat_data_explorer_cfg
This repo contains all th static files and configs used by the Data Explorer.
The main plugin just loads the bundle.js file contained here and deployed on an HTTP server.
The bundle.js loads all the necessary static assets.


Contents:
- Configs the configuration files
- css css files
- js javascript files and main react app (in the de folder)
- maps geoJson files used in the react app

Configuration files:
The configuration files are needed to boot and configure the application
Example file:
(fields marked as * are mandatory)

{
    "origin": "localhost\/resources\/data_explorer\/unicef_f\/", //The calling url
    "SETTINGS_override": { //The url of the Fusion registry*
        "fusion": {
            "url": "https:\/\/sdmx.data.unicef.org\/ws\/public\/sdmxapi\/rest",
            "hasRangeHeader": "!0",
            "supportsReferencePartial": "!1"
        }
    },
    "unicef_settings": {
        "indicatorProfileUrl": "..\/..\/..\/indicator-profile", //Where is the indicator profile url?
        "helpUrl": "\/unicef-data-warehouse-faq\/", //The help page url
        "hideTotalLabel": 1, //Hide the total (code _T) label?
        "roundData": 0 //Round the data?
    },
    "map_settings": { //The maps
        "PCO:PAKISTAN_TEST": { //The dataflow the map is attached to (will be shown only when browsing the dataflow)* 
            "ref_area_dim_id": "REF_AREA", //The id of the Reference area dimension*
            "geojson_url": "https://data.unicef.org/wp-content/plugins/wp_dotstat_data_explorer_cfg/maps/pakistan_provinces_codes.json", //The geoJson Url*
            "areas": [ //List of areas to automatically select when entering the map view*
                "BAL",
                "AJK",
                "FAT",
                "GB",
                "ICT",
                "SIN",
                "PUN",
                "KPK"
            ]
        }
    },
    "HIERARCHY_override": [],
    "DATAFLOW": { *The starting dataflow when entering the page with no query paramenters
        "datasourceId": "fusion",
        "agencyId": "PCO",
        "dataflowId": "PAKISTAN_TEST",
        "version": "1.0",
        "dataquery": "PAK.._T._T._T._T._T.",
        "period": [
            2016,
            2021
        ],
        "backendId": "FUSION"
    },
    "helpUrl": "https://data.unicef.org/unicef-data-warehouse-faq/" //The help page url
}