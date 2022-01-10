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
        this.$refs.defaultradio.$el.click()

    },
            methods: {
                trigger () {
                    this.$refs.defaultradio.click()
                },
                Doit: function () {
                    // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
                  //  connection.invoke("GetIm", );
                   // //alert('Bonjour Morray');
                },
                AffIm: function (im) {
                    this.item.image = im

                },
             


                AffVal: function (v) {
                    this.value = v;

                },

                Launch: function() {
                   const reader = new FileReader()
                    reader.readAsDataURL(this.file)

                    reader.onload = e => {
                       
                        
                        this.item.image = e.target.result
                         connection.invoke("Transform", e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length), this.file.name,this.radioGroup);

    }
                   // }
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
