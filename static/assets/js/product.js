$(document).ready(function() {
    let serverUrl = "https://f7l1bzjdgg6i.usemoralis.com:2053/server";
    let appId = "T1MEtQfnMAvGUGOEnlU4KbbCzOxFWTSFnP3M7JSp";
    Moralis.start({ serverUrl, appId });
    let user = Moralis.User.current();

    // Placeholders
    login_placeholder = $("#user_login");
    logout_placeholder = $("#user_logout");
    address_placeholder = $("#address");

    if(!user){
        console.log("No User");
        logout_placeholder.hide();
        login_placeholder.show();

    }else{
        console.log("User");
        const auth_user = `<li id="auth_el" class="nav-item ms-auto link-right">Eth address: ${user.get("ethAddress")} <span id="address"></span></li>`
        $("#my_nav").append(auth_user);
        logout_placeholder.show();
        login_placeholder.hide();
    }

    $('#user_login').click( async function(){
        try{
            user = await Moralis.authenticate({signingMessage:"Authenticating"})
            const auth_user = `<li id="auth_el" class="nav-item ms-auto link-right">Eth address: ${user.get("ethAddress")} <span id="address"></span></li>`
            logout_placeholder.show();
            login_placeholder.hide();
            $("#my_nav").append(auth_user);
          }catch{
            alert("Cannot Authenticate")
          }
    });

    $('#user_logout').click(async function(){
        await Moralis.User.logOut({signingMessage:"Authenticating"});
        console.log("logging out");
        $("#auth_el").remove();
        logout_placeholder.hide();
        login_placeholder.show();

    });

    $('.buy_btn').click( async function(){
        var grand_parent = $(this).parent().parent();
        var price = parseFloat(grand_parent.find('.price_holder').text());

        if(!user){
            return user = await Moralis.authenticate({signingMessage:"Authenticating"}).then(res =>{
            blockaddress = res['attributes']['ethAddress']
            //this.isLoggedin = true;
            const auth_user = `<li id="auth_el" class="nav-item ms-auto link-right">Eth address: ${blockaddress} <span id="address"></span></li>`
            logout_placeholder.show();
            login_placeholder.hide();
            $("#my_nav").append(auth_user);

            var options = {
                type: "erc20",
                amount: Moralis.Units.Token(price, "18"),
                receiver: blockaddress,
                contractAddress: "0x6b175474e89094c44da98b954eedeac495271d0f"
            }
            Moralis.transfer(options).then(res => {
                alert("Transaction Successful. Thanks for your purchase!");
            }).catch(err => {
                alert("Cannot Complete Transaction");
            })

            }).catch( err => {
                //alert("Cannot Authenticate")
                alert(err)
            });
        }else{
            const web3 = await Moralis.enableWeb3();
            var options = {
                type: "erc20",
                amount: Moralis.Units.Token(price, "18"),
                receiver: user.get("ethAddress"),
                contractAddress: "0x6b175474e89094c44da98b954eedeac495271d0f"
            }
            Moralis.transfer(options).then(res => {
                alert("Transaction Successful. Thanks for your purchase!");
            }).catch(err => {
                console.log(err)
                alert("Cannot Complete Transaction");
            })
        }
    });


});

