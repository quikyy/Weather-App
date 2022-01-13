const searchActiveBackground = "searchBarActive_background"
const searchActiveFont = "searchBarActive_font"

const searchedInfo_Off = "searchedInfo_Off"
const closeAllOff = "closeAllOff"
function search_bar_background_focus(e){
    if(e.target == user_input){
        search_bar.classList.add(searchActiveBackground)
        user_input.classList.add(searchActiveFont)
        search_button_i.classList.add(searchActiveFont)
    }
}
