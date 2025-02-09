const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/hubbridge")
    .build();

async function start() {
    try {
        await connection.start();
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
    }
};
connection.on("ReceiveMessage", m => {

    alert(m);

});


var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {


        return {
            tab: null,
            img: null,
            radioGroup: 1,

            dialog:false,
            value: 0,
            item: {
                SR: null,
                BIC:null,
                imageUrl: null
            },
            file: null,
            radioGroup:null,
            image: null,

            items: [
                { tab: 'One', content: 'Tab 1 Content', icon: 'mdi-home' },

            ],
        }
    },
    async  mounted(){
        this.dialog=true
        await connection.start();
        this.dialog=false

    },
            methods: {
                Doit: function () {
                    // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
                  //  connection.invoke("GetIm", );
                   // //alert('Bonjour Morray');
                },
               
             
         
    }
        });

connection.on("ReceiveIm", m => {
    //alert("iddddddddd");
    app.AffIm("data:image/png;base64," + m);
    app.AffVal(100);



});

connection.on("ReceiveVal", v => {

    app.AffVal(v);


});
connection.start();
