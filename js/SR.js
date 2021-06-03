const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/HubBridge")
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

    //alert(m);

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
            methods: {
                Doit: function () {
                    // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
                  //  connection.invoke("GetIm", );
                   // //alert('Bonjour Morray');
                },
                AffIm: function (im) {
                    document.getElementById("srImg").src = im;
                    
                    document.getElementById("srLink").href=im;
                },
                AffBic: function (im) {
                    document.getElementById("bicImg").src = im


                },
                showSr: function () {
var iframe = "<iframe width='100%' height='100%' src='" + document.getElementById("srImg").src + "'></iframe>"
var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close();
                    
                },
                showBic: function () {
                    var iframe = "<iframe width='100%' height='100%' src='" + document.getElementById("bicImg").src + "'></iframe>"
                    var x = window.open();
                    x.document.open();
                    x.document.write(iframe);
                    x.document.close();
                                        
                                    },
                AffVal: function (v) {
                    this.value = v;

                },

                onFileChange() {
                    const reader = new FileReader()
                    reader.readAsDataURL(this.file)

                    reader.onload = e => {
                        //alert(this.file.name);
                        // this.item.image = e.target.result
                        ////alert(this.item.image)
                        connection.invoke("GetIm", e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length), this.file.name);

                    }
                },


         
    }
        });
connection.on("ReceiveIm", m => {
    //alert("iddddddddd");
    app.AffIm("data:image/png;base64," + m);
    app.AffVal(100);

    imageZoom2("srImg","bicImg", "myresult1","myresult2");


});
connection.on("ReceiveBIC", m => {
    //alert("iddddddddd");
    app.AffBic("data:image/png;base64," + m);
    app.AffVal(99);



});
connection.on("ReceiveVal", v => {

    app.AffVal(v);


});
connection.start();
