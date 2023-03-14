export const empty_banner_json = {
    'banner-data':{
        'generalInfo':{
        },
        'elements': {}
    }
};

export const initBannerJSON = (templateType) => ({
    'banner-data': {
        'generalInfo':{
            ...(
                templateType === 0 ? {
                    'width': '60%',
                    'height': '100px',
                    'alignment': 'center',
                } : {
                    'width': '20%',
                    'height': '15%',
                }
            ),
        }
    }
})