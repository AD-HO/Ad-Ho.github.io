/*
 * 
 * const connection = new signalR.HubConnectionBuilder()
                        .withUrl("/HubBridge")
                        .build();

                    async function start() {
                        try {
                            await connection.start();
                            console.log("connected");
                        } catch (err) {
                            console.log(err);
                            setTimeout(() => start(), 5000);
                        }
};
connection.on("ReceiveMessage", m => {

    alert(m);

});
connection.start();*/
