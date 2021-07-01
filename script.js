 var app= new Vue({
        el: '#app',
        vuetify: new Vuetify(),
     
    data: {
      
      drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-dashboard' },
          { title: 'About', icon: 'mdi-question_answer' },
        ],
        itemsCaroussels: [
          { title: 'Home', src: 'http://7-themes.com/data_images/out/36/6892516-black-abstract.jpg' },
          { title: 'About', sec: 'http://7-themes.com/data_images/out/3/6777060-beautiful-winter-landscape.jpg' },
        ],
      items2: [        ['mdi-home','h'],
      ],
      items5: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true }, {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        
      ],
      items3: [
        { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        ],
      items4: [
        { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
      ],
      },
      methodes:{
        Doit:function() {
            alert('s');
        }
      },
  });
  