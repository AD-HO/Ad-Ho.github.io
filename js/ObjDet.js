const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://objdetect-001-site1.gtempurl.com/HubBridge")
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
            value: 0,
            item: {
                image: null,
                imageUrl: null
            },
            file: null,
            image: null,

            items: [
                { tab: 'One', content: 'Tab 1 Content', icon: 'mdi-home' },

            ],
        }
    },
            methods: {
                Doit: function () {
                    // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
                    connection.invoke("SendMessage", "HMDLH");
                    alert('Bonjour Morray');
                },
                AffIm: function (im) {
                    this.item.image = im

                },
                AffVal: function (v) {
                    this.value = v;

                },

                onFileChange() {
                    const reader = new FileReader()
                    reader.readAsDataURL(this.file)

                    reader.onload = e => {
                        alert(this.file.name);
                        // this.item.image = e.target.result
                        //alert(this.item.image)
                        connection.invoke("SendMessage", e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length), this.file.name);

                    }
                },


         
    }
        });
connection.on("ReceiveIm", m => {
    app.AffIm("data:image/png;base64," + m);
    app.AffVal(100);



});
connection.on("ReceiveVal", v => {

    app.AffVal(v);


});
connection.start();