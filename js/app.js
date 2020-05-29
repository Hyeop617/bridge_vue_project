import CoffeeMenu from './models/CoffeeMenu.js'
import BeverageMenu from "./models/BeverageMenu.js"
import SearchMenu from "./models/SearchMenu.js"

new Vue({
    el: "#app",                     //  id가 app인 태그에서 돌아가게 설정.
    data: {
        keyword:"",                     // Input(검색창)의 값.
        items:[],                       // 커피 혹은 음료 메뉴의 값이 담긴 배열
        isCoffee: true,                 // 커피 메뉴 선택시 true, 음료 선택시 false. 초기값은 커피로 설정해야 하므로 true.
        isSearch:false,                  // 검색을 할 땐 true, 안할땐(메뉴 선택창) false. 초기값은 메뉴창이므로 false.
        searchItems: []                 // 검색 결과의 값이 담긴 배열
    },
    // 뷰 인스턴스 라이프 사이클중, created 단계에서 실행되는 메소드
    created() {
        // 처음에 커피 메뉴를 보여주기 위해,this.items에 CoffeeMenu를 넣어줌.
        CoffeeMenu.list().then(
            (item) => this.items = item
        )

    },
    methods: {
        search() {
            // Enter키 입력시 실행되는 메소드.
            // 추가적으로, 커피 메뉴(혹은 음료 메뉴)에서 클릭했을 때에도 실행됨.
            this.isSearch = true;                       // isSearch === true일 시, index.html에서 메뉴창을 숨기게끔 함.
            SearchMenu.list().then(
                (item) => this.searchItems = item   // searchItems에 SearchMenu안의 data를 넣어 줌.
            )
        },
        searchAtClick(item){
            // 커피(음료) 메뉴를 클릭했을 때 실행되는 메소드. Input에 값을 넣고 엔터누른 것처럼 동작하게 하였음.
            this.keyword = item.name;                  // keyword(Input의 값)에 클릭된 메뉴(item)의 이름(item.name)을 저장.
            this.search()                              // Input에서 엔터를 누른 것처럼 search() 메소드 실행
        },
        resetInput(){
             /*
              * Input 오른쪽의 X버튼 눌렀을 때의 메소드.
              * keyword를 빈 값으로 만들고, isSearch를 false로 만들어서
              * 검색결과 창이라면, 메뉴창으로 돌아가게끔 함.
              */
            this.keyword = ""
            this.isSearch = false
        },
        removeItem(index){
            /*
             * 메뉴창에서 li 항목의 X버튼을 눌렀을 때 실행되는 메소드
             * li 항목의 index값을 받아, items 배열에서 그 index의 값을 삭제한 뒤,
             * items 배열의 크기가 0이면, isCoffee를 검사해, 커피와 음료 각각 alert 메세지가 다르게끔 함.
             */
            this.items.splice(index,1)
            if(this.items.length === 0){
                this.isCoffee? alert("커피 메뉴가 등록되지 않았습니다.") : alert("등록된 음료 메뉴가 없습니다.")
            }
        },
        coffeeSelect() {
            /*
             * 커피를 선택했을 때 실행되는 메소드.
             * isCoffee를 true로 설정한 뒤, CoffeeMenu.js의 Data를 items에 넣음.
             */
            this.isCoffee = true
            CoffeeMenu.list().then(
                (item) => this.items = item
            )
        },
        beverageSelect() {
            /*
             * 음료를 선택했을 때 실행되는 메소드.
             * isCoffee를 false로 설정한 뒤, BeverageMenu.js의 Data를 items에 넣음.
             */
            this.isCoffee = false
            BeverageMenu.list().then(
                (item) => this.items = item
            )
        },
        checkInputisNull(){
            /*
             * Input의 값이 변경될 때마다 실행되는 메소드.
             * 검색을 한 뒤, 검색어를 다 지우면 메뉴창으로 돌아가게끔 하기 위해
             * Input의 값(keyword)이 없을 시(== false) isSearch를 false(메뉴창으로 돌아가게끔)로 설정.
             */
            if(!this.keyword){
                this.isSearch = false;
            }
        }
    }
})
