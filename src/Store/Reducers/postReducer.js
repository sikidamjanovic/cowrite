const initState = {
    posts: [
        {id: 1, title: 'Greek God Revenge', content: 'Youre an ancient Greek man coming home from 4 months of war to find your wife 3 months pregnant. Now youve embarked on a solemn quest: to punch Zeus in the face.'},
        {id: 2, title: 'Where Is My Super Suit', content: 'The Suit is powerfull. A mech for some, body armor for others, always unique to each person who wore it. Those who wear it, hear the words "not original user, booting basic mode" As a joke, your sergeant gives you The Suit and the first thing you hear is: "User detected: Welcome back, Commander"'},
        {id: 3, title: 'School Reunion', content: 'The nightmare has come true; youve woken up back in sixth grade with your memories and knowledge of everything that happened since then intact. You start staring at your classmates around you, aware of how they end up. Your teacher asks you whats wrong as you start weeping.'},
        {id: 4, title: 'Seth The Killer', content: 'The nightmare has come true; youve woken up back in sixth grade with your memories and knowledge of everything that happened since then intact. You start staring at your classmates around you, aware of how they end up. Your teacher asks you whats wrong as you start weeping.'},
        {id: 5, title: 'School Reunion', content: 'The nightmare has come true; youve woken up back in sixth grade with your memories and knowledge of everything that happened since then intact. You start staring at your classmates around you, aware of how they end up. Your teacher asks you whats wrong as you start weeping.'}
    ]
}
const postReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_POST':
            return state
        case 'CREATE_POST_ERR':
            return state
        default: 
            return state
    }
}

export default postReducer