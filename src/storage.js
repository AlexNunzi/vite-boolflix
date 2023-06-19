import { reactive } from "vue";

export const storage = reactive (
    {
        api_key: 'cf09febcc95a3fe86961147afc012909',
        base_url: 'https://api.themoviedb.org/3',
        searchInput: '',
        lastSearch: '',
        selectInput: '',
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
        },
        navbarLinks: [
            {
                lable: 'Home',
                ref: '#home'
            },
            {
                lable: 'Serie TV',
                ref: '#serieTv'
            },
            {
                lable: 'Film',
                ref: '#film'
            },
            {
                lable: 'Nuovi e popolari',
                ref: '#nuoviEPopolari'
            },
            {
                lable: 'La mia lista',
                ref: '#laMiaLista'
            },
            {
                lable: 'Sfoglia per lingua',
                ref: '#sfogliaPerLingua'
            },
        ],
        currentPage: 'Home'
    }
)