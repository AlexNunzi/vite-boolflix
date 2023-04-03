import { reactive } from "vue";

export const storage = reactive (
    {
        searchInput: '',
        lastSearch: '',
        filmList: [],
        seriesList: [],
        flagImg: {
            it: 'it_flag.png',
            en: 'en_flag.png',
            sp: 'sp_flag.png',
            sl: 'sl_flag.png',
            fr: 'fr_flag.png',
        },
        uiMessage: 'Effettua una ricerca',
        loadingFilm: false,
        loadingTvShow: false
    }
)