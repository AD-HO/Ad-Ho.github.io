

async function start() {
    try {
        await connection.start();
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
    }
};



var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {


        return {
            tab: null,
            img: null,
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
                       // connection.invoke("GetIm", e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length), this.file.name);

                    }
                },


         
    }
        });
let imgElement = document.getElementById("imageSrc")
let inputElement = document.getElementById("fileInput");
inputElement.addEventListener("change", (e) => {
imgElement.src = URL.createObjectURL(e.target.files[0]);


}, false);
let imgElement2 = document.getElementById("imageSrc2")
let inputElement2 = document.getElementById("fileInput2");
inputElement2.addEventListener("change", (e) => {
imgElement2.src = URL.createObjectURL(e.target.files[0]);


}, false);
imgElement.onload = function() {
    // Image is loaded, we can start working with OpenCV 
 alert("kkkkk")
    // We read the loaded image from imgElement and save it in a variable
    // we could modify later with OpenCV functions 
    let mat = cv.imread(imgElement);
    // We print the saved or modified image to the canvas element with id
    // 'canvasOutput' 
    cv.imshow('outputCanvas', mat);
    // Free memory 
    mat.delete();
    };
    imgElement2.onload = function() {
        // Image is loaded, we can start working with OpenCV 
     alert("kkkkk")
        // We read the loaded image from imgElement and save it in a variable
        // we could modify later with OpenCV functions 
        let mat2 = cv.imread(imgElement2);
        let mat1 = cv.imread(imgElement);

        // We print the saved or modified image to the canvas element with id
        // 'canvasOutput' 
        cv.imshow('outputCanvas2', mat2);
        alert('hihihi')
        const img1 = loadImage("https://sf1.auto-moto.com/wp-content/uploads/sites/9/2017/07/logo-tesla.jpg");
const img2 = loadImage("https://sf1.auto-moto.com/wp-content/uploads/sites/9/2017/07/logo-tesla.jpg");
        alert()
        // Free memory 
        mat.delete();
        };
function PSNR(image1, image2){
    print('OpenCV PSNR: ', cv2.PSNR(image1, image2))
}
