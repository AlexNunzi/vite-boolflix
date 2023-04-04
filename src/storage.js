import { reactive } from "vue";

export const storage = reactive (
    {
        searchInput: '',
        lastSearch: '',
        filmList: [],
        seriesList: [],
        genresList: [],
        recommendedFilmList: [],
        recommendedSeriesList: [],
        flagImg: {
            it: 'it_flag.png',
            en: 'en_flag.png',
            sp: 'sp_flag.png',
            sl: 'sl_flag.png',
            fr: 'fr_flag.png',
        },
        uiMessage: 'Qui sotto trovi i film e le serie tv consigliate della settimana, altrimenti effettua una ricerca!',
        loadingFilm: false,
        loadingTvShow: false,
        loadingRecommFilmList: false,
        loadingRecommSeriesList: false
    }
)