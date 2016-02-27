function addDnDHandlers()
{
    var chocoImages=document.getElementsByClassName("productArticleWide");

    var shoppingCartDropZone=document.getElementById("shoppingCart");
    var shoppingCart=document.querySelectorAll("#shoppingCart ul")[0];


    var Cart =(function(){
        this.chocos=[];
    });

    var Chocos=(function (id,price){
        this.chocoID=id;
        this.price=price;
    });

    var currentCart= null;
    currentCart=JSON.parse(localStorage.getItem('cart'));
    function createEmptyCart() {
        localStorage.clear();
        localStorage.setItem('cart',JSON.stringify(new Cart()));
        currentCart=JSON.parse(localStorage.getItem('cart'));

    }

    if(!currentCart){
        createEmptyCart();
    }

    function extracted(butt, i) {
        butt.onclick = function () {
            var carttt = JSON.parse(localStorage.getItem('cart'));
            carttt.chocos.splice(i, 1);
            currentCart=carttt;
            localStorage.setItem('cart', JSON.stringify(carttt));
            UpdateShoppingCartUI();
        };
    }

    function UpdateShoppingCartUI() {
        shoppingCart.innerHTML="";
        for (var i=0;i<currentCart.chocos.length;i++){
                var liElement = document.createElement('li');
                liElement.innerHTML = currentCart.chocos[i].chocoID + " " + currentCart.chocos[i].price;
                shoppingCart.appendChild(liElement);
                var butt = document.createElement('button');
                butt.id = 'butt';
                butt.innerHTML = 'Sterge';
                extracted(butt, i);
                shoppingCart.appendChild(butt);
            }
        }


    currentCart.addChoco=function(choco){
        currentCart.chocos.push(choco);
        localStorage.setItem('cart',JSON.stringify(currentCart));
    };

    UpdateShoppingCartUI();


    for(var i=0;i<chocoImages.length;i++)
    {
        chocoImages[i].addEventListener("dragstart",function (ev)
        {
           ev.dataTransfer.effectAllowed = 'copy';
           ev.dataTransfer.setData("Text",this.getAttribute("id"));
        },false);
    }

    shoppingCartDropZone.addEventListener("dragover",function (ev)
    {
        if (ev.preventDefault)
            ev.preventDefault();
        ev.dataTransfer.dropEffect="copy";
        return false;
    },false);

    function addChocoToShoppingCart(item, id) {
       var price=item.getAttribute("data-price");
        var choco=new Chocos(id,price);
        currentCart.addChoco(choco);
        UpdateShoppingCartUI();
    }

    shoppingCartDropZone.addEventListener("drop",function (ev)
    {
        if(ev.stopPropagation)
            ev.stopPropagation();
        var chocoID=ev.dataTransfer.getData("Text");
        var element=document.getElementById(chocoID);

        addChocoToShoppingCart(element,chocoID);
        ev.stopPropagation();
        return false;
    },false);



}

