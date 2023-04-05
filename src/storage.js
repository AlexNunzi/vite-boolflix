import { reactive } from "vue";

export const storage = reactive (
    {
        api_key: 'cf09febcc95a3fe86961147afc012909',
        base_url: 'https://api.themoviedb.org/3',
        searchInput: '',
        lastSearch: '',
        lists: {
            filmList: [],
            seriesList: [],
            recommendedFilmList: [],
            recommendedSeriesList: [],
        },
        genresList: [],
        flagImg: {
            it: 'it_flag.png',
            en: 'en_flag.png',
            sp: 'sp_flag.png',
            sl: 'sl_flag.png',
            fr: 'fr_flag.png',
        },
        uiMessage: 'Qui sotto trovi i film e le serie tv consigliate della settimana, altrimenti effettua una ricerca!',
        loadings: {
            loadingFilm: false,
            loadingTvShow: false,
            loadingRecommFilmList: false,
            loadingRecommSeriesList: false
        }
    }
)