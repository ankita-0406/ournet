const ORDERS = ['date', 'distance'];

export default {

    Article: {
        article: []
    },
    PopularArticles: {
        articles: [],
        itemsPerPage: 12,
        totalArticles: 0
    },
    LocationArticles: {
        articles: [],
        itemsPerPage: 12,
        totalArticles: 0,
        cookieAccept:true
    },
    RelatedArticles: {
        articles: [],
        itemsPerPage: 3,
        totalArticles: 0
    },
    GuestLocationArticles:{
        articles: []
    },
    Authentication: {
        loggedIn: false,
        loggedUserId: null,
        role: ''
    },
    Events: {
        itemsPerPage: 20,
        events: [],
        totalEvents: 0,
        orders: ORDERS,
        order: ORDERS[0]
    },
    Forums: {
        forums: [],
        communityId: 275,
        order: "CHRONOLOGICAL",
        pageIndex: 0,
        pageSize: 15
    },
    Groups: {
        groups: [],
        joins:[]
    },
    Locations : {
        locations: [{          
            lat :null,
            lng : null,          
            radius: 5,
            address: '',
            communityId: "",
            communityName:"",      
            city: '',
            postalCode: '',
            priority: 1,
            locationTag: ''
            
        }],
        cookieAccpet:false
    },
    Myprofile : {
        profile : {
            description : "",
            email : "",
            firstName : "",
            lastName : "",
            middleName : "",
            publicUserName  : "",
            roleCode : "",
            userId : "",
            username : "",
            articles:0,
            avatar:null,
            events:0,
            groups:0,
            followed:false,
            ownershipGroups:0
        },
        img : null,
        profilePicture:null,
        articleImage:null,
        aricleImageUrl:null,
        profileImageUrl:null
    },
    MyArticle : {
        article : []
    },
    UserTags : {
        tags : [],
        alltags : []
    },
    Common : {
        radius : 10
    }
}